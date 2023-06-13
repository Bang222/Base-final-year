import { IsEmail, IsNotEmpty } from 'class-validator';
import { SEX } from '@prisma/client';

export class RegisterDTO {
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  hasPassword: string;
  sex: SEX;
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  DateOfBirth?: string;
  modified?: Date;
  createdTime?: Date;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phone: string;
}

export class LoginDTO {
  userName?: string;
  email?: string;
  phone?: string;
  @IsNotEmpty()
  hasPassword: string;
}
export class LoginWithGoogleDTO {
  email?: string;
  id?: string;
  userName?: string;
}
