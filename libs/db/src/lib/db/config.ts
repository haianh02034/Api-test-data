import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const type: any = process?.env?.DB_TYPE || 'mysql';
const config: TypeOrmModuleOptions = {
  type: type,
  host: process?.env?.DB_HOST || 'localhost',
  port: +(process?.env?.DB_POST || 3306),
  username: process?.env?.DB_USERNAME || 'root',
  password: process?.env?.DB_PASSWORD || '',
  database: process?.env?.DB_DATABASE || 'demo',
  autoLoadEntities: true,

  authSource: type === 'mongodb' ? 'admin' : undefined,
  synchronize: type === 'mongodb',
};

export default config;
