import { Collapse } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useActiveLink } from '../hooks/useLinkActive';
import { NavConfigProps, NavListProps } from '../type';
import { NavItem } from './navItem';

type NavListRootProps = {
  data: NavListProps;
  depth: number;
  hasChild: boolean;
  config: NavConfigProps;
};

type NavListSubProps = {
  data: NavListProps[];
  depth: number;
  config: NavConfigProps;
};

export const NavList = ({ data, depth, hasChild, config }: NavListRootProps) => {
  const active = useActiveLink(data.path, hasChild);
  const [open, setOpen] = useState(active);
  const pathname = usePathname();

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!active) {
      handleClose();
    }
  }, [pathname]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <NavItem item={data} depth={depth} open={open} active={active} onClick={handleToggle} config={config} />
      {hasChild && (
        <Collapse in={open} unmountOnExit>
          <NavSubList data={data.children} depth={depth} config={config} />
        </Collapse>
      )}
    </>
  );
};

const NavSubList = ({ data, depth, config }: NavListSubProps) => {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={depth + 1} hasChild={!!list.children} config={config} />
      ))}
    </>
  );
};
