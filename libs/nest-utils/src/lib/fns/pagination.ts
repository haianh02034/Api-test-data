import { PaginatorDto } from '@dtos';
import { PER_PAGE } from '@utils';

export const pagination = <T>(items: T[], total: number, page: number, perPage = PER_PAGE): PaginatorDto<T> => {
  return {
    page: Math.max(1, +page),
    perPage,
    total,
    resultCount: items?.length || 0,
    items,
  };
};
