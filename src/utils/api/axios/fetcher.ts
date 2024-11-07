import { api } from './api';
import { FetcherProps } from './type';

export async function fetcher(props: FetcherProps) {
  const { endpoint, init, payload, setLoading, onError, onSuccess } = props;

  setLoading && setLoading(true);

  try {
    let body;

    if (init?.method !== 'GET') {
      body = JSON.stringify(payload);
    }

    let url = endpoint;
    if (init?.method === 'GET' && payload) {
      const queryParams = new URLSearchParams(payload as any).toString();
      url = `${endpoint}?${queryParams}`;
    }

    const response = await api({
      url: url,
      method: init?.method ?? 'GET',
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;

    onSuccess &&
      onSuccess({
        data: data || undefined,
        statusCode: response.status,
        success: true,
      });

    return data;
    // eslint-disable-next-line no-useless-catch
  } catch (error) {
    const axiosError = error as { response?: { data: any; status?: number } };

    onError &&
      onError({
        errors: axiosError.response?.data ?? {},
        statusCode: axiosError.response?.status,
      } as any);

    return undefined;
  } finally {
    setLoading && setLoading(false);
  }
}
