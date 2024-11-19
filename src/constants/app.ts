export const PAGINATION_LIMIT = {
  XXS: 10,
  XS: 15,
  S: 20,
  M: 25,
  MD: 30,
  L: 40,
  XL: 50,
  XXL: 100,
};

export const PAGINATION_DEFAULT = {
  limit: PAGINATION_LIMIT.S,
  page: 1,
};
export const BASE_API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8089';

export const API_KEY = process.env.NEXT_PUBLIC_API_KEY ?? 'RGAPI-76914abf-12cc-44bf-b890-6cc179ef241c';
export const HOST_API = process.env.NEXT_PUBLIC_HOST_API ?? 'http://localhost:3000';

export const REAL_PATH = process.env.NEXT_PUBLIC_NOVA_RESERVE_URL;

export const drawerWidth = 260;

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16,
};

export const NAV = {
  W_VERTICAL: 280,
  W_MINI: 88,
};

export const RANK = {
  I: 'Thách đấu',
  II: 'Đại cao thủ',
  III: 'Cao thủ',
};
