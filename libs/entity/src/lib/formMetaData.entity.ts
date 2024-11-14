import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('form_metadata')
export class FormMetadata {
  @ObjectIdColumn()  // MongoDB ObjectId column
  _id: ObjectId;

  @Column()
  name: string;

  @Column('json')  // This allows fields to store arrays/objects as JSON
  fields: Array<{
    name_field: string;
    type: string;
    provider?: Array<{ name: string, value: any }>;
  }>;
}
