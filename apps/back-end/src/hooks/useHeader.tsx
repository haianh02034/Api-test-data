import { headerActions } from '@back-end/store/header';
import { IHeaderState } from '@back-end/store/header/types';
import { useEffect } from 'react';
import { useAppDispatch } from './useReduxHooks';

export const useHeader = (state: IHeaderState) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(headerActions.refresh(state));
  }, [dispatch, state]);
};
