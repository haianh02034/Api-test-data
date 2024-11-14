import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('form_data')  // Tên bảng trong MongoDB
export class FormData {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn()
  form_id: ObjectId;

  @Column()
  meta_id: string;

  @Column('json')  // Sử dụng 'json' để lưu trữ các đối tượng có cấu trúc động
  data: Record<string, any>;
}
