import { AuthPayloadDto } from '@dtos';
import { BasePolicy } from './base.policy';
import { User } from '@entity';

export class UserPolicy extends BasePolicy {
  edit = (user: AuthPayloadDto | User) => {
    return true;
  };

  update = (user: AuthPayloadDto | User) => {
    return true;
  };
}
