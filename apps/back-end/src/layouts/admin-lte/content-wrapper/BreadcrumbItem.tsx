import { IBreadcrumb } from '@back-end/store/header/types';
import { Link } from 'react-router-dom';

const BreadcrumbItem = ({ breadcrumb }: { breadcrumb: IBreadcrumb }) => {
  return (
    <li className={`breadcrumb-item${breadcrumb?.active ? ' active' : ''}`}>
      {breadcrumb?.icon?.length ? <i className={`fa ${breadcrumb?.icon} mr-1`}></i> : null}

      {breadcrumb?.link ? <Link to={breadcrumb.link}>{breadcrumb.title}</Link> : breadcrumb.title}
    </li>
  );
};

export default BreadcrumbItem;
