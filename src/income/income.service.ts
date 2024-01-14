import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIncomeDTO, EditIncomeDTO } from './dto/income.dto';

@Injectable()
export class IncomeService {
  constructor(private prismaService: PrismaService) {}

  async create(residentId: string, payload: CreateIncomeDTO) {
    try {
      const income = await this.prismaService.income.create({
        data: {
          ...payload,
          resident: {
            connect: {
              id: residentId,
            },
          },
        },
      });

      return income;
    } catch (error) {
      return error;
    }
  }

  async edit(incomeId: string, payload: EditIncomeDTO) {
    try {
      await this.prismaService.income.update({
        where: {
          id: incomeId,
        },
        data: payload,
      });
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    return this.prismaService.income.findMany({ include: { resident: true } });
  }

  async query(
    residentId: string,
    startDate: string,
    endDate: string,
    value?: string,
  ) {
    const queryWhereData = {
      resident: {
        id: residentId,
      },
      date: {
        gte: startDate,
        lte: endDate,
      },
    };

    if (value) {
      queryWhereData['value'] = {
        lte: Number(value),
      };
    }

    try {
      const incomeRecords = await this.prismaService.income.findMany({
        where: queryWhereData,
      });
      const totalValue = incomeRecords.reduce(
        (total, income) => total + income.value,
        0,
      );
      incomeRecords['total_value'] = totalValue;
      return incomeRecords;
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
    try {
      await this.prismaService.income.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
