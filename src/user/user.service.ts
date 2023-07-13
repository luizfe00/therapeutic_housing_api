import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEditDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(userId: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      delete user.password;
      return user;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async editUser(userId: string, payload: UserEditDTO) {
    try {
      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: payload,
      });

      const isComplete =
        user.document &&
        user.email &&
        user.firstName &&
        user.lastName &&
        user.userName;

      if (user.isComplete && isComplete) return;
      if (user.isComplete && !isComplete) {
        await this.prismaService.user.update({
          where: {
            id: userId,
          },
          data: {
            isComplete: false,
          },
        });
        return;
      }
      if (!user.isComplete && isComplete)
        await this.prismaService.user.update({
          where: {
            id: userId,
          },
          data: {
            isComplete: true,
          },
        });
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    return await this.prismaService.user.findMany();
  }

  async deleteUser(id: string) {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
