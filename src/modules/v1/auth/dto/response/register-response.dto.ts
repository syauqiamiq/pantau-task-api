import { IUser } from 'src/databases/interfaces/user.interface';

export class RegisterResponseDto {
  full_name: string;
  email: string;
  static toResponse(data: IUser): RegisterResponseDto {
    return {
      full_name: data.fullName,
      email: data.email,
    };
  }
}
