import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ModuleRef } from '@nestjs/core';
import { getQueueToken } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AutoClean {
  @Inject('QUEUE-NAMES')
  private queueNames: Record<string, string>;

  constructor(private moduleRef: ModuleRef) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async resetQueue(): Promise<void> {
    const listQueue = Object.values(this.queueNames)
      .map((name) => {
        try {
          const queue = this.moduleRef.get<string, Queue>(getQueueToken(name), {
            strict: false,
          });
          return queue;
        } catch (error) {
          return null;
        }
      })
      .filter((item) => item != null);

    listQueue?.forEach(async (queue) => {
      await queue.clean(1000);
      await queue.clean(1000, 'active');
      await queue.clean(1000, 'failed');
      await queue.clean(1000, 'wait');
    });

    return;
  }
}
