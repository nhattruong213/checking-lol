import { APIConfig } from '@/types/api';

export const postLogin: APIConfig = {
  endPoint: '/api/auth/login',
  keys: ['post-auth-token'],
  method: 'POST',
  accessToken: false,
};
