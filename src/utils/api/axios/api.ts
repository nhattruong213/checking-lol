import axios from 'axios';

import { HOST_API } from '@/constants/app';

const api = axios.create({
  baseURL: HOST_API,
});

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export { api };
