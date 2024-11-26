import { Expose } from 'class-transformer';

export class FormDataDto {
  @Expose()
  _id: string;

  @Expose()
  form_id: string;
  
  @Expose()
  meta_id: string;

  @Expose()
  data: Record<string, any>;

  @Expose()
  createdDate:Date;

  @Expose()
  updatedDate:Date;
}
