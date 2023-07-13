import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ResidenceService } from './residence.service';
import {
  AddressDTO,
  CreateResidenceDTO,
  EditResidenceDTO,
} from './dto/residence.dto';
import { JWTGuard } from 'src/auth/guard';

@UseGuards(JWTGuard)
@Controller('residence')
export class ResidenceController {
  constructor(private residenceService: ResidenceService) {}

  @Post('create')
  createResidence(@Body() payload: CreateResidenceDTO) {
    return this.residenceService.create(payload);
  }

  @Get('all')
  getAll() {
    return this.residenceService.getAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('edit')
  editResidence(@Body() payload: EditResidenceDTO) {
    return this.residenceService.update(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  deleteResidence(@Param('id') residenceId: string) {
    return this.residenceService.deleteResidence(residenceId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('address/delete/:id')
  deleteAddress(@Param('id') addressId: number) {
    return this.residenceService.deleteAddress(addressId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('edit/address')
  editAddress(@Body() payload: AddressDTO) {
    return this.residenceService.updateAddress(payload);
  }
}
