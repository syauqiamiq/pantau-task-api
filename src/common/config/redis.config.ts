import { CacheModuleOptions } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { config } from 'src/config';
//
var redisStore = require('cache-manager-redis-store').redisStore;

export const redisConfig: CacheModuleOptions & RedisClientOptions = {
  isGlobal: true,

  store: redisStore,
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.pass,
};
