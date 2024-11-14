import { axiosClient } from './axiosClient';
import { ConflictException } from '@nestjs/common';

export const mtApi = {
  findMt5Infor(accountNumber: number, password: string) {
    const { baseURL, serverHost, serverPort } = this.config();

    return axiosClient.post(
      '/mt5/accinfo',
      {
        accountNumber: +accountNumber,
        password,
        host: serverHost,
        port: +serverPort,
      },
      { baseURL }
    );
  },

  sendCheckAccountValid(accountNumber: number, password: string) {
    const { baseURL, serverHost, serverPort } = this.config();
    return axiosClient.post(
      '/mt5/account/check-auth',
      {
        accountNumber: +accountNumber,
        password,
        host: serverHost,
        port: +serverPort,
      },
      { baseURL }
    );
  },

  config() {
    const baseURL = process?.env?.MT_API_URL;
    const serverHost = process?.env?.MT_API_SERVER_HOST;
    const serverPort = process?.env?.MT_API_SERVER_PORT;
    if (!baseURL || !serverHost || !serverPort) {
      throw new ConflictException('MT API SERVER CONFIG');
    }

    return {
      baseURL,
      serverHost,
      serverPort,
    };
  },
};
