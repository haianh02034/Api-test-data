import { TelegramMessage } from '@entity';
import { BasicMongoRepoInterface } from './basic.mongo.repo.interface';

export interface TelegramMessageRepoInterface extends BasicMongoRepoInterface<TelegramMessage> {}

