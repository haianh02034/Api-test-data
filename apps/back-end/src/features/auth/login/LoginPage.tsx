import { useHeader, useTrans } from '@back-end/hooks';
import { LoginForm } from '.';

export const LoginPage = () => {
  const trans = useTrans();

  useHeader({
    pageTitle: trans('login'),
    section: 'login',
    breadcrumbs: [
      {
        title: trans('login'),
        active: true,
      },
    ],
  });

  return <LoginForm />;
};
