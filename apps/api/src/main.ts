/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ApiExceptionFilter } from '@nest-utils';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';

import { AppModule } from './app/app.module';
import { AppConfig } from './app/app.config';
// import { AppAdapter } from './app/app.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useWebSocketAdapter(new AppAdapter(app));
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors.reduce((errors, error) => {
          return {
            ...errors,
            [error.property]: Object.values(error.constraints).join('\n'),
          };
        }, {});
        return new BadRequestException({ errors });
      },
    })
  );

  app.useGlobalFilters(new ApiExceptionFilter());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = AppConfig.port;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
