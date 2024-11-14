import { IFormButtonProps } from '@react-libs/types';
import { useTrans } from '@react-libs/hooks';

const Button = ({ label, isSubmitting, icon, ...props }: IFormButtonProps) => {
  const trans = useTrans();

  const _label = label ? label : trans('submit');

  return (
    <button type="submit" className="btn btn-primary" {...props}>
      {(!!isSubmitting && <i className="fa fa-circle-o-notch fa-spin mr-2"></i>) ||
        (icon === undefined && <i className="fa fa-floppy-o mr-2"></i>) ||
        icon}
      {_label}
    </button>
  );
};

export default Button;
