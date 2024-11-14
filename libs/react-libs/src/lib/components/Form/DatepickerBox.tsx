import { Controller, useFormContext } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import { IFormDatepickerProps } from '@react-libs/types';
import { getError, phraseByName } from '@react-libs/utils';
import { useTrans } from '@react-libs/hooks';

import 'react-datepicker/dist/react-datepicker.css';

const DatepickerBox = ({
  name: _name,
  label,
  isRequired,
  rules,
  className,
  wrapperClassName,
  ...props
}: IFormDatepickerProps) => {
  const trans = useTrans();
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const name = _name || '';
  const error = getError(errors, name);
  const _label = label ? label : trans(phraseByName(name));

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: isRequired
          ? `${trans('form.x_is_required', {
              field: _label,
            })}`
          : undefined,
        ...rules,
      }}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <ReactDatePicker
          className={`${className || 'form-control'}${error ? ' is-invalid' : ' '}`}
          wrapperClassName={`${wrapperClassName || 'form-control'}${error ? ' is-invalid' : ' '}`}
          selected={value ? new Date(+value * 1000) : null}
          dateFormat="dd/MM/yyyy"
        
          placeholderText={_label}
          isClearable
          onChange={(date: Date) => {
            onChange(date?.getTime() / 1000 || null);
          }}
          onBlur={onBlur}
          ref={ref}
          {...props}
        />
      )}
    />
  );
};

export default DatepickerBox;
