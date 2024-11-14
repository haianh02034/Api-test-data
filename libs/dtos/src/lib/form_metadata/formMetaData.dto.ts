import { Expose } from 'class-transformer';

export class FieldDto {
  @Expose()
  name_field: string;

  @Expose()
  type: string;

  @Expose()
  provider?: Array<{ name: string; value: number }>; // Only for 'list' type fields
}

export class FormMetadataDto {
  @Expose()
  _id: string;

  @Expose()
  name: string;

  @Expose()
  fields: FieldDto[];
}
