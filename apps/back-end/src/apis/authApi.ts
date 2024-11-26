import { RegisterDto, UserDto } from '@dtos';
import axiosAuth from './axiosAuth';
import { IApiResponse, ILoginData, IRegisterData } from '@back-end/types';

export const authApi = {
  fetchRefreshToken: (): Promise<IApiResponse<{ accessToken?: string }>> => {
    const url = `/auth/refresh-token`;
    return axiosAuth.post(url);
  },

  fetchVisitor: (): Promise<
    IApiResponse<{
      visitor?: UserDto;
    }>
  > => {
    return axiosAuth.get('/auth/me');
  },

  sendLogin: (params: ILoginData): Promise<IApiResponse<{ accessToken?: string }>> => {
    const url = `/auth/login`;
    console.log("params",params)
    return axiosAuth.post(url, params);

  },

  sendRegister: (params: IRegisterData): Promise<IApiResponse<{ accessToken?: string }>> => {
    return axiosAuth.post(`/auth/register`, params, { headers: { passkey: '' } });
  },
};
