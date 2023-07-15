import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateCareTakerDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  birthDate: string;

  @IsOptional()
  @IsArray()
  residenceIds: string[];
}

export class EditCareTakerDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  document?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  birthDate?: string;

  @IsOptional()
  @IsArray()
  residenceIds: string[];
}
