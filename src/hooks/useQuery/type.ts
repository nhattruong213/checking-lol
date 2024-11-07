import { UseQueryOptions } from '@tanstack/react-query';

import { APIConfig } from '@/types/api';

export type UseQueryProps = {
  apiConfig: APIConfig;
  payload?: any;
  options?: UseQueryOptions;
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;
};
