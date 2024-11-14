import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectId, Index } from 'typeorm';

@Entity('user_logs')
export class UserLog {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  user: string;

  @Column({ length: 100 })
  eventType: string;

  @Column()
  commandId:string;

  @Column()
  data: Object;

  @Column()
  source:string;

@CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}