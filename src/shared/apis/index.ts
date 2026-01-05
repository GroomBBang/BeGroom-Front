import { STORAGE_KEY } from '@/shared/constants/storage';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { CommonErrorResponse, CommonSuccessResponse } from '../types/response/CommonDto';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const attachAccessToken = (config: InternalAxiosRequestConfig, token: string) => {
  config.headers = config.headers ?? {};
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get(STORAGE_KEY.JWT_TOKEN);
    return token ? attachAccessToken(config, token) : config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<CommonSuccessResponse<unknown>>) => {
    return response;
  },

  (error: AxiosError<CommonErrorResponse>) => {
    if (error.response && error.response.data) {
      const errorData = error.response.data;

      return Promise.reject({
        code: errorData.status_code,
        message: errorData.status_message,
      });
    }

    return Promise.reject({
      code: 500,
      message: 'Network Error',
    });
  },
);

export default axiosInstance;
