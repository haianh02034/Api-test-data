import { UserPolicy } from './policies/user.policy';
import { AuthPayloadDto } from '@dtos';
import { User } from '@entity';
const permissionMaps = [
  {
    types: [AuthPayloadDto, User],
    policy: UserPolicy,
  },
];

export default permissionMaps;
