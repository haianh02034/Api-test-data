import { ISelectOptions } from '.';
import { RegisterOptions } from 'react-hook-form';
import { Props as Select2Props } from 'react-select';
import { ReactDatePickerProps } from 'react-datepicker';

export type ILabelAttrs = Omit<
  React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
  'children'
>;

export type IDivAttrs = Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'children'>;

export type IButtonAttrs = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children'
>;

export interface IFormProps {
  name?: string;
  label?: string;
  isRequired?: boolean;
  rules?: RegisterOptions;
}

export interface IFormRowProps extends Omit<IFormProps, 'rules'> {
  children?: React.ReactNode;
  className?: string;
}

export interface IFormInputGroupProps {
  name?: string;
  divAttrs?: IDivAttrs;
  prepend?: React.ReactElement | string;
  append?: React.ReactElement | string;
  children?: React.ReactNode;
}

export interface IFormButtonProps extends IButtonAttrs {
  label?: React.ReactNode;
  isSubmitting?: boolean;
  icon?: React.ReactElement | string;
}

export interface IFormInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    IFormProps {}

export interface IFormTextAreaProps
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    IFormProps {}

export interface IFormSelectProps
  extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
    IFormProps {
  options?: ISelectOptions[];
}

export interface IFormSelect2Props extends Select2Props, IFormProps {
  options: ISelectOptions[];
}

export interface IFormDatepickerProps extends Omit<ReactDatePickerProps, 'onChange'>, IFormProps {
  onChange?: ReactDatePickerProps['onChange'];
}

export interface IFormRowBoxProps {
  boxType: 'input' | 'textArea' | 'select' | 'select2' | 'datepicker';
  name?: string;
  label?: string;
  isRequired?: boolean;
  rowProps?: IFormRowProps;
  inputProps?: IFormInputProps | IFormTextAreaProps | IFormSelectProps | IFormSelect2Props | IFormDatepickerProps;
}
