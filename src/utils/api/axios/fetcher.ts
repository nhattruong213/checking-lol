import { output, ZodType, ZodTypeAny } from 'zod';

import { HTTP_STATUS_CODE } from '@/constants/httpCode';
import { TResponse } from '@/schemas/template/response';

import { api } from './api';
import { FetcherProps } from './type';

export async function fetcher<TRequestSchema extends ZodTypeAny, TResponseSchema extends ZodType<TResponse>>(
  props: FetcherProps<TRequestSchema, TResponseSchema>
): Promise<output<TResponseSchema>> {
  const { endpoint, init, responseSchema, requestSchema, payload, setLoading, onError, onSuccess, onRedirect } = props;

  setLoading && setLoading(true);

  try {
    let body;
    const payloadParser = requestSchema && requestSchema.parse(payload);

    if (init?.method !== 'GET') {
      body = JSON.stringify(payloadParser);
    }

    const response = await api({
      url: endpoint,
      method: init?.method ?? 'GET',
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = responseSchema?.parse({
      data: response.data?.data || undefined,
      statusCode: response.status,
      success: true,
      errors: response.data?.errors || undefined,
    }) as output<TResponseSchema>;

    onSuccess &&
      onSuccess({
        data: data.data || undefined,
        statusCode: response.status,
        success: true,
      });

    return data;
    // eslint-disable-next-line no-useless-catch
  } catch (error) {
    const axiosError = error as { response?: { data: any; status?: number } };

    if (axiosError.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
      onRedirect && onRedirect();
    }

    onError &&
      onError({
        errors: axiosError.response?.data ?? {},
        statusCode: axiosError.response?.status,
      } as any);

    return responseSchema?.parse({
      data: undefined,
      statusCode: axiosError.response?.status ?? {},
      success: false,
      errors: axiosError.response?.data ?? {},
    }) as output<TResponseSchema>;
  } finally {
    setLoading && setLoading(false);
  }
}
