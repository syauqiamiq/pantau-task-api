export class RefreshTokenResponseDto {
  access_token: string;
  refresh_token: string;

  static toResponse(data: RefreshTokenResponseDto): RefreshTokenResponseDto {
    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    };
  }
}
