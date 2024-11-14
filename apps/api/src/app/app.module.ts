import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { LoggerModule } from '@logger';
import { GuardsModule } from '@guards';
import { RepositoriesModule } from '@repositories';
import { FormDatasModule } from './formData/formData.module';
import { FormMetaDatasModule } from './formMetaData/formMetaData.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    RepositoriesModule.forRoot(),
    LoggerModule.forRoot(),
    GuardsModule,
    AuthModule,
    FormDatasModule,
    FormMetaDatasModule
  ],
})
export class AppModule {}
