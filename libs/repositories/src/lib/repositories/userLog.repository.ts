import { UserLogRepoInterface } from '@repositories';
import { UserLog } from '@entity';
import { DataSource, FilterOperators, FindOperator } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BasicMongoRepository } from './basic.mongo.repository';

@Injectable()
export class UserLogRepository extends BasicMongoRepository<UserLog> implements UserLogRepoInterface {
  constructor(dataSource: DataSource) {
    super(UserLog, dataSource.createEntityManager());
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
