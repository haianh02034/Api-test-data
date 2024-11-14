import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectId, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150 })
  @Index('email', { unique: true })
  email: string;

  @Column()
  googleId: string;

  @Column()
  role: string;

  @Column()
  agent: string;

  @Column()
  commands: string;
  
  @Column()
  product_code: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ length: 100 })
  phone: string;

  @Column({ length: 100, nullable: true })
  activationToken: string;

  @Column({ nullable: true })
  activationExpiresAt: Date;
  
  @Column('json') 
  permissions: Object;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
