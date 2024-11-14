export class PaginatorDto<T> {
  [x: string]: any;
  page: number;
  perPage: number;
  total: number;
  resultCount: number;
  items: T[];
}
