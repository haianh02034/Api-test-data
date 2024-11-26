import { FormDataDtos } from '@dtos';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useTrans } from '@react-libs/hooks';
import { useNavigate } from 'react-router-dom';
import { FormDataEditModal } from '../edit';
import { useFormDataDelete } from '@back-end/utils';

const FormDataActionsDropDown = ({ formData }: { formData: FormDataDtos.FormDataDto}) => {
  const trans = useTrans();
  const { onDelete, deleteError, isSuccess } = useFormDataDelete();

  const handleDelete = async () => {
    await onDelete(formData.form_id);
    if (isSuccess) {
      window.location.reload();
    }
  };

  return (
    <DropdownButton title={<i className="fa fa-cog mr-2"></i>} size="sm">
      <FormDataEditModal form_data={formData} />

      <Dropdown.Item onClick={handleDelete} className="bg-danger btn btn-sm">
        <i className="fas fa-trash-alt mr-2" />
        {trans('Delete')}
      </Dropdown.Item>    
        
    </DropdownButton>
    

  );
};

export default FormDataActionsDropDown;
