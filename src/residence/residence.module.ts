import { Module } from '@nestjs/common';
import { ResidenceController } from './residence.controller';
import { ResidenceService } from './residence.service';

@Module({
  controllers: [ResidenceController],
  providers: [ResidenceService],
})
export class ResidenceModule {}
