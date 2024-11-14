import { useFormContext } from 'react-hook-form';
import { IFormInputProps } from '@react-libs/types';
import { useTrans } from '@react-libs/hooks';
import { phraseByName } from '@react-libs/utils';
import { strRand } from '@utils';

const SwitchBox = ({ name: _name, label, rules, children, ...props }: IFormInputProps) => {
  const trans = useTrans();
  const { register } = useFormContext();

  const name = _name || '';
  const _label = label ? label : trans(phraseByName(name));
  const id = `ctrl-${name}--${strRand(6)}`;

  return (
    <div className="row form-group">
      <label className="col-md-4 text-md-right"></label>
      <div className="col-md-8 input-group custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" id={id} {...register(name, rules)} {...props} />
        <label className="custom-control-label" htmlFor={id}>
          {_label}
        </label>
      </div>

      {children}
    </div>
  );
};

export default SwitchBox;
