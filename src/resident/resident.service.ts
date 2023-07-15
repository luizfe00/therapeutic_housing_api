import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentDTO, EditResidentDTO } from './dto/resident.dto';

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

  async getAll() {
    return await this.prismaService.resident.findMany({
      include: { residence: true, income: true, shopping: true },
    });
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
}
