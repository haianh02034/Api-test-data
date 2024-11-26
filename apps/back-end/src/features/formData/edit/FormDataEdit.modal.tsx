import { useState, useEffect } from 'react';
import { FormDataDtos } from '@dtos';
import { Modal } from 'react-bootstrap';
import FormDataEditComponent from './FormDataEdit.component';
import { FormProvider, useForm } from 'react-hook-form';

const FormDataEditModal = ({ className, form_data }: { className?: string; form_data: FormDataDtos.FormDataDto }) => {
  const [showModal, setShowModal] = useState(false);

  const methods = useForm<FormDataDtos.FormDataDto>({
    defaultValues: {
      form_id: form_data.form_id || "",
      meta_id: form_data.meta_id || "",
      data: form_data.data || {},  // Đảm bảo 'data' là đối tượng, không phải chuỗi
    },
  });

  return (
    <>
      <button
        className={`btn btn-sm ${className} dropdown-item bg-warning`}
        onClick={() => setShowModal(!showModal)}
      >
        <i className="fas fa-gears mr-2"></i>
        Edit
      </button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        aria-labelledby="account-bot-edit"
        size="lg"
        centered
        animation={false}
      >
        <Modal.Header closeButton className="bg-info">
          <Modal.Title id="economic-new-edit" className="text-truncate">
            Edit form_data # {form_data.form_id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...methods}>
            <FormDataEditComponent form_data={form_data} methods={methods} />
          </FormProvider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormDataEditModal;
