import { User } from '@entity';
import { BasicRepoInterface } from './basic.repo.interface';
import { DeepPartial } from 'typeorm';

export interface UserRepoInterface extends BasicRepoInterface<User> {
  register(entityLike: DeepPartial<User>): Promise<User>;
}

