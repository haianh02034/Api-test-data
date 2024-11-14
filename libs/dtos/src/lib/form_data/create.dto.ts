import { Expose, Transform } from 'class-transformer';
import { IsString, IsObject } from 'class-validator';
import { ObjectId } from 'mongodb';

export class Create {
  @Transform(({ value }) => new ObjectId(value.$oid))  // Convert the string to an ObjectId
  _id: ObjectId;

  @IsString()
  form_id: string;

  @IsString()
  meta_id: string;

  @IsObject()
  data: { [key: string]: any };
}
