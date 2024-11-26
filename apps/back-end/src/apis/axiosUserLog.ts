import axios, { AxiosResponse } from 'axios';

import { store } from '@back-end/store';
import { apiManagerUrl, apiUrl } from '@back-end/utils';

const axiosUserLog = axios.create({
  baseURL: apiManagerUrl('api'),
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosUserLog.interceptors.request.use((config: any) => {
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

axiosUserLog.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    return { ...data, error: data?.error || '', errors: data?.errors || {} };
  },
  (error) => {
    return Promise.resolve(error?.response?.data);
  }
);

export default axiosUserLog;
