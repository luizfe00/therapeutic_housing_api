import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(payload: AuthDTO) {
    const password = await argon.hash(payload.password);
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: payload.email,
          password,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      return error;
    }
  }

  async signIn(payload: AuthDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const validPwd = await argon.verify(user.password, payload.password);
    if (!validPwd) {
      throw new BadRequestException('Credentials incorrect');
    }
    return this.signToken(user.id, user.email);
  }

  private async signToken(id: string, email: string) {
    const payload = {
      sub: id,
      email,
    };
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '8h',
      secret,
    });
    return {
      token,
    };
  }
}
