import { Dispatch, SetStateAction, createContext } from 'react';
import { FormDataDtos, PaginatorDto } from '@dtos';

export const FormDatasListContext = createContext<{
  loadingStatus: 'loading' | 'error' | 'done';
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleCheckAll: (event: React.FormEvent<HTMLInputElement>) => void;
  handleCheck: (event: React.FormEvent<HTMLInputElement>) => void;
  checked: number[];
  checkedAll: boolean;
  paginator?: PaginatorDto<FormDataDtos.FormDataDto>;
  error?: string;
}>({
  loadingStatus: 'loading',
  showModal: false,
  checked: [],
  checkedAll: false,
  setShowModal: (event) => {
    //
  },
  handleCheckAll: (event) => {
    //
  },
  handleCheck: (event) => {
    //
  },
});

export const FormDataAddContext = createContext<{
  isSubmitting: boolean;
  addError?: string;
  onSubmit: () => void;
}>({
  isSubmitting: false,
  onSubmit: () => {
    //
  },
});

export const FormDataApprovedContext = createContext<{
  loadingStatus: 'loading' | 'error' | 'done' | 'none';
  approvedError?: string;
  backToPage: () => void;
  onSubmit: () => void;
}>({
  loadingStatus: 'none',
  backToPage: () => {
    //
  },
  onSubmit: () => {
    //
  },
});
