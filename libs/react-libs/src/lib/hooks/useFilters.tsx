import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { objFilters } from '@utils';

export const useFilters = () => {
  const history = useNavigate();
  const { pathname, search } = useLocation();

  const filters = useMemo((): Record<string | number, any> => {
    const params: any = new URLSearchParams(search);

    const _filters = [...params.entries()].reduce(
      (acc, [key, val]) => ({ ...acc, [key]: decodeURI(val.toString()) }),
      {}
    );
    return objFilters(_filters);
  }, [search]);

  const pushFilters = (newFilters: Record<string | number, unknown>) => {
    const _filters = objFilters({ ...filters, ...newFilters });

    if (!_filters || !Object.keys(_filters)?.length) {
      history(pathname);
      return;
    }

    const searchParams = new URLSearchParams(_filters);
    history(pathname + '?' + searchParams);
  };

  return { filters, pushFilters };
};
