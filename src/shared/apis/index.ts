import { STORAGE_KEY } from '@/shared/constants/storage';
import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
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
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   window.location.replace('/auth?mode=login');
    // }
    return Promise.reject(error);
  },
);

export default axiosInstance;
