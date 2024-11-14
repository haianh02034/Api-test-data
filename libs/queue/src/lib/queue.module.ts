import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { Module, DynamicModule } from '@nestjs/common';
import { AutoClean } from './auto-clean';
import { QueueNames } from './queue-names';
import config from './config';

@Module({})
export class QueueModule {
  static forRoot(options?: BullModuleOptions & { names?: string[] }): DynamicModule {
    let queueNames = [];
    if (options?.name) {
      queueNames.push(options?.name);
    }

    if (options?.names?.length) {
      queueNames = [...queueNames, ...options.names];
      delete options.names;
    }

    if (!queueNames?.length) {
      queueNames = Object.values(QueueNames);
    }
    const QueueRegisters = queueNames.map((queueName) =>
      BullModule.registerQueue({
        ...options,
        name: queueName,
      })
    );

    return {
      module: QueueModule,
      imports: [
        BullModule.forRoot({
          ...config,
          ...options,
        }),
        ...QueueRegisters,
      ],
      exports: QueueRegisters,
      providers: [
        {
          provide: 'QUEUE-NAMES',
          useValue: queueNames,
        },
        AutoClean,
      ],
      global: true,
    };
  }
}
