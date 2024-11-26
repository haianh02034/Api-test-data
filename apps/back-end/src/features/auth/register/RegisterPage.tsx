import { useHeader, useTrans } from '@back-end/hooks';
import { RegisterForm } from '.';

export const RegisterPage = () => {
  const trans = useTrans();

  useHeader({
    pageTitle: trans('register'),
    section: 'register',
    breadcrumbs: [
      {
        title: trans('register'),
        active: true,
      },
    ],
  });

  return <RegisterForm />;
};
