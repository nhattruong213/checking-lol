'use client';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { Logo } from '@/components/atoms/logo';
import { SimpleBarScroll } from '@/components/atoms/simpleBar';
import { SvgColor } from '@/components/atoms/svgColor';
import { useBoolean } from '@/hooks/useBoolean';

import { NavProps } from '../types';
import { NavList } from './nav-list';

// ----------------------------------------------------------------------

export const NavMobile = ({ offsetTop, data }: NavProps) => {
  const pathname = usePathname();

  const nav = useBoolean();

  useEffect(() => {
    if (nav.value) {
      nav.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: 1,
          ...(offsetTop && {
            color: 'text.primary',
          }),
        }}
      >
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <SimpleBarScroll>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </SimpleBarScroll>
      </Drawer>
    </>
  );
};
