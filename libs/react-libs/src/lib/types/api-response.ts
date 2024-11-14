
import {  PaginatorDto } from '@dtos';
import { IPagination } from './pagination';

export type IApiResponse<T = unknown> = T & {
  data?: T;
  error?: string;
  errors?: Record<string, string>;
};

export interface IApiResponseData<T = unknown> extends IPagination {
  error?: string;
  errors?: Record<string, string>;
  title?: string;
  Message?: string;
  IsSuccess?: boolean;
  LicenseCode?: string;
  Data?: T[];
}

