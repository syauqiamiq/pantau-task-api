import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  app: {
    env: process.env.APP_ENV || 'development',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    name: process.env.DB_NAME || 'postgres',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRE || '24h',
  },
  redis: {
    host: process.env.REDIS_HOST || 'admin',
    port: process.env.REDIS_PORT || 6379,
    pass: process.env.REDIS_PASS || 'admin',
  },
  //   failedLoginMaxAttempts: parseInt(process.env.FAILED_LOGIN_MAX_ATTEMPTS) || 3,
};
