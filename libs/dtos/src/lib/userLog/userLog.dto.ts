import { Expose,Transform } from 'class-transformer';
export class UserLog {
  @Expose()
  _id: string;

  @Expose()
  user: string;

  @Expose()
  eventType: string;

  @Expose()
  data: Object;

  @Expose()
  source:string;

  @Expose()
  createdAt: Date;
}
