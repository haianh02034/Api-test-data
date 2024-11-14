import { RoleRepoInterface } from '@repositories';
import { Role } from '@entity';
import { DataSource, FilterOperators, FindOperator } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BasicMongoRepository } from './basic.mongo.repository';

@Injectable()
export class RoleRepository extends BasicMongoRepository<Role> implements RoleRepoInterface {
  constructor(dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
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
