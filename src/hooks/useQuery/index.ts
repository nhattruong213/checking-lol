'use client';

import { useQuery as useReactQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { output } from 'zod';

import { queryClient } from '@/containers/appProvider';
import { fetcher } from '@/utils/api/axios/fetcher';

import { UseQueryProps } from './type';

export const useQuery = (props: UseQueryProps) => {
  const { apiConfig, options, onError, onSuccess, payload } = props;
  const queryResult = useReactQuery<output<any>>({
    ...(options || ({} as any)),
    queryFn: () => {
      return fetcher({
        endpoint: apiConfig.endPoint,
        init: {
          ...options,
          method: apiConfig.method,
          next: {
            tags: apiConfig.keys,
          },
        },
        payload,
        onError,
        onSuccess,
      });
    },
    refetchOnWindowFocus: false,
    queryKey: [...apiConfig.keys, options?.queryKey],
  });
  const { error, data } = queryResult;

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (data?.success === true) {
      queryClient.removeQueries({ type: 'inactive' });
    }
  }, [data?.success]);

  return queryResult;
};
