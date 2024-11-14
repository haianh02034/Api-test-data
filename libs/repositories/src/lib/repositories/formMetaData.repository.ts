import { Injectable } from '@nestjs/common';
import { FormMetadata } from '@entity';
import { FormMetadataRepoInterface } from '@repositories';
import { DataSource, ObjectId } from 'typeorm';
import { BasicMongoRepository } from './basic.mongo.repository';
import { PaginateDto } from '@dtos'; // Nếu bạn có DTO cho pagination

@Injectable()
export class FormMetadataRepository extends BasicMongoRepository<FormMetadata> implements FormMetadataRepoInterface {
  constructor(dataSource: DataSource) {
    super(FormMetadata, dataSource.createEntityManager());
  }

  // Phương thức để tìm tất cả FormMetadata với các filter
  async findAll(filters: any): Promise<FormMetadata[]> {
    return this.manager.find(FormMetadata, { where: filters });
  }

  // Tìm một FormMetadata dựa trên ID
  async findById(id: ObjectId): Promise<FormMetadata | undefined> {
    return this.manager.findOne(FormMetadata, { where: { _id: id } });
  }
}
