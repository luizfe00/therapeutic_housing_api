import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCareTakerDTO, EditCareTakerDTO } from './dto/caretaker.dto';

@Injectable()
export class CaretakerService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateCareTakerDTO) {
    try {
      const caretakerData = {
        birthDate: payload.birthDate,
        document: payload.document,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };

      if (payload?.residenceIds) {
        caretakerData['residence'] = {
          connect: payload.residenceIds.map((residenceId) => ({
            id: residenceId,
          })),
        };
      }

      const careTaker = await this.prismaService.careTaker.create({
        data: caretakerData,
      });

      return careTaker;
    } catch (error) {
      throw error;
    }
  }

  async edit(id: string, payload: EditCareTakerDTO) {
    try {
      const caretakerData = {
        birthDate: payload?.birthDate,
        document: payload?.document,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
      };

      if (payload?.residenceIds) {
        caretakerData['residence'] = {
          connect: payload.residenceIds.map((residenceId) => ({
            id: residenceId,
          })),
        };
      }

      const careTaker = await this.prismaService.careTaker.update({
        where: {
          id,
        },
        data: caretakerData,
        include: { residence: true },
      });

      return careTaker;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return await this.prismaService.careTaker.findMany({
      include: { residence: true },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.careTaker.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return await this.prismaService.careTaker.delete({
      where: { id },
    });
  }
}
