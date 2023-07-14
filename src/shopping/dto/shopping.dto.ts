import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateShoppingDTO {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsNotEmpty()
  residentId: string;
}

export class EditShoppingDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  residentId: string;
}

export class ShoppingQueryDTO {
  @IsUUID()
  id: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}
