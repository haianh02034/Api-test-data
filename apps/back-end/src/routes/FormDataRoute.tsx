import { FormDatasPage } from '@back-end/features/formData/page'; 
import { Route, Routes } from 'react-router-dom';

const FormDatasPages = () => {
  return (
    <Routes>
      <Route index path="*" element={<FormDatasPage />} />
    </Routes>
  );
};

export default FormDatasPages;

