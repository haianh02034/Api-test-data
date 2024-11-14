import { useTrans } from '@react-libs/hooks';

export const Error = ({ error }: { error: string | React.ReactElement }) => {
  const trans = useTrans();

  return <div className="callout callout-danger text-danger p-2">{trans(error)}</div>;
};
