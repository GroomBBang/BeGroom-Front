import { CommonSuccessResponse } from '@/shared/types/response/CommonDto';
import { AxiosRequestConfig } from 'axios';
import axiosInstance from './index';

const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<CommonSuccessResponse<T>> => {
    const response = await axiosInstance.get<CommonSuccessResponse<T>>(url, config);
    return response.data;
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<CommonSuccessResponse<T>> => {
    const response = await axiosInstance.post<CommonSuccessResponse<T>>(url, data, config);
    return response.data;
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<CommonSuccessResponse<T>> => {
    const response = await axiosInstance.put<CommonSuccessResponse<T>>(url, data, config);
    return response.data;
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<CommonSuccessResponse<T>> => {
    const response = await axiosInstance.delete<CommonSuccessResponse<T>>(url, config);
    return response.data;
  },
};

export default http;
