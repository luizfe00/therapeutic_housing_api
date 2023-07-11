import {
  Controller,
  Get,
  Patch,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { JWTGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { GetUser } from './decorator/get-user';
import { User } from '@prisma/client';
import { UserEditDTO } from './dto/user.dto';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  getUserInfo(@GetUser() user: User) {
    delete user.password;
    return user;
  }

  @Get(':id')
  findOne(@Param() params: any) {
    return this.userService.findOne(params.id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('edit')
  editUser(@GetUser('id') userId: string, payload: UserEditDTO) {
    return this.userService.editUser(userId, payload);
  }
}
