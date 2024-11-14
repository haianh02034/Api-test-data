import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FieldEdit {
  @IsOptional()
  @IsString()
  name_field?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsArray()
  provider?: { name: string; value: number }[];
}

export class Edit {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldEdit)
  fields?: FieldEdit[];
}
