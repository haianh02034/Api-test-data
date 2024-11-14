import { useTrans } from '@react-libs/hooks';

export const RowDetailCustom = ({
  label,
  children,
  grid,
}: {
  label: string;
  children: any;
  grid?: '4-8' | '5-5' | '2-10';
}) => {
  const trans = useTrans();

  let labelWith = 'col-2';
  let contentWith = 'col-10';

  if (grid === '4-8') {
    labelWith = 'col-4';
    contentWith = 'col-8';
  }

  if (grid === '5-5') {
    labelWith = 'col-5';
    contentWith = 'col-5';
  }

  return (
    <div className="row mb-3">
      <div className={`${labelWith} text-md-right font-weight-bold`}>{trans(`${label}`)}:</div>
      <div className={contentWith}>{children}</div>
    </div>
  );
};
