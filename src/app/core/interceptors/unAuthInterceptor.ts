import { AxiosError, HttpStatusCode } from 'axios';

import { http } from '@app-core/configs';

http.httpInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.status === HttpStatusCode.Unauthorized) {
      console.log('Logout or do something');
    }
    return error;
  }
);
