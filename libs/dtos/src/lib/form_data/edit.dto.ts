import { IsOptional, IsString, IsObject } from 'class-validator';

export class Edit {
  @IsOptional()
  @IsString()
  form_id?: string;

  @IsOptional()
  @IsString()
  meta_id?: string;

  @IsOptional()
  @IsObject()
  data?: { [key: string]: any };
}
