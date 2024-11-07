import { APIConfig } from '@/types/api';

export const postSendMailCode: APIConfig = {
  endPoint: '/api/password/send-reset-code',
  keys: ['post-send-mail-token'],
  method: 'POST',
  accessToken: false,
};

export const postVerifyCode: APIConfig = {
  endPoint: '/api/password/verify-reset-code',
  keys: ['post-verify-reset-code'],
  method: 'POST',
  accessToken: false,
};

export const postChangePassword: APIConfig = {
  endPoint: '/api/password/reset',
  keys: ['post-password-reset'],
  method: 'POST',
  accessToken: false,
};
