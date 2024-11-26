import { useMemo } from 'react';

import MainHeader from './main-header';
import MainSidebar from './main-sidebar';
import ContentWrapper from './content-wrapper';
import MainFooter from './main-footer';
import Tools from './tools';

import { useAppSelector, useWindowWidth } from '@back-end/hooks';
import { selectToggleSidebar } from '@back-end/store/header';

import '@back-end/styles/app.scss';

const AdminLTE = () => {
  const windowWidth = useWindowWidth();
  const isToggle = useAppSelector(selectToggleSidebar);

  const sidebarClass = useMemo(() => {
    if (isToggle) {
      return windowWidth > 992 ? ' sidebar-collapse' : ' sidebar-open';
    }
    return windowWidth > 992 ? '' : ' sidebar-closed sidebar-collapse';
  }, [windowWidth, isToggle]);

  return (
    <div className={`sidebar-mini${sidebarClass} layout-fixed${windowWidth < 768 ? ' layout-footer-fixed' : ''}`}>
      <div className="wrapper">
        <MainHeader />
        <MainSidebar />
        <ContentWrapper />
        <MainFooter />
        <Tools />
      </div>
    </div>
  );
};

export default AdminLTE;
