import { ModuleRef } from '@nestjs/core';
import { PaginateDto } from '@dtos';
import { BasicRepoInterface } from '../interfaces/basic.repo.interface';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FilterOperators,
  FindOneOptions,
  FindOperator,
  FindOptionsWhere,
  MongoRepository,
  ObjectId,
  ObjectLiteral,
  UpdateResult,
} from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { LoggerService } from '@logger';
import { repo } from '@nest-utils';
import { MongoFindManyOptions } from 'typeorm/find-options/mongodb/MongoFindManyOptions';
import { BasicMongoRepoInterface } from '../interfaces/basic.mongo.repo.interface';

export class BasicMongoRepository<Entity extends ObjectLiteral>
  extends MongoRepository<Entity>
  implements BasicMongoRepoInterface<Entity>
{
  @Inject(ModuleRef)
  private readonly moduleRef: ModuleRef;

  @Inject(LoggerService)
  private readonly logger: LoggerService;

  findByIdOrFail = (id: any): Promise<Entity> => {
    return this.findOneByOrFail({ id });
  };

  createOrFail = async (entityLike: DeepPartial<Entity>): Promise<Entity> => {
    const entity = this.create(entityLike);
    return this.save(entity).catch(({ message }) => {
      throw new BadRequestException({ message });
    });
  };

  updateOrFail = async (
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectId | ObjectId[] | FindOptionsWhere<Entity>,
    entityLike: DeepPartial<Entity>
  ): Promise<UpdateResult> => {
    const entity = this.create(entityLike);
    delete entity.id;
    return this.update(criteria, entity).catch(({ message }) => {
      throw new BadRequestException({ message });
    });
  };

  paginate = async (paginate: PaginateDto, options: MongoFindManyOptions<Entity>) => {
    const { page, perPage } = paginate;
    const take = perPage;
    const skip = (page - 1) * take;
    return await this.findAndCount({ ...options, take, skip });
  };

  async findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
    return super.findOneOrFail(options).catch(this.modelNotFound);
  }

  async findOneByOrFail(where: any): Promise<Entity> {
    return super.findOneByOrFail(where).catch(this.modelNotFound);
  }

  protected modelNotFound = () => {
    const entity = this.target?.['name'] || 'Unknow Model';
    throw new NotFoundException(`Requested ${entity} not found.`);
  };

  findWhere(filters: any): FilterOperators<Entity> | any {
    if (!filters) {
      return;
    }

    if (Array.isArray(filters)) {
      return filters.map((f: unknown) => this.findWhere(f));
    }

    if (typeof filters !== 'object') {
      return;
    }

    return Object.entries(filters).reduce((conditions, [field, condition]) => {
      if (condition === undefined) {
        return conditions;
      }

      const _conditions = this.prepareFilter(field, condition);
      if (_conditions !== undefined) {
        if (typeof _conditions === 'object') {
          return { ...conditions, ..._conditions };
        }
        return conditions;
      }

      if (field.indexOf('$') === 0) {
        return { ...conditions, [field]: this.findWhere(condition) };
      }

      const column = this.metadata.findColumnWithPropertyName(field);
      if (column) {
        return { ...conditions, [field]: this._prepareFilter(field, condition) };
      }

      const relation = this.metadata.findRelationWithPropertyPath(field);
      if (relation) {
        const relationRepo = this.getRelationRepo(relation);
        if (relationRepo) {
          return { ...conditions, [field]: relationRepo.findWhere(condition) };
        }
        return conditions;
      }

      return conditions;
    }, {});
  }

  prepareFilter(
    column: string,
    condition: any
  ): undefined | Record<string, FindOperator<unknown> | FilterOperators<unknown>> {
    return;
  }

  _prepareFilter(column: string, condition: any) {
    if (condition === null) {
      return { $exists: false };
    }

    if (['string', 'number', 'boolean'].includes(typeof condition) || condition instanceof FindOperator) {
      return condition;
    }

    if (Array.isArray(condition)) {
      try {
        return this.operatorFilter(condition);
      } catch (error) {
        this.logger.error('Operator Filter', { column, condition, error });
        return;
      }
    }
  }

  protected getRelationRepo(relation: RelationMetadata): BasicRepoInterface<Entity> | undefined {
    try {
      const repoService = repo(relation);
      return this.moduleRef.get(repoService);
    } catch (error) {
      return;
    }
  }

  protected operatorFilter(conditions: unknown[]): FindOperator<unknown> | FilterOperators<unknown> | any {
    const [operator, value] = conditions;
    switch (operator) {
      case '<':
        return { $lt: value };

      case '<=':
        return { $lte: value };

      case '=':
        if (Array.isArray(value)) {
          return { $in: value };
        }
        return { $eq: value };

      case '<>':
      case '!=':
        if (Array.isArray(value)) {
          return {
            $nin: value,
          };
        }
        return {
          $ne: value,
        };

      case '>':
        return { $gt: value };

      case '>=':
        return { $gte: value };

      case '>=<':
        if (Array.isArray(value) && value?.length >= 2) {
          const [from, to] = value;
          return {
            $gte: from,
            $lte: to,
          };
        }
        return;

      case 'LIKE':
      case '%LIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return {
            $regex: new RegExp(`${value}`, 'i'),
          };
        }
        return;

      case '%LIKE':
        if (typeof value === 'string' || typeof value === 'number') {
          return {
            $regex: new RegExp(`/${value}$/`, 'i'),
          };
        }
        return;

      case 'LIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return {
            $regex: new RegExp(`/^${value}/`, 'i'),
          };
        }
        return;

      case 'ILIKE':
      case '%ILIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return {
            $regex: new RegExp(`${value}`),
          };
        }
        return;

      case '%ILIKE':
        if (typeof value === 'string' || typeof value === 'number') {
          return {
            $regex: new RegExp(`/${value}$/`),
          };
        }
        return;

      case 'ILIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return {
            $regex: new RegExp(`/^${value}/`),
          };
        }
        return;

      case '__AND':
        return {
          $and: Array.isArray(value) ? this.operatorFilter(value) : this.operatorFilter([value]),
        };

      case '__OR':
        return {
          $or: Array.isArray(value) ? this.operatorFilter(value) : this.operatorFilter([value]),
        };

      case '__NOT':
        return {
          $not: Array.isArray(value) ? this.operatorFilter(value) : this.operatorFilter([value]),
        };

      case '__NOR':
        return {
          $nor: Array.isArray(value) ? this.operatorFilter(value) : this.operatorFilter([value]),
        };

      default:
        return {
          $in: conditions,
        };
    }
  }
}
