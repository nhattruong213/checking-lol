import { UseQueryOptions } from '@tanstack/react-query';
import { output, ZodType, ZodTypeAny } from 'zod';

import { TResponse } from '@/schemas/template/response';
import { APIConfig } from '@/types/api';

export type UseQueryProps<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>> = {
  apiConfig: APIConfig;
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: output<TRequestSchema>;
  options?: UseQueryOptions;
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
};
