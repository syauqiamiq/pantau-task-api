import { IUser } from 'src/databases/interfaces/user.interface';

export class RegisterResponseDto {
  static toResponse(data: IUser): RegisterResponseDto {
    return {
      full_name: data.fullName,
    };
  }
}
