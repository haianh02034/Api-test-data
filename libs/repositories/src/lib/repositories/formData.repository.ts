import { FormDataRepoInterface } from '@repositories';
import { FormData } from '@entity';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BasicMongoRepository } from './basic.mongo.repository';

@Injectable()
export class FormDataRepository extends BasicMongoRepository<FormData> implements FormDataRepoInterface {
  constructor(dataSource: DataSource) {
    super(FormData, dataSource.createEntityManager());
  }

  // Các phương thức có thể tùy chỉnh để truy vấn dữ liệu từ MongoDB
  async findAll(filters: any): Promise<FormData[]> {
    return this.manager.find(FormData, { where: filters });
  }
}
