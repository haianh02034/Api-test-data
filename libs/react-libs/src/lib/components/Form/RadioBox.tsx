import { useFormContext } from 'react-hook-form';
import { IFormInputProps } from '@react-libs/types';
import { useTrans } from '@react-libs/hooks';
import { phraseByName } from '@react-libs/utils';

const RadioBox = ({ name: _name, label, rules, value, ...props }: IFormInputProps) => {
  const trans = useTrans();
  const { register } = useFormContext();

  const name = _name || '';
  const _label = label ? label : trans(phraseByName(name));

  return (
    <div className="custom-control custom-radio">
      <input
        type="radio"
        className="custom-control-input"
        id={`ctrl-${name}-${value}`}
        value={value}
        {...register(name, rules)}
        {...props}
      />
      <label className="custom-control-label" htmlFor={`ctrl-${name}-${value}`}>
        {_label}
      </label>
    </div>
  );
};

export default RadioBox;
