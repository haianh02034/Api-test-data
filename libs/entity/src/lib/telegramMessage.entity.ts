import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity('messages')
export class TelegramMessage {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  messageId: number;

  @Column()
  chatId: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  text: string;

  @Column({ nullable: true })
  replyToMessageId?: number;

  @Column({ nullable: true })
  chatType?: string;

  @Column({ nullable: true })
  mediaUrl?: string;

  @Column({ nullable: true })
  caption?: string;

  @Column({ nullable: true })
  forwardedFromUserId?: number;

  @Column({ nullable: true })
  forwardedFromChatId?: number;

  @Column({ nullable: true })
  forwardedDate?: Date;

  @Column({ default: false })
  isBot?: boolean;

  @Column('json', { nullable: true })
  location?: {
    latitude: number;
    longitude: number;
  };

  @Column('json', { nullable: true })
  contact?: {
    phoneNumber: string;
    firstName: string;
    lastName?: string;
    userId?: number;
  };

  @Column({ default: 'pending' })
  status?: string;

  @Column({ default: false })
  hasSentBotEmail?: boolean;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ nullable: true })
  updatedBy?: string;
}
