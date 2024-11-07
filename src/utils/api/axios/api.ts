import axios from 'axios';
import Cookies from 'js-cookie';

import { HTTP_STATUS_AUTH_FAILED } from '@/constants/httpCode';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const refreshToken = async () => {
  try {
    const refreshToken = Cookies.get('refresh_token');

    if (!refreshToken) throw new Error('Refresh token missing');

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
      token: refreshToken,
    });
    const oneYearInSeconds = 365 * 24 * 60 * 60;

    Cookies.set('access_token', response.data.data.access_token, { expires: oneYearInSeconds, path: '/' });
    Cookies.set('refresh_token', response.data.data.refresh_token, { expires: oneYearInSeconds, path: '/' });

    return response.data.data.access_token;
  } catch (error) {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');

    return null;
  }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (HTTP_STATUS_AUTH_FAILED.includes(error.response?.status) && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
