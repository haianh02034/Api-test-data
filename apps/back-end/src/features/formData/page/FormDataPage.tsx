import { useHeader } from '@back-end/hooks';
import { useTrans } from '@react-libs/hooks';
import { FormDataListContainer } from '../list';
import { FormDataForm } from '../add';

const FormDatasPage = () => {
  const trans = useTrans();

  useHeader({
    pageTitle: trans('form_data'),
    section: 'form_data',
    breadcrumbs: [
      {
        title: trans('form_data'),
        link: '/form_data',
        active: true,
        icon: 'fa fa-users',
      },
    ],
  });

  return(
    <><FormDataListContainer /></>  
  ) 
  
  ;
};

export default FormDatasPage;
