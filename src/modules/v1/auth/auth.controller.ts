import { Body, Controller, Post } from '@nestjs/common';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { AuthService } from './auth.service';
import { LoginPayloadV1Dto } from './dto/request/login-request.dto';
import { RegisterPayloadV1Dto } from './dto/request/register-request.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() payloadBody: LoginPayloadV1Dto,
  ): Promise<IApiResponse<LoginResponseDto>> {
    const data = await this.authService.login(payloadBody);
    return {
      message: 'Login success',
      data: LoginResponseDto.toResponse(data),
    };
  }

  @Post('register')
  async register(
    @Body() payloadBody: RegisterPayloadV1Dto,
  ): Promise<IApiResponse<RegisterResponseDto>> {
    const data = await this.authService.login(payloadBody);
    return {
      message: 'Register success',
      data: LoginResponseDto.toResponse(data),
    };
  }
}
