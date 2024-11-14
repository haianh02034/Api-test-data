import { Module, DynamicModule } from '@nestjs/common';
import { LoggerModuleOptions } from './interface';
import { LoggerService } from './logger.service';
import config from './config';

@Module({})
export class LoggerModule {
  static forRoot(options?: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        LoggerService,
        {
          provide: 'OPTIONS',
          useValue: { ...config, ...options },
        },
      ],
      exports: [LoggerService],
      global: true,
    };
  }
}
