import { Body, Controller, Post, Request } from '@nestjs/common';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { AuthService } from './auth.service';
import { LoginPayloadV1Dto } from './dto/request/login-request.dto';
import { RegisterPayloadV1Dto } from './dto/request/register-request.dto';
import { LoginResponseDto } from './dto/response/login-response.dto';
import { RegisterResponseDto } from './dto/response/register-response.dto';
import { Public } from 'src/common/decorators/auth.decorator';

import { IRequestJwtPayload } from 'src/common/interfaces/jwt.interface';
import { RefreshTokenPayloadV1Dto } from './dto/request/refresh-token-request.dto';
import { RefreshTokenResponseDto } from './dto/response/refresh-token-response.dto';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
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

  @Public()
  @Post('register')
  async register(
    @Body() payloadBody: RegisterPayloadV1Dto,
  ): Promise<IApiResponse<RegisterResponseDto>> {
    const data = await this.authService.register(payloadBody);
    return {
      message: 'Register success',
      data: RegisterResponseDto.toResponse(data),
    };
  }

  @Post('logout')
  async logout(
    @Request() req: Request & IRequestJwtPayload,
  ): Promise<IApiResponse<RegisterResponseDto>> {
    const data = await this.authService.logout(req.jwtPayload.userUuid);
    return {
      message: 'Logout success',
      data: null,
    };
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(
    @Body() payload: RefreshTokenPayloadV1Dto,
  ): Promise<IApiResponse<RefreshTokenResponseDto>> {
    const data = await this.authService.refreshToken(payload);
    return {
      message: 'Refresh token success',
      data: RefreshTokenResponseDto.toResponse({
        access_token: data.accessToken,
        refresh_token: data.refreshToken,
      }),
    };
  }
}
