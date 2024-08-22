import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPayloadV1Dto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  contact_number: string;

  @IsString()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
