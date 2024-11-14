import { useTrans } from '@react-libs/hooks';

export const RowDetailNumber = ({
  label,
  content,
  suffix,
  grid,
}: {
  label: string;
  content: number;
  suffix?: string;
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
      <div className={contentWith + ' d-flex'}>
        <div className="mr-2">{content}</div>
        {suffix && <div>{suffix}</div>}
      </div>
    </div>
  );
};
