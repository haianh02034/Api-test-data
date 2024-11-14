import { useLocation, useNavigate } from 'react-router-dom';
import { useFilters } from './useFilters';

export const useReloadPage = () => {
  const history = useNavigate();
  const { filters } = useFilters();
  const { pathname } = useLocation();

  const reloadPage = (path?: string) => {
    if (path?.length && path !== pathname) {
      history(path);
      return;
    }

    history('/empty');
    if (!Object.keys(filters)?.length) {
      setTimeout(() => history(pathname, { replace: true }), 0);
      return;
    }

    const searchParams = new URLSearchParams(filters);
    setTimeout(() => history(pathname + '?' + searchParams, { replace: true }), 0);
  };

  return reloadPage;
};
