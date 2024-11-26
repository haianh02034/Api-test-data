import React from 'react';
import Form from '@react-libs/components/Form';
import { useTrans } from '@react-libs/hooks';
import { useFormDataAddData } from '../hook/useFormDataAddData.hook';

const FormDataAddForm = () => {
  const trans = useTrans();
  const { addError, isSubmitting, onSubmit } = useFormDataAddData();

  return (
    <form method="POST" onSubmit={onSubmit}>
      {!!addError?.length && <div className="callout callout-danger text-danger p-2 small">{addError}</div>}

      <fieldset className="border p-2 mt-3 mb-4">
        <legend className="w-auto">{trans('FormData')}</legend>

        {/* Form ID */}
        <Form.Row name="form_id" isRequired>
          <Form.InputGroup name="form_id" prepend={<i className="fas fa-id-card"></i>}>
            <Form.InputBox
              type="number"
              name="form_id"
              isRequired
              disabled={isSubmitting}
              placeholder={trans('Enter Form ID')}
            />
          </Form.InputGroup>
        </Form.Row>

        {/* Meta ID */}
        <Form.Row name="meta_id" isRequired>
          <Form.InputGroup name="meta_id" prepend={<i className="fas fa-tag"></i>}>
            <Form.InputBox
              type="string"
              name="meta_id"
              isRequired
              disabled={isSubmitting}
              placeholder={trans('Enter Meta ID')}
            />
          </Form.InputGroup>
        </Form.Row>

        {/* Data */}
        <Form.Row name="data" isRequired>
          <Form.InputGroup name="data" prepend={<i className="fas fa-database"></i>}>
            <Form.TextAreaBox
              name="data"
              isRequired
              rows={5}
              disabled={isSubmitting}
              placeholder={trans('Enter Data as JSON (e.g., {"key": "value"})')}
            />
          </Form.InputGroup>
        </Form.Row>
      </fieldset>

      <div className="text-right">
        <Form.Button
          isSubmitting={isSubmitting}
          label={trans('create')}
          className="btn btn-primary mt-2 mb-3"
          icon={<i className="fas fa-plus mr-2"></i>}
        />
      </div>
    </form>
  );
};

export default FormDataAddForm;
