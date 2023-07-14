import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { CaretakerService } from './caretaker.service';
import { CreateCareTakerDTO, EditCareTakerDTO } from './dto/caretaker.dto';

@UseGuards(JWTGuard)
@Controller('caretaker')
export class CaretakerController {
  constructor(private careTakerService: CaretakerService) {}

  @Get(':id')
  findOne(@Param('id') careTakerId: string) {
    return this.careTakerService.findOne(careTakerId);
  }

  @Get('all')
  getAll() {
    return this.careTakerService.getAll();
  }

  @Post('create')
  create(@Body() payload: CreateCareTakerDTO) {
    return this.careTakerService.create(payload);
  }

  @Patch(':id')
  edit(@Param('id') careTakerId: string, @Body() payload: EditCareTakerDTO) {
    return this.careTakerService.edit(careTakerId, payload);
  }

  @Delete(':id')
  delete(@Param('id') careTakerId: string) {
    return this.careTakerService.delete(careTakerId);
  }
}
