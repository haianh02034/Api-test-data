import { config } from '@back-end/configs';
import { objFilters } from '@utils';

export const apiUrl = (action?: string, params?: Record<string, any>): string => {
  const baseUrl = (config?.apiUrl || window.location.origin).replace(/[\\/\\]*$/, '');
  const strAcction = action?.length ? action.replace(/^[\\/\\]*/, '') : '';
  const queryParams = params ? `?${new URLSearchParams(objFilters(params))}` : '';

  return `${baseUrl}/${strAcction}${queryParams}`;
};
export const apiManagerUrl = (action?: string, params?: Record<string, any>): string => {
  const baseUrl = (config?.apiManagerUrl || window.location.origin).replace(/[\\/\\]*$/, '');
  const strAcction = action?.length ? action.replace(/^[\\/\\]*/, '') : '';
  const queryParams = params ? `?${new URLSearchParams(objFilters(params))}` : '';

  return `${baseUrl}/${strAcction}${queryParams}`;
};
