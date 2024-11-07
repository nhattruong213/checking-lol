export type TRefreshTokenFetcher = {
  accessToken?: string;
  refreshToken?: string;
};

export interface FetcherProps {
  payload?: any;
  init: RequestInit;
  endpoint: string;
  setLoading?: (data: boolean) => void;
  accessToken?: string;
  isQueryData?: boolean;
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;
}
