import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCareTakerDTO, EditCareTakerDTO } from './dto/caretaker.dto';

@Injectable()
export class CaretakerService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateCareTakerDTO) {
    try {
      const user = await this.prismaService.careTaker.create({
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

      return user;
    } catch (error) {
      return error;
    }
  }

  async edit(id: string, payload: EditCareTakerDTO) {
    try {
      const careTaker = await this.prismaService.careTaker.update({
        where: {
          id,
        },
        data: {
          birthDate: payload?.birthDate,
          document: payload?.document,
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          residence: {
            connect: {
              id: payload.residenceId,
            },
          },
        },
      });

      return careTaker;
    } catch (error) {
      return error;
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
