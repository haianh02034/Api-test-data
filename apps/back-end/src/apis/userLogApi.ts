
import { UserLogDtos,  PaginatorDto } from '@dtos';
import { IApiResponse } from '@react-libs/types';
import axiosUserLog from './axiosUserLog';
const prefix = '/userLog';
export const userLogApi = {
    getUserLog: (params?:any): Promise<IApiResponse<{ paginate?: PaginatorDto<UserLogDtos.UserLog> }>> => {
      return axiosUserLog.get(`${prefix}`, { params });
    },

    addUserLog: (params: UserLogDtos.Create): Promise<IApiResponse<{ userLog: UserLogDtos.UserLog }>> => {
      return axiosUserLog.post(`${prefix}/add`, params);
    },
}