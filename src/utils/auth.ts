import { TToken } from '@/types/auth';

export function decodeAuth(value: string | null): TToken {
  const decode = value ? JSON.parse(value) : {};

  return {
    accessToken: decode?.accessToken,
    refreshToken: decode?.refreshToken,
  };
}

export function encodeAuth(value: TToken | '') {
  return JSON.stringify(value ? value : { accessToken: '', refreshToken: '' });
}
