import { APIConfig } from '@/types/api';

export const getTimeLine: APIConfig = {
  endPoint: '/api/get-time-line',
  keys: ['time-line'],
  method: 'GET',
};
