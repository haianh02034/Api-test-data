import { TransformBool } from '@nest-utils';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class Create {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  eventType: string;

  @IsNotEmpty()
  data:Object;

  @IsNotEmpty()
  commandId:string;
  
  @IsNotEmpty()
  source:string;

  @IsNotEmpty()
  createAtts: string;



}
