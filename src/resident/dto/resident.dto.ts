import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateResidentDTO {
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

  @IsString()
  @IsNotEmpty()
  residenceId: string;
}

export class EditResidentDTO {
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
  @IsString()
  @IsNotEmpty()
  residenceId?: string;

  income?: string[];
  shopping?: string[];
}
