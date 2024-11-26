import { IsOptional, IsString, IsObject, IsNumber } from 'class-validator';

export class Edit {
  @IsOptional()
  @IsNumber()
  form_id?: number;

  @IsOptional()
  @IsString()
  meta_id?: string;

  @IsOptional()
  @IsObject()
  data?: { [key: string]: any };
}
