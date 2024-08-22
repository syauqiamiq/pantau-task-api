import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheStore) {}

  async set(key: string, value: any, ttl: number) {
    await this.cacheManager.set(key, value, { ttl });
  }

  async get(key: string) {
    return await this.cacheManager.get(key);
  }

  async del(key: string) {
    await this.cacheManager.del(key);
  }
}
