import {
  Body,
  Controller,
  Post,
  Patch,
  UseGuards,
  Param,
  Get,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { ResidentService } from './resident.service';
import { CreateResidentDTO, EditResidentDTO } from './dto/resident.dto';

@UseGuards(JWTGuard)
@Controller('resident')
export class ResidentController {
  constructor(private residentService: ResidentService) {}

  @Post('create')
  createResident(@Body() payload: CreateResidentDTO) {
    return this.residentService.createResident(payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('edit/:id')
  editResident(@Param('id') residentId: string, payload: EditResidentDTO) {
    return this.residentService.editResident(residentId, payload);
  }

  @Get('all')
  getAll() {
    return this.residentService.getAll();
  }

  @Get('/:id')
  findOne(@Param('id') residentId: string) {
    return this.residentService.findOne(residentId);
  }

  @Delete('/:id')
  deleteResident(@Param('id') residentId: string) {
    return this.residentService.deleteResident(residentId);
  }
}
