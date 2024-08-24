import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator';
import { config } from 'src/config';
import { Request } from 'express';
import { RedisCacheService } from '../services/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private redisService: RedisCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let accessTokenRedis;

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwt.secret,
      });
      try {
        accessTokenRedis = await this.redisService.get(
          `authentication:${payload.userUuid}:access-token`,
        );
      } catch (error) {
        throw new UnauthorizedException();
      }

      if (!accessTokenRedis) {
        throw new UnauthorizedException();
      }

      if (token !== accessTokenRedis) {
        throw new UnauthorizedException();
      }

      request['jwtPayload'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
