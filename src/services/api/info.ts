import { APIConfig } from '@/types/api';

export const info: APIConfig = {
  endPoint: '/api/auth/user-profile',
  keys: ['get-info'],
  method: 'GET',
  accessToken: true,
};
