import { useTrans } from '@react-libs/hooks';
import { useContext } from 'react';
import { FormDatasListContext } from '../hook';
import { Error, LoadingOverlay, NoData, Pagination } from '@react-libs/components/Common';
import { formatDate } from '@react-libs/utils';
import { FormDataActionsDropDown } from '../common';
import { useAppSelector } from '@back-end/hooks';
import { selectVisitor } from '@back-end/store/auth';

const FormDataListComponent = () => {
  const trans = useTrans();
  const visitor = useAppSelector(selectVisitor);

  const {
    loadingStatus,
    error,
    paginator,
    handleCheck,
    handleCheckAll,
    checked,
    checkedAll,
  } = useContext(FormDatasListContext);

  if (loadingStatus === 'loading') {
    return <LoadingOverlay />;
  }

  if (loadingStatus === 'error') {
    return <Error error={error || 'Unknown error'} />;
  }

  if (!paginator || !paginator.items || !paginator.items.length) {
    return <NoData />;
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover table-striped text-nowrap table-layout-fixed">
          <thead className="text-center">
            <tr className="text-left">
              <th>
                <input type="checkbox" checked={checkedAll} onChange={handleCheckAll} />
              </th>
              <th className="w-20">{trans('form_id')}</th>
              <th>{trans('meta_id')}</th>
              <th>{trans('data')}</th>
              <th>{trans('createdAt')}</th>
              <th>{trans('updatedAt')}</th>
              <th>{trans('action')}</th>
            </tr>
          </thead>
          <tbody className="text-left">
            {paginator?.items.map((item, index) => (
              <tr key={index}>
                <td>
                  {/* <input
                    type="checkbox"
                    value={item._id}
                    onChange={handleCheck}
                    checked={checked.includes(item._id)}
                  /> */}
                </td>
                <td>{item.form_id || 'N/A'}</td>
                <td>{item.meta_id || 'N/A'}</td>
                <td>
                  {item.data ? (
                    <pre className="text-break">{JSON.stringify(item.data, null, 2)}</pre>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{item.createdDate ? new Date(item.createdDate).toLocaleString() : 'N/A'}</td>
                <td>{item.updatedDate ? new Date(item.updatedDate).toLocaleString() : 'N/A'}</td>
                <td>
                  <FormDataActionsDropDown formData={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination params={paginator} />
    </>
  );
};

export default FormDataListComponent;
