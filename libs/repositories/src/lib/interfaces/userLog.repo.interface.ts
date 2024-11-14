import { UserLog } from '@entity';
import { BasicMongoRepoInterface } from './basic.mongo.repo.interface';
import { UserLogDtos } from '@dtos';

export interface UserLogRepoInterface extends BasicMongoRepoInterface<UserLog> {}
