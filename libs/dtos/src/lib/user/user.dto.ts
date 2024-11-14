import { plainClass } from '@nest-utils';
import { timestamp } from '@utils';
import { Expose, Transform } from 'class-transformer';
import { Permissions } from './permissions.dto';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  is_active: boolean;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  agent: string;

  @Expose()
  commands: string;

  @Expose()
  product_code: string;

  @Expose()
  @Transform(({ value }) => timestamp(value))
  createdAt: number;

  @Expose()
  @Transform(({ value }) => timestamp(value))
  updatedAt: number;
  
  @Expose()
  @Transform(({ obj }) => plainClass(Permissions, obj))
  permissions: Permissions;
}
