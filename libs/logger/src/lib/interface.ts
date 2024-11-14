export interface LoggerModuleOptions {
  useLogConsole?: boolean;
  useLogFile?: boolean;
  useLogMongoDB?: string;
  useLogMongDBName?: string;
  collectionPrefix?: string;
}
