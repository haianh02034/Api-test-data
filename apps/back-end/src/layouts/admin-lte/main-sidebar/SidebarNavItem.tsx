import { useAppSelector } from '@back-end/hooks';
import { selectSection } from '@back-end/store/header';
import { ISidebarNav } from '@back-end/types';
import { MouseEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarNavItem = ({ nav, sessions }: { nav: ISidebarNav; sessions?: (string | undefined)[] }) => {
  const session = useAppSelector(selectSection);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { title, visible, link } = nav;

  const navSessions = useMemo(() => {
    return [...(sessions || []), nav?.session].filter((s) => !!s?.length).join('.');
  }, [nav?.session, sessions]);

  const isActive = useMemo(() => {
    return session.indexOf(navSessions) === 0;
  }, [navSessions, session]);

  const childrenCount = useMemo(() => {
    const countChilds = (nav: ISidebarNav): number => {
      if (!nav?.children?.length) {
        return 0;
      }
      return nav?.children
        ?.filter(({ visible }) => visible !== false)
        .reduce((total, _nav) => total + 1 + countChilds(_nav), 0);
    };

    return countChilds(nav);
  }, [nav]);

  useEffect(() => {
    setIsMenuOpen(childrenCount > 0 && isActive);
  }, [childrenCount, isActive]);

  const handleToggleCollapse = (e: MouseEvent) => {
    setIsMenuOpen(childrenCount > 0 && !isMenuOpen);
  };

  if (visible === false) {
    return <></>;
  }

  return (
    <li className={`nav-item${isMenuOpen ? ' menu-open' : ''}`} data-session={navSessions}>
      {link === undefined || childrenCount ? (
        <div
          className={`nav-link cursor-pointer${nav?.isHeader ? ' nav-header' : ''}${isActive ? ' active' : ''}`}
          onClick={handleToggleCollapse}
        >
          {nav?.icon?.length ? <i className={`nav-icon ${nav.icon}`}></i> : null}

          <p>
            {title}
            {childrenCount ? <i className="right fas fa-angle-left"></i> : null}
          </p>
        </div>
      ) : (
        <Link to={link} className={`nav-link${isActive ? ' active' : ''}`}>
          {nav?.icon?.length ? <i className={`nav-icon ${nav.icon}`}></i> : null}
          <p>{title}</p>
        </Link>
      )}

      {childrenCount ? (
        <ul className={`nav nav-treeview childs--${childrenCount}`}>
          {nav?.children?.map((_nav, i) => (
            <SidebarNavItem nav={_nav} sessions={[...(sessions || []), nav?.session]} key={i} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export default SidebarNavItem;
