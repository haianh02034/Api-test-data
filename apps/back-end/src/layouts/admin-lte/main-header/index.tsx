import { useAppDispatch, useAppSelector } from '@back-end/hooks';
import { headerActions, selectToggleSidebar } from '@back-end/store/header';
import { MouseEvent } from 'react';

const MainHeader = () => {
  const isToggle = useAppSelector(selectToggleSidebar);
  const dispatch = useAppDispatch();

  const sidebarToggle = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(headerActions.update({ isToggleSidebar: !isToggle }));
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-dark navbar-cyan border-bottom-0">
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav-link sidebar-toggle" role="button" onClick={sidebarToggle} aria-label="Toggle">
            <i className="fas fa-bars"></i>
          </div>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto"></ul>
    </nav>
  );
};

export default MainHeader;
