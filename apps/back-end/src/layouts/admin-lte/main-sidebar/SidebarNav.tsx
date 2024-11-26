import { useAppSelector, useTrans } from '@back-end/hooks';
import { ISidebarNav } from '@back-end/types';
import SidebarNavItem from './SidebarNavItem';
import SlidbarAuth from './SidebarAuth';
import { selectVisitor } from '@back-end/store/auth/authSlice';
import { config } from '@back-end/configs';

const SidebarNav = () => {
  const trans = useTrans();
  const visitor = useAppSelector(selectVisitor);

  const navList: ISidebarNav[] = [
    {
      title: trans('Form_Datas'),
      link: '/form_data',
      session: 'formDatas',
      icon: 'fas fa-user-graduate',
      visible: config.isSupportAgent && !!visitor?.id,
    },
    // {
    //   title: trans('Data_student'),
    //   link: '/form_data_student',
    //   session: 'formDataStudents',
    //   icon: 'fas fa-user-graduate',
    //   visible: config.isSupportAgent && !!visitor?.id,
    // },
    // {
    //   title: trans('Data_teacher'),
    //   link: '/form_data_teacher',
    //   session: 'formDataTeachers',
    //   icon: 'fas fa-chalkboard-teacher',
    //   visible: config.isSupportAgent && !!visitor?.id,
    // },
  ];

  return (
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column nav-flat">
        {navList.map((nav, i) => (
          <SidebarNavItem nav={nav} key={i} />
        ))}
        <SlidbarAuth/>
      </ul>
    </nav>
  );
};

export default SidebarNav;
