'use client';

import { Stack } from '@mui/material';

import { navMiniConfig } from '../config';
import { NavConfigProps, NavListProps, NavSectionProps } from '../type';
import { NavList } from './navList';

export const NavSectionMini = ({ data, sx, ...props }: NavSectionProps) => {
  return (
    <Stack sx={sx} {...props}>
      {data.map((group, index) => (
        <Group key={index} items={group.items} config={navMiniConfig()} />
      ))}
    </Stack>
  );
};

type GroupProps = {
  items: NavListProps[];
  config: NavConfigProps;
};

const Group = ({ items, config }: GroupProps) => {
  return (
    <>
      {items.map((list) => (
        <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} config={config} />
      ))}
    </>
  );
};
