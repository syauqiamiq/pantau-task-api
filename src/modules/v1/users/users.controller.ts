import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

import { IApiResponse } from 'src/common/interfaces/response.interface';
import { IUser } from 'src/databases/interfaces/user.interface';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly loginService: UsersService) {}

  @Get()
  async getUserByEmail(): Promise<IApiResponse<IUser[]>> {
    const data = await this.loginService.login();

    return {
      message: 'Login success',
      pagination_meta: {
        page: 1,
        per_page: 10,
        total: 100,
        total_page: 10,
      },
      data,
    };
  }
}
