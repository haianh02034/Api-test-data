import { LoggerModuleOptions } from './interface';

const config: LoggerModuleOptions = {
  useLogConsole: process?.env?.LOGGER_USE_CONSOLE?.toLowerCase() !== 'false',
  useLogFile: process?.env?.LOGGER_USE_FILE?.toLowerCase() !== 'false',
  useLogMongoDB: process?.env?.LOGGER_USE_MONGO_DB || '',
  useLogMongDBName: process?.env?.LOGGER_USE_MONGO_DB_NAME || 'logger',
  collectionPrefix: process?.env?.LOGGER_COLLECTION_PREFIX || '',
};

export default config;
