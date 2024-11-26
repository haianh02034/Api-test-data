import { Expose, Transform } from 'class-transformer';
import { IsString, IsObject, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';

export class Create {
  @Transform(({ value }) => new ObjectId(value.$oid))  // Convert the string to an ObjectId
  _id: ObjectId;

  @IsNumber()
  form_id: number;

  @IsString()
  meta_id: string;

  @IsObject()
  data: { [key: string]: any };
}
