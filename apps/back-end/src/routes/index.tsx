import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LazyLoad } from '@react-libs/utils';
import RegisteredRoute from './RegisteredRoute';
import { FormDatasPage } from '@back-end/features/formData/page';
import FormDatasRoute from './FormDataRoute';

const RouteComponent = () => {
  const Layout = LazyLoad(() => import('@back-end/layouts'));
  const LoginPage = LazyLoad(() => import('@back-end/features/auth/login'));
  const UnregisterRoute = LazyLoad(() => import('./UnregisterRoute'));
  const LogoutPage = LazyLoad(() => import('@back-end/features/auth/logout'));
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="*" element={<LoginPage />} />
          <Route element={<RegisteredRoute />}>


          <Route path="logout" element={<LogoutPage />} />


          <Route index path="*" element={<FormDatasPage />} />
          <Route path="form_data/*" element={<FormDatasRoute />} />
          </Route>

          <Route element={<UnregisterRoute />}>
            {/* <Route path="register" element={<RegisterPage />} /> */}
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RouteComponent;
