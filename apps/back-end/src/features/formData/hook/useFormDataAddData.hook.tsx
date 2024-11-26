import { FormDatasApi, } from '@back-end/apis';
import {  FormDataDtos } from '@dtos';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

export const useFormDataAddData = () => {
  const history = useNavigate();
  const { pathname } = useLocation();
  const { handleSubmit, setError } = useFormContext<FormDataDtos.Create>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addError, setAddError] = useState<string>();
 


  const onSubmit = handleSubmit(async (formData: FormDataDtos.Create) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { form_data, error, errors } = await FormDatasApi.addFormData(formData);

      setIsSubmitting(false);

      if (error) {
        setAddError(error);
      }

      if (errors) {
        Object.entries(errors).forEach(([field, message]) => {
          setError(field as keyof FormDataDtos.Create, {
            type: 'manual',
            message,
          });
        });
      }

      if (form_data) {
        const path = '/form_datas';

        if (pathname !== path) {
          history(path);
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  });

  return {
    onSubmit,
    addError,
    isSubmitting,

  };
};
