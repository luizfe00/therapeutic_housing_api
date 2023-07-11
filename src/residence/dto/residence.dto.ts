import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  complement?: string;

  residents?: string[];
  careTakers?: string[];
}

export class EditResidenceDTO {
  @IsString()
  @IsNotEmpty()
  residenceId: string;

  @IsNumber()
  addressId?: number;

  @IsString()
  name?: string;

  @IsString()
  street?: string;

  @IsNumber()
  streetNumber?: number;

  @IsString()
  zipCode?: string;

  @IsString()
  neighborhood?: string;

  @IsString()
  city?: string;

  @IsString()
  state?: string;

  @IsString()
  complement?: string;

  residents?: string[];
  careTakers?: string[];
}
