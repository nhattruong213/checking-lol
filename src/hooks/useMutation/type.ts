import { UseMutationOptions } from '@tanstack/react-query';
import { output, ZodType, ZodTypeAny } from 'zod';

import { TResponse } from '@/schemas/template/response';
import { APIConfig } from '@/types/api';

export type UseMutationProps<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>> = {
  apiConfig: APIConfig;
  requestSchema: TRequestSchema;
  responseSchema: TResponseSchema;
  options?: UseMutationOptions;
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  loadingKey?: string;
};
