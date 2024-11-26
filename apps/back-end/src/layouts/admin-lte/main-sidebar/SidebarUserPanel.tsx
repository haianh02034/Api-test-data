import { Avatar } from '@back-end/components/Common';
import { useAppSelector } from '@back-end/hooks';
import { selectVisitor } from '@back-end/store/auth';

const SidebarUserPanel = () => {
  const visitor = useAppSelector(selectVisitor);
  if (!visitor?.id) {
    return <></>;
  }

  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <Avatar name={visitor?.name || visitor?.email} size="36" />
      </div>
      <div className="info d-block text-white">{visitor?.name || visitor?.email}</div>
    </div>
  );
};

export default SidebarUserPanel;
