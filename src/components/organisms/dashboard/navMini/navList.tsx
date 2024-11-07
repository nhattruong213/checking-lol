import { Popover, Stack } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useActiveLink } from '../hooks/useLinkActive';
import { NavConfigProps, NavListProps } from '../type';
import { NavItem } from './navItem';

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
  config: NavConfigProps;
};

export const NavList = ({ data, depth, hasChild, config }: NavListRootProps) => {
  const [open, setOpen] = useState(false);
  const active = useActiveLink(data.path, hasChild);
  const pathname = usePathname();
  const navRef = useRef(null);

  useEffect(() => {
    if (open) {
      handleClose();
    }
  }, [pathname]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <NavItem
        ref={navRef}
        item={data}
        depth={depth}
        open={open}
        active={active}
        config={config}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      />

      {hasChild && (
        <Popover
          open={open}
          anchorEl={navRef.current}
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 'left' }}
          slotProps={{
            paper: {
              onMouseEnter: handleOpen,
              onMouseLeave: handleClose,
              sx: {
                mt: 0.5,
                width: 160,
                ...(open && {
                  pointerEvents: 'auto',
                }),
              },
            },
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          <NavSubList data={data.children} depth={depth} config={config} />
        </Popover>
      )}
    </>
  );
};

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
  config: NavConfigProps;
};

const NavSubList = ({ data, depth, config }: NavListSubProps) => {
  return (
    <Stack spacing={0.5}>
      {data.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={depth + 1} hasChild={!!list.children} config={config} />
      ))}
    </Stack>
  );
};
