import { DefaultError, useMutation as useReactMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { output, ZodType, ZodTypeAny } from 'zod';

import { LoginPath } from '@/constants/path';
import { TResponse } from '@/schemas/template/response';
import { fetcher } from '@/utils/api/axios/fetcher';

import { UseMutationProps } from './type';

export const useMutation = <TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>>(
  props: UseMutationProps<TRequestSchema, TResponseSchema>
) => {
  const { apiConfig, requestSchema, responseSchema, options, onError, onSuccess } = props;
  const router = useRouter();
  const mutation = useReactMutation<output<TResponseSchema>, DefaultError, output<TRequestSchema>>({
    ...(options || ({} as any)),
    mutationFn: (variables) => {
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
        payload: variables,
        onError,
        onSuccess,
        onRedirect: () => {
          router.push(LoginPath);
        },
      });
    },
    refetchOnWindowFocus: false,
    mutationKey: [...apiConfig.keys, options?.mutationKey],
  });

  const { error } = mutation;

  // Application Error
  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return mutation;
};
