import { AuthPayloadDto } from '@dtos';
import { User } from '@entity';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PermissionRepoInterface, UserRepoInterface } from '@repositories';
import { concatMap, every, takeWhile, lastValueFrom, from } from 'rxjs';
import config from './config';
import permissionMaps from './permissions.map';
import { BasePolicy } from './policies/base.policy';

@Injectable()
export class PermissionsService {
  private visitor;
  private permissions;

  @Inject('REPOSITORIES.USER')
  private userRepo: UserRepoInterface;

  @Inject('REPOSITORIES.PERMISSION')
  private permissionRepo: PermissionRepoInterface;

  @Inject(REQUEST)
  private readonly request: Request & { user?: AuthPayloadDto };

  findVisitor = async (): Promise<User | null> => {
    if (this.visitor === undefined) {
      this.visitor = null;

      const { user } = this.request;
      if (user?.id) {
        this.visitor = await this.userRepo.findByIdOrFail(user.id);
      }
    }
    return this.visitor;
  };

  findPermisions = async () => {
    if (this.permissions === undefined) {
      const visitor = await this.findVisitor();
      this.permissions = await this.permissionRepo.findPermissionsByUser(visitor);
    }
    return this.permissions;
  };

  can = async (abilities: string | string[], ...args: unknown[]) => {
    if (typeof abilities === 'string') {
      return this.check(abilities, ...args);
    }

    const source$ = from(abilities).pipe(
      concatMap((val) => this.check(val, ...args)),
      every((allow) => !!allow)
    );
    return lastValueFrom(source$);
  };

  canAny = async (abilities: Array<string | string[]>, ...args: unknown[]) => {
    const source$ = from(abilities).pipe(
      concatMap((abilitie) => this.can(abilitie, ...args)),
      takeWhile((val) => !val, true)
    );
    return lastValueFrom(source$);
  };

  cant = async <T>(props: T) => this.canNot.apply(this, props);
  canNot = async <T>(props: T) => !(await this.can.apply(this, props));

  private check = async (ability: string, ...args: unknown[]): Promise<boolean> => {
    const { user } = this.request;
    if (this.isSupperAdmin(user?.id)) {
      return true;
    }
    const visitor = await this.findVisitor();
    const permissions = await this.findPermisions();

    const policyName = this.findPolicy(args);
    const policy = new policyName(visitor, permissions);
    if (policy && typeof policy?.[ability] === 'function') {
      return await policy?.[ability].apply(null, args);
    }
    return false;
  };

  private findPolicy = (args: any[]) => {
    for (let index = 0; index < args?.length; index++) {
      const arg = args[index];
      const { policy } = permissionMaps?.find(({ types }) => !!types?.find((type) => arg instanceof type)) || {};
      if (policy) {
        return policy;
      }
    }
    return BasePolicy;
  };

  isSupperAdmin = (userId: number) => {
    const { superAdminIds } = config;
    return userId && superAdminIds?.includes(userId);
  };
}
