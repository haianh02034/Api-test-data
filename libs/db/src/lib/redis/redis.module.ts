import { Module, DynamicModule } from '@nestjs/common';
import { createClient, RedisClientOptions } from 'redis';

import config from './config';

@Module({})
export class RedisModule {
  static forRoot(options?: RedisClientOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: 'OPTIONS',
          useValue: { ...config, ...options },
        },
        {
          provide: 'REDIS_CLIENT',
          useFactory: async (options: RedisClientOptions) => {
            const client = createClient(options);
            await client.connect();
            return client;
          },
          inject: ['OPTIONS'],
        },
      ],
      exports: ['REDIS_CLIENT'],
      global: true,
    };
  }
}
