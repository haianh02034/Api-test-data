import { PER_PAGE } from '@utils';
import { Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginateDto {
  @Expose()
  @Transform(({ value }) => Math.max(1, +(value || 1)))
  @IsInt()
  page?: number;

  @Expose()
  @Transform(({ value }) => Math.max(1, +(value || PER_PAGE)))
  @IsInt()
  perPage?: number;
}
