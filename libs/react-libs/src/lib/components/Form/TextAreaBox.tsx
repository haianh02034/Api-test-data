import { useFormContext } from 'react-hook-form';
import { IFormTextAreaProps } from '@react-libs/types';
import { getError, phraseByName } from '@react-libs/utils';
import { useTrans } from '@react-libs/hooks';

const TextAreaBox = ({ name: _name, label, isRequired, rules, className, ...props }: IFormTextAreaProps) => {
  const trans = useTrans();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const name = _name || '';

  const error = getError(errors, name);
  const _label = label ? label : trans(phraseByName(name));

  return (
    <textarea
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
    />
  );
};

export default TextAreaBox;
