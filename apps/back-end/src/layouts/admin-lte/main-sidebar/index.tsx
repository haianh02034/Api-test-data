import BrandLogo from './BrandLogo';
import SidebarNav from './SidebarNav';
import SidebarUserPanel from './SidebarUserPanel';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector, useWindowWidth } from '@back-end/hooks';
import { useLocation } from 'react-router-dom';
import { headerActions, selectToggleSidebar } from '@back-end/store/header';
import '@back-end/styles/main-sidebar.scss';

const MainSidebar = () => {
  const sidebarRef = useRef<any>(null);
  const windowWidth = useWindowWidth();
  const { pathname } = useLocation();

  const isToggle = useAppSelector(selectToggleSidebar);
  const dispatch = useAppDispatch();

  const handleEvent = (e: MouseEvent) => {
    if (windowWidth >= 992 || !isToggle) {
      return;
    }
    if (!sidebarRef?.current?.contains(e?.target)) {
      dispatch(headerActions.update({ isToggleSidebar: false }));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleEvent);

    return () => {
      window.removeEventListener('mousedown', handleEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth >= 992 || !isToggle) {
      return;
    }
    dispatch(headerActions.update({ isToggleSidebar: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <aside className="main-sidebar elevation-4 sidebar-dark-info" ref={sidebarRef}>
      <BrandLogo />
      <div className="sidebar scrollbar">
        <SidebarUserPanel />
        <SidebarNav />
      </div>
    </aside>
  );
};

export default MainSidebar;
