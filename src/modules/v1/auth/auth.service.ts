import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from 'src/common/interfaces/jwt.interface';
import { RedisCacheService } from 'src/common/services/redis.service';
import { config } from 'src/config';
import { User } from 'src/databases/entities/user.entity';
import { IUser } from 'src/databases/interfaces/user.interface';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LoginPayloadV1Dto } from './dto/request/login-request.dto';
import { RegisterPayloadV1Dto } from './dto/request/register-request.dto';
import { IUserCredential } from 'src/databases/interfaces/user-credential.interface';
import { UserCredential } from 'src/databases/entities/user-credential.entity';
import { RefreshTokenPayloadV1Dto } from './dto/request/refresh-token-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<IUser>,
    @InjectRepository(UserCredential)
    private userCredentialRepository: Repository<IUserCredential>,
    private jwtService: JwtService,
    private redisService: RedisCacheService,
  ) {}
  async login(payload: LoginPayloadV1Dto) {
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
    const jwtRefreshToken = await this.jwtService.signAsync(jwtPayload, {
      algorithm: 'HS256',
      secret: config.jwt.refreshSecret,
      expiresIn: config.jwt.refreshTokenExpiresIn,
    });

    // Save Refresh Token to Redis
    // TTL in Second
    const refreshTokenCacheTTL = parseInt(config.jwt.refreshTokenExpiresIn);
    try {
      await this.redisService.set(
        `authentication:${userData.uuid}:refresh-token`,
        jwtRefreshToken,
        refreshTokenCacheTTL,
      );
      await this.redisService.set(
        `authentication:${userData.uuid}:access-token`,
        jwtAccessToken,
        parseInt(config.jwt.expiresIn),
      );
    } catch (error) {
      throw new BadRequestException('Failed to save token');
    }

    // Return JWT Access
    return {
      accessToken: jwtAccessToken,
      refreshToken: jwtRefreshToken,
    };
  }

  async register(payload: RegisterPayloadV1Dto) {
    // Find user by email
    const userData = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
      relations: ['userCredential'],
    });
    // if already exist
    if (userData) {
      throw new BadRequestException('User already registered');
    }

    // create hash password
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('failed to create password');
    }
    // create user
    const createdUser = await this.userRepository.save({
      fullName: payload.full_name,
      address: payload.address,
      contactNumber: payload.contact_number,
      email: payload.email,
    });
    if (!createdUser) {
      throw new BadRequestException('failed to create user');
    }
    // create credential
    const createdCredential = await this.userCredentialRepository.save({
      password: hashedPassword,
      isActive: true,
      userId: createdUser.id,
    });
    if (!createdCredential) {
      throw new BadRequestException('failed to create credential');
    }

    // TODO: send email verification

    return createdUser;
  }

  async logout(userUuid: string) {
    const userData = await this.userRepository.findOne({
      where: {
        uuid: userUuid,
      },
    });
    if (!userData) {
      throw new NotFoundException('User not found');
    }

    try {
      await this.redisService.del(
        `authentication:${userData.uuid}:refresh-token`,
      );
      await this.redisService.del(
        `authentication:${userData.uuid}:access-token`,
      );
    } catch (error) {
      throw new BadRequestException('Failed to delete refresh token');
    }
    return true;
  }

  async refreshToken(payload: RefreshTokenPayloadV1Dto) {
    // VERIFY REFRESH TOKEN
    let refreshTokenPayload;
    try {
      refreshTokenPayload = await this.jwtService.verifyAsync(
        payload.refresh_token,
        {
          secret: config.jwt.refreshSecret,
        },
      );
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
    if (!refreshTokenPayload) {
      throw new BadRequestException('Invalid refresh token');
    }

    // CHECK USER UUID EXIST ON DATABASE
    const userData = await this.userRepository.findOne({
      where: {
        uuid: refreshTokenPayload.userUuid,
      },
    });
    if (!userData) {
      throw new BadRequestException('Invalid refresh token');
    }

    // GET SAVED REFRESH TOKEN
    const savedRefreshToken = await this.redisService.get(
      `authentication:${userData.uuid}:refresh-token`,
    );

    // IF NOT EXIST ON REDIS
    if (!savedRefreshToken) {
      throw new BadRequestException('Invalid refresh token');
    }

    // COMPARE REFRESH TOKEN
    if (savedRefreshToken !== payload.refresh_token) {
      throw new BadRequestException('Invalid refresh token');
    }

    // GENERATE NEW ACCESS AND REFRESH TOKEN
    const jwtPayload: IJwtPayload = {
      userUuid: userData.uuid,
      email: userData.email,
      fullName: userData.fullName,
    };

    const newRefreshToken = await this.jwtService.signAsync(jwtPayload, {
      algorithm: 'HS256',
      secret: config.jwt.refreshSecret,
      expiresIn: config.jwt.refreshTokenExpiresIn,
    });

    const jwtAccessToken = await this.jwtService.signAsync(jwtPayload, {
      algorithm: 'HS256',
    });

    // SAVE NEW  TOKEN TO REDIS
    await this.redisService.set(
      `authentication:${userData.uuid}:access-token`,
      jwtAccessToken,
      parseInt(config.jwt.expiresIn),
    );
    await this.redisService.set(
      `authentication:${userData.uuid}:refresh-token`,
      newRefreshToken,
      parseInt(config.jwt.refreshTokenExpiresIn),
    );
    return {
      accessToken: jwtAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
