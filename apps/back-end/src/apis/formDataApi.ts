import { PaginatorDto, RegisterDto, FormDataDtos, UserDto } from '@dtos';
import axiosAuth from './axiosAuth';
import { IApiResponse, ILoginData, IRegisterData } from '@back-end/types';

const prefix = '/form_data';


export const FormDatasApi = {
    getFormDatas: (meta_id: string): Promise<IApiResponse<{ paginate?: PaginatorDto<FormDataDtos.FormDataDto> }>> => {    
        return axiosAuth.get(`${prefix}/${meta_id}/view`);
    },

    addFormData: (params: FormDataDtos.Create): Promise<IApiResponse<{ form_data: FormDataDtos.Create }>> => {
        return axiosAuth.post(`${prefix}/add`, params);
    }, 

    editFormData: (
        params: any,
        form_id: string
    ): Promise<IApiResponse<{ successfully?: boolean; data?: any,error:any }>> => {
        // params['bot_Ids']=params['bot_Ids']
        // params['updatedBy']=params['updatedBy']
        // console.log(params)
        return axiosAuth.patch(`${prefix}/${form_id}/edit`,params);
    },

    deleteFormData: (
        form_id: String
    ): Promise<IApiResponse<{ successfully?: boolean; error?: any }>> => {
    
        return axiosAuth.delete(`${prefix}/${form_id}/delete`);
    },
};
