import { Module } from '@nestjs/common';
import { FormDataController } from './formData.controller';

@Module({
  controllers: [FormDataController],
})
export class FormDatasModule {}
