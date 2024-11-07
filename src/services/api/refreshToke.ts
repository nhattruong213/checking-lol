import { APIConfig } from '@/types/api';

export const postRefeshToken: APIConfig = {
  endPoint: '/api/auth/refresh',
  keys: ['get-refresh-token'],
  method: 'POST',
  accessToken: false,
};
