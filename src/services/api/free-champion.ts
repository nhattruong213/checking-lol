import { APIConfig } from '@/types/api';

export const getFreeChampions: APIConfig = {
  endPoint: '/api/free-champions',
  keys: ['free-champions'],
  method: 'GET',
};
