import axios, { AxiosResponse } from 'axios';

import { store } from '@back-end/store';
import { apiUrl } from '@back-end/utils';

const axiosAuth = axios.create({
 baseURL: apiUrl('api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosAuth.interceptors.request.use((config: any) => {
  const headers: {
    Authorization?: string;
    Language?: string;
  } = {};

  const accessToken = store.getState().auth?.accessToken || '';
  if (accessToken?.length) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  headers.Language = 'en';

  return { ...config, headers: { ...config.headers, ...headers } };
});

axiosAuth.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    return { ...data, error: data?.error || '', errors: data?.errors || {} };
  },
  (error) => {
    return Promise.resolve(error?.response?.data);
  }
);

export default axiosAuth;
