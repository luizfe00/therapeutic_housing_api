import {
  Controller,
  Get,
  Query,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { ShoppingService } from './shopping.service';
import {
  CreateShoppingDTO,
  EditShoppingDTO,
  ShoppingQueryDTO,
} from './dto/shopping.dto';

@UseGuards(JWTGuard)
@Controller('shopping')
export class ShoppingController {
  constructor(private shoppingService: ShoppingService) {}

  @Get('all')
  getAll() {
    return this.shoppingService.getAll();
  }

  @Get('query')
  query(@Query() query: ShoppingQueryDTO) {
    const { endDate, id, startDate } = query;
    return this.shoppingService.query(id, startDate, endDate);
  }

  @Post('create')
  create(@Body() payload: CreateShoppingDTO) {
    return this.shoppingService.create(payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  edit(@Param('id') shoppingId: string, @Body() payload: EditShoppingDTO) {
    return this.shoppingService.edit(shoppingId, payload);
  }

  @Delete(':id')
  delete(@Param('id') shoppingId: string) {
    return this.shoppingService.delete(shoppingId);
  }
}
