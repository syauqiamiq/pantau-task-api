import { config } from 'src/config';
import { DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { UserCredential } from './entities/user-credential.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [User, UserCredential],
  synchronize: false,
  // logging: config.app.env === 'development',
  logging: true,
  migrations: ['dist/databases/migrations/*{.ts,.js}'],
};
