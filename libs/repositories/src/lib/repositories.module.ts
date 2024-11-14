import { repo } from '@nest-utils';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entities from '@entity';
import * as subscribers from '@observer';
import * as repositories from './repositories';
import { DBModule } from '@db';

@Module({})
export class RepositoriesModule {
  static forRoot(options?: TypeOrmModuleOptions): DynamicModule {
    const { providers, exports } = Object.values(repositories).reduce(
      ({ providers, exports }, repoClass) => {
        const entity = repoClass.name.replace(/(?:repository|repositories|repo|repos)$/i, '');
        const provide = repo(entity);

        providers.push({
          provide,
          useClass: repoClass,
        });
        exports.push(provide);

        return { providers, exports };
      },
      {
        providers: [],
        exports: [],
      }
    );

    const arrEntities = Object.values(entities);
    const arrSubscribers = Object.values(subscribers);

    return {
      module: RepositoriesModule,
      imports: [
        DBModule.forRoot({
          ...options,
          entities: arrEntities,
          subscribers: arrSubscribers,
        }),
        TypeOrmModule.forFeature(arrEntities),
      ],
      providers,
      exports,
      global: true,
    };
  }
}
