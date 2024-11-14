import { PaginateDto } from '@dtos';
import { DeepPartial, FilterOperators, FindOptionsWhere, MongoRepository, ObjectLiteral, UpdateResult } from 'typeorm';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';

export interface BasicMongoRepoInterface<Entity extends ObjectLiteral> extends MongoRepository<Entity> {
  findByIdOrFail(id: any): Promise<Entity>;
  createOrFail(entityLike: DeepPartial<Entity>): Promise<Entity>;
  updateOrFail(
    criteria: string | string[] | number | number[] | Date | Date[] | FindOptionsWhere<Entity>,
    entityLike: DeepPartial<Entity>
  ): Promise<UpdateResult>;

  paginate(paginate: PaginateDto, options?: MongoFindManyOptions<Entity>): Promise<[Entity[], number]>;

  findWhere(
    filters:
      | FindOptionsWhere<Entity>[]
      | FindOptionsWhere<Entity>
      | FindOptionsWhere<unknown>
      | FilterOperators<unknown>
  ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] | FindOptionsWhere<unknown> | FilterOperators<unknown>;
}
