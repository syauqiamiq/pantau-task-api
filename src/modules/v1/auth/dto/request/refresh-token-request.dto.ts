import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenPayloadV1Dto {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
