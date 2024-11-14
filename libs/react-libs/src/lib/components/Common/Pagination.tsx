import { useMemo } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { formatNumber } from '@utils';
import { useFilters, useTrans, useWindowWidth } from '@react-libs/hooks';
import { IPagination } from '@react-libs/types';

export const Pagination = ({ params }: { params?: IPagination }) => {
  const trans = useTrans();
  const { filters, pushFilters } = useFilters();

  const { page, perPage, total, resultCount } = useMemo(() => {
    if (!params?.total) {
      return { page: 1, perPage: 0, total: 0, resultCount: 0 };
    }
    const { page } = { page: 1, ...filters };
    return { ...params, page: Math.max(1, page) };
  }, [params, filters]);

  const description = useMemo(() => {
    if (!perPage) {
      return;
    }
    const startOffset = (page - 1) * perPage + 1;
    const endOffset = startOffset - 1 + resultCount;

    return trans('showing_entries_x_to_y_of_z', {
      startOffset: formatNumber(startOffset),
      endOffset: formatNumber(endOffset),
      total: formatNumber(total),
    });
  }, [page, perPage, resultCount, total, trans]);

  const windowWidth = useWindowWidth();

  const options = useMemo((): ReactPaginateProps => {
    if (!total) {
      return {
        pageCount: 0,
      };
    }
    let options: ReactPaginateProps = {
      forcePage: Math.max(0, page - 1),
      pageCount: Math.ceil(total / perPage),
      pageRangeDisplayed: 6,
      marginPagesDisplayed: 1,
      breakClassName: 'page-item',
      breakLinkClassName: 'page-link disabled',
      containerClassName: 'pagination m-0',
      pageClassName: 'page-item',
      pageLinkClassName: 'page-link',
      activeClassName: 'page-item active',
      activeLinkClassName: 'page-link',
      previousClassName: 'page-item',
      previousLinkClassName: 'page-link',
      nextClassName: 'page-item',
      nextLinkClassName: 'page-link',
      onPageChange: ({ selected }) => pushFilters({ page: !selected ? '' : selected + 1 }),
    };
    if (windowWidth <= 768) {
      options = {
        ...options,
        ...{
          pageRangeDisplayed: (windowWidth <= 350 && 1) || 3,
          previousLabel: null,
          nextLabel: null,
          previousLinkClassName: 'page-link fa fa-angle-left',
          nextLinkClassName: 'page-link fa fa-angle-right',
        },
      };
    }
    return options;
  }, [page, perPage, pushFilters, total, windowWidth]);

  if (!total) {
    return <></>;
  }

  return (
    <div className="small d-flex align-items-center justify-content-end flex-wrap-reverse pagination">
      {!!description && <span className="text-muted">{description}</span>}
      {total > perPage && (
        <span className="cursor-pointer ml-2 mt-2 mb-2">
          <ReactPaginate {...options} />
        </span>
      )}
    </div>
  );
};
