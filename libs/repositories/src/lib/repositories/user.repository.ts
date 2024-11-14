import { UserRepoInterface } from '@repositories';
import { User } from '@entity';
import { DataSource, DeepPartial, FilterOperators, FindOperator } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BasicMongoRepository } from './basic.mongo.repository';

@Injectable()
export class UserRepository extends BasicMongoRepository<User> implements UserRepoInterface {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  register = (entityLike: DeepPartial<User>): Promise<User> => {
    const entity = this.create(entityLike);
    return this.save(entity).catch(({ errno, message, code }) => {
      if (errno != 1062 || code == 11000) {
        throw new BadRequestException({ message });
      }
      const errors = {
        email: 'Email already exists',
      };
      throw new BadRequestException({ errors });
    });
  };

  prepareFilter(
    column: string,
    condition: any
  ): undefined | Record<string, FindOperator<unknown> | FilterOperators<unknown>> {
    switch (column) {
      case 'password':
        return null;
    }
    return;
  }
}
