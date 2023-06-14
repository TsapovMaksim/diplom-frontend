import { API_URL } from '@/shared/constants';
import axios from 'axios';

const defaultAxios = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
});

export const setToken = (token: string) => {
  // if (token) {
  //   defaultAxios.interceptors.request.use(config => {
  //     config.headers.Authorization = `Bearer ${token}`;
  //     return config;
  //   });
  // } else {
  //   defaultAxios.interceptors.request.use(config => {
  //     config.headers.Authorization = `Bearer ${token}`;
  //     return config;
  //   });
  // }
  if (token) {
    // defaultAxios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    defaultAxios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  } else {
    defaultAxios.interceptors.request.clear();
  }
};

// defaultAxios.interceptors.response.use(
//   config => {
//     return config;
//   },
//   async error => {
//     if (error.response.status == 401) {
//       const res = await axios.get('/server-api/refresh');
//     }
//   }
// );

export { defaultAxios as axios };
