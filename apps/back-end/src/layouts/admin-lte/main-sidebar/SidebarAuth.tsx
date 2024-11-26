import { useAppSelector, useTrans } from '@back-end/hooks';
import { selectVisitorId } from '@back-end/store/auth';
import { ISidebarNav } from '@back-end/types';
import { Link } from 'react-router-dom';
import SidebarNavItem from './SidebarNavItem';

const SidebarAuth = () => {
  const trans = useTrans();
  const visitorId = useAppSelector(selectVisitorId);

  if (!visitorId) {
    const navList: ISidebarNav[] = [
      {
        title: trans('login'),
        link: '/login',
        session: 'login',
        icon: 'fas fa-sign-in-alt',
      },
    ];

    return (
      <>
        {navList.map((nav, i) => (
          <SidebarNavItem nav={nav} key={i} />
        ))}
      </>
    );
  }

  return (
    <li className="nav-item">
      <Link to="/logout" className="nav-link">
        <i className="fas fa-sign-out-alt mr-2 text-danger"></i>
        {trans('sign_out')}!
      </Link>
    </li>
  );
};

export default SidebarAuth;
