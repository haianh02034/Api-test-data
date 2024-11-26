import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@back-end/hooks';
import { selectVisitorId } from '@back-end/store/auth';
import { LoginPage} from '@back-end/features/auth/login'
const UnregisterRoute = () => {
  const visitorId = useAppSelector(selectVisitorId);
  // return !visitorId ? <Outlet /> : <Navigate to="/" />;
  return !visitorId ? <Outlet /> : <LoginPage/>;

};
export default UnregisterRoute;
