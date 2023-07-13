import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateResidenceDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  streetNumber: number;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsString()
  complement?: string;

  residents?: string[];
  careTakers?: string[];
}

export class EditResidenceDTO {
  @IsString()
  @IsNotEmpty()
  residenceId: string;

  @IsOptional()
  @IsNumber()
  addressId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsNumber()
  streetNumber?: number;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  residents?: string[];
  careTakers?: string[];
}

export class AddressDTO {
  @IsNumber()
  @IsNotEmpty()
  addressId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  streetNumber: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsString()
  complement?: string;
}
