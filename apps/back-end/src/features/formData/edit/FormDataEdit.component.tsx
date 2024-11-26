import { FormDataDtos } from '@dtos';
import { useTrans } from '@react-libs/hooks';
import Form from '@react-libs/components/Form';
import { useFormContext } from 'react-hook-form';
import { useFormDataEditData } from '../hook';

const FormDataEditComponent = ({ form_data, methods }: { form_data: FormDataDtos.FormDataDto; methods: any }) => {
  const { setValue } = methods;  // Lấy phương thức 'setValue' từ 'methods'
  const { handleSubmit } = useFormContext();  // Để sử dụng hook 'useFormContext'
  const trans = useTrans();
  const { EditError, isSuccess, onSubmit } = useFormDataEditData(form_data.form_id);
  const { register } = methods;

  const handleDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      // Khi người dùng thay đổi trường "data", chuyển đổi chuỗi JSON nhập vào thành đối tượng
      const parsedData = JSON.parse(e.target.value);
      setValue("data", parsedData);  // Cập nhật giá trị trường "data"
    } catch (error) {
      setValue("data", e.target.value);  // Nếu không phải JSON hợp lệ, chỉ giữ lại chuỗi
    }
  };

  return (
    <form method="PUT" onSubmit={onSubmit}>
      {!!EditError?.length && <div className="callout callout-danger text-danger p-2 small">{EditError}</div>}

      <fieldset className="border p-2 mt-3 mb-4">
        <legend className="w-auto">{trans('form_data')}</legend>

        {/* Form ID */}
        <Form.Row name="form_id" isRequired>
          <Form.InputGroup
            name="form_id"
            prepend={<i className="fas fa-id-badge"></i>} // Icon phù hợp với form_id
          >
            <Form.InputBox
              {...register("form_id")} 
              type="text" 
              isRequired 
              placeholder={trans('Enter Form ID')} 
            />
          </Form.InputGroup>
        </Form.Row>

        {/* Meta ID */}
        <Form.Row name="meta_id" isRequired>
          <Form.InputGroup
            name="meta_id"
            prepend={<i className="fas fa-info-circle"></i>} 
          >
            <Form.InputBox 
              {...register("meta_id")}
              type="text" 
              isRequired 
              placeholder={trans('Enter Meta ID')} 
            />
          </Form.InputGroup>
        </Form.Row>

        {/* Data (Text Area) */}
        <Form.Row name="data">
          <Form.InputGroup
            name="data"
            prepend={<i className="fas fa-database"></i>}
          >
            <Form.TextAreaBox
              name="data"
              isRequired={false}
              placeholder="Enter Data as JSON"
              rows={5}
              value={JSON.stringify(form_data.data, null, 2)}  // Chuyển dữ liệu thành chuỗi JSON có định dạng khi hiển thị
              onChange={handleDataChange}  // Cập nhật giá trị khi người dùng thay đổi
            />
          </Form.InputGroup>
        </Form.Row>

      </fieldset>

      {/* Submit Button */}
      <div className="text-right">
        <Form.Button
          isSubmitting={isSuccess}
          label={trans('save')}
          className="btn btn-danger mt-2 mb-3"
          icon={<i className="fas fa-check-square mr-2"></i>}
        />
      </div>
    </form>
  );
};

export default FormDataEditComponent;
