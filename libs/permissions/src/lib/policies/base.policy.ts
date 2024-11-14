import { User } from '@entity';

export class BasePolicy {
  constructor(protected readonly visitor: User, protected readonly permissions: Record<string, unknown>) {}

  hasPermission = (permission: string) => {
    return this.permissions?.[permission] || false;
  };
}
