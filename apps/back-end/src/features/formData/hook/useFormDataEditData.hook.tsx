import { FormDatasApi } from '@back-end/apis';
import { FormDataDtos } from '@dtos';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

export const useFormDataEditData = (code: string) => {
  const history = useNavigate();
  const { pathname } = useLocation();

  const [isSuccess, setIsSubmitting] = useState(false);
  const [EditError, setEditError] = useState<string>();

  const { handleSubmit, setError } = useFormContext<FormDataDtos.Edit>();

  const onSubmit = handleSubmit((formData: FormDataDtos.Edit) => {
    if (isSuccess) {
      return;
    }

    setIsSubmitting(true);

    FormDatasApi.editFormData(formData, code).then(({ successfully, error, data }) => {
      setIsSubmitting(false);
      if (error) {
        Object.entries(error).map(([field, message]) => {
          return setError(field as keyof FormDataDtos.Edit, { type: 'manual' });
        });
      }

      if (successfully) {
        const path = '/form_datas';
        if (pathname !== path) {
          history(path);
        } else {
          window.location.reload();
        }
      } else {
        setEditError('Message: ' + error);
      }
    });
  });

  return {
    onSubmit,
    EditError,
    isSuccess,
  };
};
