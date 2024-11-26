export interface ISidebarNav {
  title: string;
  session: string;
  link?: string;
  icon?: string;
  children?: ISidebarNav[];
  visible?: boolean;
  displayOrder?: number;
  isHeader?: boolean;
}
