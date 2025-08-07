import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm'; // Use ConnectionOptions as a general type if needed, but not for specific properties

const type: any = process?.env?.DB_TYPE || 'mysql';

let config: TypeOrmModuleOptions;

if (type === 'mongodb') {
  config = {
    type: 'mongodb',
    url: `mongodb+srv://${process?.env?.DB_USERNAME}:${process?.env?.DB_PASSWORD}@${process?.env?.DB_HOST}/${process?.env?.DB_DATABASE}`,
    authSource: 'admin',
    autoLoadEntities: true,
    synchronize: true,
  };
} else {
  config = {
    type: type,
    host: process?.env?.DB_HOST || 'localhost',
    port: +(process?.env?.DB_POST || 3306),
    username: process?.env?.DB_USERNAME || 'root',
    password: process?.env?.DB_PASSWORD || '',
    database: process?.env?.DB_DATABASE || 'demo',
    autoLoadEntities: true,
    synchronize: false,
  };
}

export default config;
