import { useAppSelector, useTrans } from '@back-end/hooks';
import { selectBreadcrumbs } from '@back-end/store/header';
import { Link } from 'react-router-dom';
import BreadcrumbItem from './BreadcrumbItem';

const Breadcrumb = () => {
  const trans = useTrans();
  const breadcrumbs = useAppSelector(selectBreadcrumbs);

  return (
    <ol className="breadcrumb float-sm-right text-truncate">
      {breadcrumbs?.length ? (
        breadcrumbs.map((breadcrumb, i) => <BreadcrumbItem breadcrumb={breadcrumb} key={i} />)
      ) : (
        <li className="breadcrumb-item">
          <i className="fa fa-home mr-1"></i>
          <Link to="/">{trans('home')}</Link>
        </li>
      )}
    </ol>
  );
};

export default Breadcrumb;
