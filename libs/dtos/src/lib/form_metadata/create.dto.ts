import { Expose, Transform } from 'class-transformer';
import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Field {
  @IsString()
  name_field: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsArray()
  provider?: { name: string; value: number }[];
}

export class Create {


  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Field)
  fields: Field[];
}
