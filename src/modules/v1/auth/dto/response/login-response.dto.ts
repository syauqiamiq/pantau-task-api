export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;

  static toResponse(data: LoginResponseDto): LoginResponseDto {
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
}
