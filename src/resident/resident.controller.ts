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
  Query,
  Res,
} from '@nestjs/common';
import { JWTGuard } from 'src/auth/guard';
import { ResidentService } from './resident.service';
import { CreateResidentDTO, EditResidentDTO } from './dto/resident.dto';
import { Response } from 'express';

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
  getAll(@Query() query: { startDate: string; endDate: string }) {
    return this.residentService.getAll(query.startDate, query.endDate);
  }

  @Get('/:id')
  findOne(@Param('id') residentId: string) {
    return this.residentService.findOne(residentId);
  }

  @Delete('/:id')
  deleteResident(@Param('id') residentId: string) {
    return this.residentService.deleteResident(residentId);
  }

  @Post('parseCsv')
  parseResidents(@Query() query: { startDate: string; endDate: string }) {
    return this.residentService.parseResidents(query.startDate, query.endDate);
  }

  @Post('parsePDF')
  parsePDF(
    @Query() query: { startDate: string; endDate: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment;`,
    });
    return this.residentService.parsePDF(query.startDate, query.endDate);
  }
}
