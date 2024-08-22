import { CacheStore } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from 'src/common/interfaces/jwt.interface';
import { config } from 'src/config';
import { User } from 'src/databases/entities/user.entity';
import { IUser } from 'src/databases/interfaces/user.interface';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LoginPayloadV1Dto } from './dto/request/login-request.dto';
import { RedisCacheService } from 'src/common/services/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<IUser>,
    private jwtService: JwtService,
    private redisService: RedisCacheService,
  ) {}
  async login(payload: LoginPayloadV1Dto) {
    try {
      // Find user by email
      const userData = await this.userRepository.findOne({
        where: {
          email: payload.email,
          userCredential: {
            isActive: true,
          },
        },
        relations: ['userCredential'],
      });
      if (!userData) {
        throw new BadRequestException('Username or Password wrong');
      }
      // Compare Hashed Password
      const isValidPassword = await bcrypt.compare(
        payload.password,
        userData.userCredential.password,
      );
      if (!isValidPassword) {
        throw new BadRequestException('Username or Password wrong');
      }
      // Generate JWT Access
      const jwtPayload: IJwtPayload = {
        userUuid: userData.uuid,
        email: userData.email,
        fullName: userData.fullName,
      };

      const jwtAccessToken = await this.jwtService.signAsync(jwtPayload, {
        algorithm: 'HS256',
      });
      // Generate Refresh Token
      const refreshToken = uuidv4();
      // Save Refresh Token to Redis
      // TTL in Second
      const cacheTTL = parseInt(config.jwt.refreshTokenExpiresIn);
      try {
        await this.redisService.set(
          `authentication:${userData.uuid}:refresh-token`,
          refreshToken,
          cacheTTL,
        );
      } catch (error) {
        throw new BadRequestException('Failed to save refresh token');
      }

      // Return JWT Access
      return {
        accessToken: jwtAccessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException('Server Error');
    }
  }
}
