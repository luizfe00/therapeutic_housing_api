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
        data: {
          ...payload,
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      return error;
    }
  }
}
