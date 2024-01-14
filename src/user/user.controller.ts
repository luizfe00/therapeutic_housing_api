import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { JWTGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { GetUser } from './decorator/get-user';
import { UserEditDTO } from './dto/user.dto';

@UseGuards(JWTGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('info')
  getUserInfo(@GetUser() user: any) {
    delete user.password;
    return user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('edit')
  editUser(@GetUser('id') userId: string, @Body() payload: UserEditDTO) {
    return this.userService.editUser(userId, payload);
  }

  @Get('all')
  getAllUsers() {
    return this.userService.getAll();
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
