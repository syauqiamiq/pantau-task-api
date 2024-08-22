import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { IUser } from 'src/databases/interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepositories: Repository<IUser>,
  ) {}

  async login() {
    const data = await this.userRepositories.find({
      relations: {
        userCredential: true,
        userAttachments: true,
      },
    });

    return data;
  }
}
