import { ModuleRef } from '@nestjs/core';
import { PaginateDto } from '@dtos';
import { BasicRepoInterface } from './../interfaces/basic.repo.interface';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import {
  And,
  Between,
  DeepPartial,
  Equal,
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  FindOptionsWhere,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
  ObjectLiteral,
  Repository,
  UpdateResult,
} from 'typeorm';
import { RelationMetadata } from 'typeorm/metadata/RelationMetadata';
import { LoggerService } from '@logger';
import { repo } from '@nest-utils';

export class BasicRepository<Entity extends ObjectLiteral>
  extends Repository<Entity>
  implements BasicRepoInterface<Entity>
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
    criteria: string | string[] | number | number[] | Date | Date[] | FindOptionsWhere<Entity>,
    entityLike: DeepPartial<Entity>
  ): Promise<UpdateResult> => {
    const entity = this.create(entityLike);
    delete entity.id;
    return this.update(criteria, entity).catch(({ message }) => {
      throw new BadRequestException({ message });
    });
  };

  paginate = async (paginate: PaginateDto, options: FindManyOptions<Entity>) => {
    const { page, perPage } = paginate;
    const take = perPage;
    const skip = (page - 1) * take;
    return await this.findAndCount({ ...options, take, skip });
  };

  async findOneOrFail(options: FindOneOptions<Entity>): Promise<Entity> {
    return super.findOneOrFail(options).catch(this.modelNotFound);
  }

  async findOneByOrFail(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]): Promise<Entity> {
    return super.findOneByOrFail(where).catch(this.modelNotFound);
  }

  protected modelNotFound = () => {
    const entity = this.target?.['name'] || 'Unknow Model';
    throw new NotFoundException(`Requested ${entity} not found.`);
  };

  findWhere(
    filters: FindOptionsWhere<Entity>[] | FindOptionsWhere<Entity> | FindOptionsWhere<unknown>
  ): FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[] | FindOptionsWhere<unknown> {
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

  prepareFilter(column: string, condition: any): undefined | Record<string, FindOperator<unknown>> {
    return;
  }

  _prepareFilter(column: string, condition: any) {
    if (condition === null) {
      return IsNull();
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

  protected operatorFilter(conditions: unknown[]): FindOperator<unknown> {
    const [operator, value] = conditions;
    switch (operator) {
      case '<':
        return LessThan(value);

      case '<=':
        return LessThanOrEqual(value);

      case '=':
        if (Array.isArray(value)) {
          return In(value);
        }
        return Equal(value);

      case '<>':
      case '!=':
        if (Array.isArray(value)) {
          return Not(In(value));
        }
        return Not(value);

      case '>':
        return MoreThan(value);

      case '>=':
        return MoreThanOrEqual(value);

      case '>=<':
        if (Array.isArray(value) && value?.length >= 2) {
          const [from, to] = value;
          return Between(from, to);
        }
        return;

      case 'LIKE':
      case '%LIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return Like(`%${value}%`);
        }
        return;

      case '%LIKE':
        if (typeof value === 'string' || typeof value === 'number') {
          return Like(`%${value}`);
        }
        return;

      case 'LIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return Like(`${value}%`);
        }
        return;

      case 'ILIKE':
      case '%ILIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return ILike(`%${value}%`);
        }
        return;

      case '%ILIKE':
        if (typeof value === 'string' || typeof value === 'number') {
          return ILike(`%${value}`);
        }
        return;

      case 'ILIKE%':
        if (typeof value === 'string' || typeof value === 'number') {
          return ILike(`${value}%`);
        }
        return;

      case '__AND':
        if (Array.isArray(value)) {
          return And(...value.map((val) => (Array.isArray(val) ? this.operatorFilter(val) : Equal(val))));
        }
        return;

      default:
        return In(conditions);
    }
  }
}
