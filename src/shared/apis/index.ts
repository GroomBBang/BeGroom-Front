import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// const attachAccessToken = (config: InternalAxiosRequestConfig, token: string) => {
//   config.headers = config.headers ?? {};
//   config.headers['Authorization'] = `Bearer ${token}`;
//   return config;
// };

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     return token ? attachAccessToken(config, token) : config;
//   },
//   (error) => Promise.reject(error),
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // window.location.replace('/');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
