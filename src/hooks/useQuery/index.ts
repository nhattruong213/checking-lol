'use client';

import { useQuery as useReactQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { output, ZodType, ZodTypeAny } from 'zod';

import { LoginPath } from '@/constants/path';
import { queryClient } from '@/containers/appProvider';
import { TResponse } from '@/schemas/template/response';
import { fetcher } from '@/utils/api/axios/fetcher';

import { UseQueryProps } from './type';

export const useQuery = <TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>>(
  props: UseQueryProps<TRequestSchema, TResponseSchema>
) => {
  const { apiConfig, requestSchema, responseSchema, options, onError, onSuccess, payload } = props;
  const router = useRouter();
  const queryResult = useReactQuery<output<TResponseSchema>>({
    ...(options || ({} as any)),
    queryFn: () => {
      return fetcher<TRequestSchema, TResponseSchema>({
        endpoint: apiConfig.endPoint,
        init: {
          ...options,
          method: apiConfig.method,
          next: {
            tags: apiConfig.keys,
          },
        },
        responseSchema,
        requestSchema,
        payload,
        onError,
        onSuccess,
        onRedirect: () => {
          router.push(LoginPath);
        },
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
