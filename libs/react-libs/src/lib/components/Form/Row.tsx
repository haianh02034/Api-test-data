import { IFormRowProps } from '@react-libs/types';
import { useTrans } from '@react-libs/hooks';
import { phraseByName } from '@react-libs/utils';

const Row = ({ name: _name, label, isRequired, children, className }: IFormRowProps) => {
  const trans = useTrans();

  const name = _name || '';
  const _label = label ? label : trans(phraseByName(name));

  return (
    <div className="row form-group">
      <label className={`${className || 'col-md-4 text-md-right'} col-form-label`} htmlFor={`ctrl-${name}`}>
        {!!_label?.length && `${_label} :`}
        {!!isRequired && (
          <span className="ml-1 text-danger" title={trans('required').toString()}>
            *
          </span>
        )}
      </label>
      <div className="col">{children}</div>
    </div>
  );
};

export default Row;
