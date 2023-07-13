import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class UserEditDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  userName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  document?: string;
}
