import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { SvgColor } from '@/components/atoms/svgColor';
import { navPaths } from '@/constants/path';

const icon = (name: string) => <SvgColor src={`/assets/icons/nav/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

export const useNavData = () => {
  const t = useTranslations('Nav');
  const data = useMemo(
    () => [
      {
        subheader: t('overview'),
        items: [
          {
            title: t('app'),
            path: navPaths.dashboard,
            icon: ICONS.dashboard,
          },
          {
            title: t('ecommerce'),
            path: navPaths.ecommerce,
            icon: ICONS.ecommerce,
          },
          {
            title: t('analytics'),
            path: navPaths.analytics,
            icon: ICONS.analytics,
          },
        ],
      },
      {
        subheader: t('management'),
        items: [
          // USER
          {
            title: t('user'),
            path: navPaths.user.root,
            icon: ICONS.user,
            children: [
              { title: t('profile'), path: navPaths.user.root },
              { title: t('cards'), path: navPaths.user.cards },
              { title: t('list'), path: navPaths.user.lists },
            ],
          },

          // PRODUCT
          {
            title: t('product'),
            path: navPaths.product.root,
            icon: ICONS.product,
            children: [
              { title: t('list'), path: navPaths.product.root },
              {
                title: t('details'),
                path: navPaths.product.details,
              },
            ],
          },

          // ORDER
          {
            title: t('order'),
            path: navPaths.order.root,
            icon: ICONS.order,
            children: [
              { title: t('list'), path: navPaths.order.root },
              { title: t('details'), path: navPaths.order.details },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
};
