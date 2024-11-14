import { Module } from '@nestjs/common';
import { FormMetaDataController } from './formMetaData.controller';

@Module({
  controllers: [FormMetaDataController],
})
export class FormMetaDatasModule {}
