import { RootState } from '@back-end/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHeaderState } from './types';
import { config } from '@back-end/configs';

const initialState: IHeaderState = {
  pageTitle: config?.siteName || '',
  section: 'home',
  breadcrumbs: [],
  quickActions: undefined,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    refresh: (state, action: PayloadAction<IHeaderState>) => ({
      ...state,
      ...initialState,
      ...action.payload,
    }),
    update: (state, action: PayloadAction<IHeaderState>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const headerActions = headerSlice.actions;
export const headerReducer = headerSlice.reducer;

export const selectPageTitle = (state: RootState) => state.header?.pageTitle || '';
export const selectSection = (state: RootState) => state.header?.section || 'home';
export const selectBreadcrumbs = (state: RootState) => state.header?.breadcrumbs || [];
export const selectToggleSidebar = (state: RootState) => !!state.header?.isToggleSidebar;
export const selectQuickActions = (state: RootState) => state.header?.quickActions || null;
