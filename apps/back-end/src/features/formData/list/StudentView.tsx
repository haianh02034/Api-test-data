import React from 'react';
import { useStudentFormDatasListData } from '../hook/useStudentFormDatasListData';
import { FormDataActionsDropDown } from '../common';
import { Button } from 'react-bootstrap';

const StudentFormDataView = () => {
  const {
    paginator,
    loadingStatus,
    error,
    showModal,
    setShowModal,
    handleCheckAll,
    handleCheck,
    checked,
    checkedAll,
  } = useStudentFormDatasListData();

  if (loadingStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (loadingStatus === 'error') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped text-nowrap table-layout-fixed">
        <thead className="text-center">
          <tr className="text-left">
            <th>
              <input type="checkbox" checked={checkedAll} onChange={handleCheckAll} />
            </th>
            <th className="w-20">Form ID</th>
            <th>Meta ID</th>
            <th>Data</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-left">
          {paginator?.items.map((item, index) => (
            <tr key={index}>
              <td>
                {/* Uncomment this if checkbox functionality is needed */}
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

      {/* Pagination */}
      {/* {paginator && (
        <div className="pagination-controls">
          <Button
            variant="link"
            onClick={() =>
              paginator.page > 1 && handleCheck({ page: paginator.page - 1 })
            }
          >
            Previous
          </Button>
          <Button
            variant="link"
            onClick={() =>
              paginator.page < paginator.totalPages && handleCheck({ page: paginator.page + 1 })
            }
          >
            Next
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default StudentFormDataView;
