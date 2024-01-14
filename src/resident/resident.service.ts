import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentDTO, EditResidentDTO } from './dto/resident.dto';
import { writeFile, createWriteStream, createReadStream, unlinkSync } from 'fs';
import PDFDocument from '../utils/PdfTableUtil';
import { join } from 'path';

@Injectable()
export class ResidentService {
  constructor(private prismaService: PrismaService) {}

  async createResident(payload: CreateResidentDTO) {
    try {
      const resident = await this.prismaService.resident.create({
        data: {
          birthDate: payload.birthDate,
          document: payload.document,
          firstName: payload.firstName,
          lastName: payload.lastName,
          residence: {
            connect: {
              id: payload.residenceId,
            },
          },
        },
      });
      return resident;
    } catch (error) {
      return error;
    }
  }

  async editResident(id: string, payload: EditResidentDTO) {
    try {
      await this.prismaService.resident.update({
        where: {
          id,
        },
        data: {
          ...payload,
          income: {
            connect: payload?.income?.map((value) => ({ id: value })),
          },
          shopping: {
            connect: payload?.shopping?.map((value) => ({ id: value })),
          },
        },
      });
    } catch (error) {
      return error;
    }
  }

  private isIncomeInRange(
    startDate: string,
    endDate: string,
    incomeDate: string,
  ) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const incomeDateObj = new Date(incomeDate);
    return incomeDateObj >= startDateObj && incomeDateObj <= endDateObj;
  }

  async getAll(startDate: string, endDate: string) {
    const residents = await this.prismaService.resident.findMany({
      include: { residence: true, income: true, shopping: true },
    });
    residents.forEach((resident) => {
      const totalIncome = resident.income.reduce((total, newValue) => {
        if (this.isIncomeInRange(startDate, endDate, newValue.date))
          return total + newValue.value;
        return total;
      }, 0);
      resident['total_income'] = totalIncome;
      return resident;
    });
    return residents;
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.resident.findUnique({
        where: {
          id,
        },
        include: {
          residence: true,
          income: true,
          shopping: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  async deleteResident(id: string) {
    try {
      await this.prismaService.resident.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  async parseResidents(startDate: string, endDate: string) {
    const residents = await this.getAll(startDate, endDate);
    const columns =
      'Nome,Data de Nascimento,Documento,Compras,Receita,Residencia\n';
    console.log({ residents });
    const parsedResidents = residents.map((resident) => ({
      name: `${resident.firstName} ${resident.lastName}`,
      birthDate: resident.birthDate,
      document: resident.document,
      income: resident['total_income'],
      shopping: resident['total_shopping'],
      residence: resident.residence.name,
    }));
    const csvString = parsedResidents
      .map(
        (resident) =>
          `${resident.name},${resident.birthDate},${resident.document},${resident.shopping},${resident.income},${resident.residence}`,
      )
      .join('\n');
    writeFile(
      'test.csv',
      columns + csvString,
      { encoding: 'utf8' },
      (error) => {
        if (error) {
          console.log('An error occurred when creating CSV file for residents');
        }
      },
    );
    return;
  }

  async parsePDF(startDate: string, endDate: string) {
    const residents = await this.getAll(startDate, endDate);
    const columns = [
      'Nome',
      'Data de Nascimento',
      'Documento',
      'Compras',
      'Receita',
      'Residencia',
    ];
    const parsedResidents = residents.reduce((prev, resident) => {
      const newRow = [
        `${resident.firstName} ${resident.lastName}`,
        resident.birthDate,
        resident.document,
        resident['total_income'],
        resident['total_shopping'],
        resident.residence.name,
      ];
      return [...prev, newRow];
    }, []);

    const doc = new PDFDocument();
    const filePath = join(
      process.cwd(),
      `residents-${startDate}to${endDate}.pdf`,
    );
    doc.pipe(createWriteStream(filePath));

    const table = {
      headers: columns,
      rows: parsedResidents,
    };

    doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
      prepareRow: (row, i) => doc.font('Helvetica').fontSize(9),
    });

    doc.end();

    const fileStream = createReadStream(filePath);

    fileStream.on('end', () => {
      try {
        unlinkSync(filePath);
      } catch (error) {
        throw new BadRequestException(
          'An error occurred while removing the file.',
        );
      }
    });

    return new StreamableFile(fileStream);
  }
}
