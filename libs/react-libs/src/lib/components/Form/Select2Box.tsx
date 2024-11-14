import { Controller, useFormContext } from 'react-hook-form';
import { IFormSelect2Props } from '@react-libs/types';
import { getError, phraseByName } from '@react-libs/utils';
import { useTrans } from '@react-libs/hooks';
import ReactSelect from 'react-select';

const Select2Box = ({ name: _name, label, isRequired, rules, options, className, ...props }: IFormSelect2Props) => {
  const trans = useTrans();
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const name = _name || '';
  const error = getError(errors, name);
  const _label = label ? label : trans(phraseByName(name));

  const { isMulti } = props;

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
      defaultValue={null}
      render={({ field: { onChange, onBlur, value, ref } }) => {
        const defaultValue = isMulti
          ? value?.map((_val: string | number) => options.find(({ value }) => value == _val))
          : options.find((option) => option.value == value);

        return (
          <ReactSelect
            inputId={`ctrl-${name}`}
            className={`${className || 'select-2-control'}${error ? ' is-invalid' : ' '}`}
            classNamePrefix="select-2"
            placeholder={_label}
            options={options}
            isClearable={true}
            isSearchable={true}
            onChange={(vals: any) => {
              if (isMulti) {
                onChange(vals?.map((val: any) => val?.value) || []);
              } else {
                onChange(vals?.value || null);
              }
            }}
            ref={ref}
            value={defaultValue}
            {...props}
          />
        );
      }}
    />
  );
};

export default Select2Box;
