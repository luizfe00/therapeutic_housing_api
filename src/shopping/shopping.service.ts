import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShoppingDTO, EditShoppingDTO } from './dto/shopping.dto';

@Injectable()
export class ShoppingService {
  constructor(private prismaService: PrismaService) {}

  async create(payload: CreateShoppingDTO) {
    try {
      const shoppingPayload = {
        date: payload.date,
        product: payload.product,
        value: payload.value,
        description: payload?.description,
      };
      const shopping = await this.prismaService.shopping.create({
        data: {
          ...shoppingPayload,
          resident: {
            connect: {
              id: payload.residentId,
            },
          },
        },
      });
      return shopping;
    } catch (error) {
      throw error;
    }
  }

  async edit(shoppingId: string, payload: EditShoppingDTO) {
    try {
      const shoppingPayload = {
        date: payload.date,
        product: payload.product,
        value: payload.value,
        description: payload?.description,
      };
      const shopping = await this.prismaService.shopping.update({
        where: {
          id: shoppingId,
        },
        data: shoppingPayload,
      });
      return shopping;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    return await this.prismaService.shopping.findMany({
      include: { resident: true },
    });
  }

  async query(userId: string, startDate: string, endDate: string) {
    try {
      return await this.prismaService.shopping.findMany({
        where: {
          resident: {
            id: userId,
          },
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
    } catch (error) {
      return error;
    }
  }

  async delete(id: string) {
    try {
      return await this.prismaService.shopping.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
