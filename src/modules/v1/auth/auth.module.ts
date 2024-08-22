import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/databases/entities/user.entity';
import { UserCredential } from 'src/databases/entities/user-credential.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { RedisCacheService } from 'src/common/services/redis.service';

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
  providers: [AuthService, RedisCacheService],
})
export class AuthModule {}
