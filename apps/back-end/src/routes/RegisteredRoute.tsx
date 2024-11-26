import { useAppDispatch, useAppSelector } from '@back-end/hooks';
import { authActions, selectAccessToken, selectVisitorId } from '@back-end/store/auth';
import { Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import { LoginPage } from '@back-end/features/auth/login';

const RegisteredRoute = () => {
  const visitorId = useAppSelector(selectVisitorId);
  const accessToken = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken?.length) {
      return;
    }

    const tokenDecode = jwt_decode<{ exp?: number }>(accessToken);
    const now = Date.now();
    const timeWaiter = Math.max(0, ((tokenDecode?.exp || 0) - 30) * 1000 - now);
    const timeOut = setTimeout(() => dispatch(authActions.refreshToken()), timeWaiter);

    return () => {
      clearTimeout(timeOut);
    };
  }, [accessToken, dispatch]);

  return visitorId ? <Outlet /> : <LoginPage />;
};
export default RegisteredRoute;
