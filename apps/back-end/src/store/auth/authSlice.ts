import { IUser } from './../../types/auth';
import { RootState } from '@back-end/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from './types';

const initialState: IAuthState = {
  visitor: null,
  accessToken: '',
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setVisitor: (state, action: PayloadAction<IUser | null>) => ({
      ...state,
      visitor: action.payload,
    }),

    logout: () => initialState,

    setToken: (state, action: PayloadAction<string>) => ({
      ...state,
      accessToken: action.payload,
    }),

    refreshToken: (state) => state,
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectVisitor = (state: RootState) => state.auth.visitor;
export const selectVisitorId = (state: RootState) => state.auth?.visitor?.id || 0;
export const selectAccessToken = (state: RootState) => state.auth?.accessToken || '';
