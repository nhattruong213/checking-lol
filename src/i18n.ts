import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './services/locale';

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
