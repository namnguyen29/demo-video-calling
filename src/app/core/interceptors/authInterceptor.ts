import { http } from '@app-core/configs';

const accessToken = JSON.parse(localStorage.getItem('accessToken') as string);

http.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
