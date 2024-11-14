import { useFormContext } from 'react-hook-form';
import { IFormSelectProps } from '@react-libs/types';
import { getError, phraseByName } from '@react-libs/utils';
import { useTrans } from '@react-libs/hooks';

const SelectBox = ({ name: _name, label, isRequired, rules, options, className, ...props }: IFormSelectProps) => {
  const trans = useTrans();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const name = _name || '';
  const error = getError(errors, name);
  const _label = label ? label : trans(phraseByName(name));

  return (
    <select
      id={`ctrl-${name}`}
      className={`${className || 'form-control'}${error ? ' is-invalid' : ' '}`}
      placeholder={_label}
      {...register(name, {
        required: isRequired
          ? `${trans('form.x_is_required', {
              field: _label,
            })}`
          : undefined,
        ...rules,
      })}
      {...props}
    >
      {props?.children ||
        options?.map(({ value, label }) => (
          <option key={`${name}-option--${value}`} value={value}>
            {label}
          </option>
        ))}
    </select>
  );
};

export default SelectBox;
