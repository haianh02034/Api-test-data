import { PaginateDto } from '@dtos';
import { DeepPartial, FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository, UpdateResult } from 'typeorm';

export interface BasicRepoInterface<Entity extends ObjectLiteral> extends Repository<Entity> {
  findByIdOrFail(id: any): Promise<Entity>;
  createOrFail(entityLike: DeepPartial<Entity>): Promise<Entity>;
  updateOrFail(
    criteria: string | string[] | number | number[] | Date | Date[] | FindOptionsWhere<Entity>,
    entityLike: DeepPartial<Entity>
  ): Promise<UpdateResult>;

  paginate(paginate: PaginateDto, options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;

  findWhere(
    filters: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity> | FindOptionsWhere<unknown>
  ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] | FindOptionsWhere<unknown>;
}
