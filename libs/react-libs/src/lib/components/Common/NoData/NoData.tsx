import { useTrans } from '@react-libs/hooks';

export const NoData = ({ content }: { content?: string | React.ReactElement }) => {
  const trans = useTrans();

  return <p className="text-center">{content ? content : trans('no_data_to_display')}</p>;
};
