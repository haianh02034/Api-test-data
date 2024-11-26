import { TelegramMessageRepoInterface } from '@repositories';
import { TelegramMessage } from '@entity';
import { DataSource, FilterOperators, FindOperator } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BasicMongoRepository } from './basic.mongo.repository';

@Injectable()
export class TelegramMessageRepository extends BasicMongoRepository<TelegramMessage> implements TelegramMessageRepoInterface {
  constructor(dataSource: DataSource) {
    super(TelegramMessage, dataSource.createEntityManager());
  }

  prepareFilter(
    column: string,
    condition: any
  ): undefined | Record<string, FindOperator<unknown> | FilterOperators<unknown>> {
    switch (column) {
    }
    return;
  }
}
