import { Module } from '@nestjs/common';
import { CaretakerController } from './caretaker.controller';
import { CaretakerService } from './caretaker.service';

@Module({
  controllers: [CaretakerController],
  providers: [CaretakerService],
})
export class CaretakerModule {}
