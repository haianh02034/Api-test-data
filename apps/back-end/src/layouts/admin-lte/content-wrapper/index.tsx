import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@back-end/hooks';
import Breadcrumb from './Breadcrumb';

import { selectPageTitle, selectQuickActions } from '@back-end/store/header';
import { config } from '@back-end/configs';

import '@back-end/styles/content-wrapper/content-header.scss';

const AdminLTE = () => {
  const pageTitle = useAppSelector(selectPageTitle);
  const quickActions = useAppSelector(selectQuickActions);

  useEffect(() => {
    if (pageTitle?.length) {
      window.document.title = `${config?.siteName} | ${pageTitle}`;
    }
  }, [pageTitle]);

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-truncate">{pageTitle}</h1>
            </div>
            <div className={`col-sm-6${quickActions ? ' breadcrumb-quick-action' : ''}`}>
              <Breadcrumb />
              {quickActions}
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default AdminLTE;
