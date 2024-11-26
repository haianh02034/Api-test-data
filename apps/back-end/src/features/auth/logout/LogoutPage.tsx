import { useAppDispatch, useReloadPage } from '@back-end/hooks';
import { authActions } from '@back-end/store/auth';
import { useEffect } from 'react';

export const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const reloadPage = useReloadPage();

  useEffect(() => {
    dispatch(authActions.logout());
    reloadPage('/');
  }, [dispatch, reloadPage]);

  return <></>;
};
