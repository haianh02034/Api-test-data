import { plainClass } from '@nest-utils';
import { Expose, Transform } from 'class-transformer';
// import { Permissions } from '../user/permissions.dto';

export class RoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  // @Transform(({ obj }) => plainClass(Permissions, obj))
  permissions: object;

}
