import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateIncomeDTO {
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class EditIncomeDTO {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class QueryIncomeDTO {
  @IsUUID()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  value: string;
}
