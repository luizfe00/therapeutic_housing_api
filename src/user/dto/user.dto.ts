import { IsString, IsNotEmpty, IsEmail, IsNumberString } from 'class-validator';

export class UserEditDTO {
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsNumberString()
  @IsNotEmpty()
  document?: string;
}
