import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { UserCredential } from 'src/databases/entities/user-credential.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { config } from 'src/config';
import { RedisCacheService } from 'src/common/services/redis.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCredential]),
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: `${config.jwt.expiresIn}s` },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RedisCacheService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
