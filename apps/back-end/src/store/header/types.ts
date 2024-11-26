export interface IHeaderState {
  pageTitle?: string;
  section?: string;
  breadcrumbs?: IBreadcrumb[];
  isToggleSidebar?: boolean;
  quickActions?: React.ReactNode;
}

export interface IBreadcrumb {
  title: string;
  link?: string;
  active?: boolean;
  icon?: string;
}
