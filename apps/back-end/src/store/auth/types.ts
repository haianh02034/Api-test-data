import { IUser } from '@back-end/types';

export interface IAuthState {
  visitor: IUser | null;
  accessToken: string;
  status: 'idle' | 'loading' | 'failed';
}
