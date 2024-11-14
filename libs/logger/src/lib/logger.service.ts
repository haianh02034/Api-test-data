import { Inject, Injectable, Logger, LogLevel } from '@nestjs/common';
import * as path from 'path';
import { basename } from 'path';
import * as winston from 'winston';
import 'winston-mongodb';
import 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';

import { enumerateErrorFormat } from './utils';
import { LoggerModuleOptions } from './interface';

@Injectable()
export class LoggerService extends Logger {
  @Inject('OPTIONS')
  private readonly loggerOptions: LoggerModuleOptions;

  private caches = [];
  private transportCaches = {};

  private winstonConvertLevel = {
    log: 'info',
  };

  log(...props) {
    this.writeLog('log', props);
  }
  error(...props) {
    this.writeLog('error', props);
  }
  warn(...props) {
    this.writeLog('warn', props);
  }
  debug(...props) {
    this.writeLog('debug', props);
  }
  verbose(...props) {
    this.writeLog('verbose', props);
  }

  setContext(context: string) {
    this.context = context;
    return this;
  }

  private writeLog<T>(type: LogLevel, props: T) {
    const options = this.loggerOptions;
    if (options?.useLogConsole && typeof super[type] !== 'undefined') {
      super[type].apply(this, props);
    }

    const winstonType = this.getWinstonType(type);
    const winstonLogger = this.getWinstonLogger(winstonType);
    if (winstonLogger && typeof winstonLogger[winstonType] !== 'undefined') {
      winstonLogger[winstonType].apply(null, props);
    }
  }

  private getWinstonType(type: LogLevel): string {
    if (typeof this.winstonConvertLevel[type] != 'undefined') {
      return this.winstonConvertLevel[type];
    }
    return type;
  }

  private getWinstonLogger(type: string): winston.Logger {
    if (typeof this.caches[type] === 'undefined') {
      const transports = this.getTransports(type);
      if (!transports?.length) {
        return;
      }
      this.caches[type] = winston.createLogger({
        format: winston.format.combine(
          enumerateErrorFormat(),
          winston.format.metadata(),
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: this.getTransports(type),
      });
    }
    return this.caches[type];
  }

  private getTransports(type: string): Transport[] {
    if (typeof this.transportCaches[type] === 'undefined') {
      const options = this.loggerOptions;
      const transports = [];

      if (options?.useLogFile) {
        const loggerPath = ['logs', basename(__dirname), this.context, type].filter((path) => path?.length).join('/');

        transports.push(
          new winston.transports.DailyRotateFile({
            level: type,
            filename: `%DATE%.${type}.log`,
            dirname: path.resolve(process.cwd(), loggerPath),
            datePattern: 'YYYY-MM-DD',
          })
        );
      }

      if (options?.useLogMongoDB?.length) {
        transports.push(
          new winston.transports.MongoDB({
            level: type,
            db: options.useLogMongoDB,
            dbName: options.useLogMongDBName,
            collection: [options?.collectionPrefix, basename(__dirname), this.context]
              .filter((val) => val?.length)
              .join('.'),
            options: {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            },
          })
        );
      }
      this.transportCaches[type] = transports;
    }
    return this.transportCaches[type];
  }
}
