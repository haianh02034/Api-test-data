import { useFormContext } from 'react-hook-form';
import { IFormInputGroupProps } from '@react-libs/types';
import { getError } from '@react-libs/utils';

const InputGroup = ({ name: _name, prepend, children, append, divAttrs }: IFormInputGroupProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const name = _name || '';
  const error = getError(errors, name);

  return (
    <div className="input-group" {...divAttrs}>
      {prepend ? (
        <div className="input-group-prepend">
          <span className="input-group-text">{prepend}</span>
        </div>
      ) : null}
      {children}
      {append ? (
        <div className="input-group-append">
          <span className="input-group-text">{append}</span>
        </div>
      ) : null}
      <div className="invalid-feedback">{error?.message}</div>
    </div>
  );
};

export default InputGroup;
