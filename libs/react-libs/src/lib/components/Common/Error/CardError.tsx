import { useTrans } from '@react-libs/hooks';
import { Error } from './Error';

export const CardError = ({
  cardClass = 'card-danger',
  title,
  error,
}: {
  cardClass?: string;
  title?: string | React.ReactElement;
  error: string | React.ReactElement;
}) => {
  const trans = useTrans();

  return (
    <div className={`card ${cardClass}`}>
      <div className="card-header">
        <h3 className="card-title text-capitalize text-truncate">{title || trans('error')}</h3>
      </div>

      <div className="card-body">
        <Error error={error} />
      </div>
    </div>
  );
};
