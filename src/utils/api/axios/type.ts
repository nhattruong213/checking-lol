import { output, ZodType, ZodTypeAny } from 'zod';

import { TResponse } from '@/schemas/template/response';

export type TRefreshTokenFetcher = {
  accessToken?: string;
  refreshToken?: string;
};

export interface FetcherProps<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>> {
  requestSchema?: TRequestSchema;
  responseSchema: TResponseSchema;
  payload?: output<TRequestSchema>;
  init: RequestInit;
  endpoint: string;
  setLoading?: (data: boolean) => void;
  accessToken?: string;
  isQueryData?: boolean;
  onSuccess?: (response: output<TResponseSchema>) => void;
  onError?: (response: output<TResponseSchema>) => void;
  onRedirect?: () => void;
}
