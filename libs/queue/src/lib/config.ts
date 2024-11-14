import { BullModuleOptions } from '@nestjs/bull';

const config: BullModuleOptions = {
  redis: {
    host: process?.env?.REDIS_HOST || 'localhost',
    port: parseInt(process?.env?.REDIS_PORT, 10) || 6379,
  },
  defaultJobOptions: {
    timeout: parseInt(process?.env?.QUEUE_TIMEOUT, 10) || 30000,
    removeOnComplete: true,
  },
  prefix: process?.env?.QUEUE_PREFIX || 'QUEUE',
};

export default config;
