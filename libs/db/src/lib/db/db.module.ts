import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';

@Module({})
export class DBModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    const mergeOptions = {
      ...config,
      ...options,
    } as TypeOrmModuleOptions;

    return {
      module: DBModule,
      imports: [TypeOrmModule.forRoot(mergeOptions)],
    };
  }
}
