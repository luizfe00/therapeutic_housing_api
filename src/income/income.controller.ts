import {
  Controller,
  UseGuards,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { IncomeService } from './income.service';
import {
  CreateIncomeDTO,
  EditIncomeDTO,
  QueryIncomeDTO,
} from './dto/income.dto';

@UseGuards(JWTGuard)
@Controller('income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Get('all')
  getAll() {
    return this.incomeService.getAll();
  }

  @Get()
  query(@Query() query: QueryIncomeDTO) {
    return this.incomeService.query(
      query.id,
      query.startDate,
      query.endDate,
      query.value,
    );
  }

  @Post(':id')
  create(@Param('id') residentId: string, @Body() payload: CreateIncomeDTO) {
    return this.incomeService.create(residentId, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  edit(@Param('id') residentId: string, @Body() payload: EditIncomeDTO) {
    return this.incomeService.edit(residentId, payload);
  }

  @Delete(':id')
  delete(@Param('id') residentId: string) {
    return this.incomeService.delete(residentId);
  }
}
