import { useTrans } from '@react-libs/hooks';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import FormDataAddForm from './FormDataAdd.form';
import { FormProvider, useForm } from 'react-hook-form';
import { FormDataDtos } from '@dtos';

const FormDataAddModal = ({ className }: { className?: string }) => {
  const trans = useTrans();
  const [showModal, setShowModal] = useState(false);

  const methods = useForm<FormDataDtos.Create>({
    defaultValues: {},
  });

  return (
    <>
      <button className={`btn btn-danger btn-sm ${className}`} onClick={() => setShowModal(!showModal)}>
        <i className="fas fa-plus mr-2"></i>
        {trans('add')}
      </button>

      <Modal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        aria-labelledby="form_data-add"
        size="lg"
        centered
        animation={false}
      >
        <Modal.Header closeButton className="bg-info">
          <Modal.Title id="form_data-add" className="text-truncate">
            {trans('add_form_data')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...methods}>
            <FormDataAddForm />
          </FormProvider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormDataAddModal;
