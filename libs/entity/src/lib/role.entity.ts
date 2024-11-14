import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('role')
export class Role {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ length: 100 })
  name: string; 

  @Column('json') 
  permissions: Object;

}