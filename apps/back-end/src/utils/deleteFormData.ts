import { useEffect, useState } from 'react';
import { FormDatasApi } from '@back-end/apis';
import { IApiResponse } from '@react-libs/types';
import { ObjectId } from 'typeorm';

export const useFormDataDelete = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | undefined>();

  const onDelete = (form_id: string) => {
    setIsSuccess(false);

    // Display a confirmation dialog
    const userConfirmed = window.confirm('Are you sure you want to delete this item?');

    if (userConfirmed) {
        FormDatasApi
        .deleteFormData(form_id)
        .then(({ successfully, error }: IApiResponse<any>) => {
          if (successfully) {
            setIsSuccess(true);
            // Reload the page after successful deletion
            // window.location.reload();
          } else {
      
            setDeleteError(`Error deleting: ${error}`);

            alert('Error: No data');

            alert(`Error: No data for form_id: ${form_id}`);
            // window.location.reload();
          }
        })
        .catch((error) => {
          setDeleteError(`Error deleting: ${error}`);
        });
    }
  };

  useEffect(() => {
    // You can add logic here if needed
  }, [isSuccess]);

  return {
    onDelete,
    deleteError,
    isSuccess,
  };
};
