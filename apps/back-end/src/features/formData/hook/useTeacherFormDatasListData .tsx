import { useEffect, useMemo, useState } from 'react';
import { from } from 'rxjs';
import { FormDatasApi } from '@back-end/apis';
import { FormDataDtos, PaginatorDto } from '@dtos';
import { useFilters } from '@react-libs/hooks';

export const useTeacherFormDatasListData = () => {
  const [loadingStatus, setLoadingStatus] = useState<'loading' | 'error' | 'done'>('loading');
  const [paginator, setPaginator] = useState<PaginatorDto<FormDataDtos.FormDataDto>>();
  const [error, setError] = useState<string>();

  const [checked, setChecked] = useState<number[]>([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { filters, pushFilters } = useFilters();
  const { page, accountId, Date } = filters;

  // Ensure that the page is reset to 1 when filters change
  useMemo(() => {
    if (page !== 1) {
      pushFilters({ ...filters, page: 1 });
    }
  }, [accountId, Date]);

  useEffect(() => {
    const subscription = from(FormDatasApi.getFormDatas('teacher')).subscribe(({ paginate, error }) => {
      if (paginate) {
        setLoadingStatus('done');
        setPaginator(paginate);
      }

      if (error) {
        setLoadingStatus('error');
        setError(error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [filters]);

  // Filter data for teachers
  const teacherData = paginator?.items.filter((data) => data.meta_id === 'teacher');

  const handleCheckAll = (event: React.FormEvent<HTMLInputElement>) => {
    let updatedList = [...checked];

    if (event.currentTarget.checked) {
      setCheckedAll(true);

      if (paginator) {
        paginator.items.map((item) => {
          const itemId: unknown = item.form_id;
          if (!updatedList.includes(itemId as number)) {
            updatedList.push(itemId as number);
          }
        });
      }

      setChecked(updatedList);
    } else {
      setCheckedAll(false);
      setChecked([]);
    }
  };

  const handleCheck = (event: React.FormEvent<HTMLInputElement>) => {
    let updatedList = [...checked];

    if (event.currentTarget.checked) {
      if (+event.currentTarget.value && !updatedList.includes(+event.currentTarget.value)) {
        updatedList = [...checked, +event.currentTarget.value];
        setChecked(updatedList);
      }
    } else {
      updatedList.splice(checked.indexOf(+event.currentTarget.value), 1);
      setChecked(updatedList);
    }
    if (paginator) {
      if (updatedList.length === paginator.items.length) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    }
  };

  return {
    loadingStatus,
    paginator,
    error,
    showModal,
    setShowModal,
    handleCheckAll,
    handleCheck,
    checked,
    checkedAll,
    teacherData,
  };
};
