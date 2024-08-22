import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginPayloadV1Dto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
