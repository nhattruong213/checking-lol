'use client';

import { Collapse, List, Stack } from '@mui/material';
import { useCallback, useState } from 'react';

import { navVerticalConfig } from '../config';
import { GroupProps, NavSectionProps } from '../type';
import { NavList } from './navList';
import { StyledSubheader } from './styledSubHeader';

export const NavSectionVertical = ({ data, sx, ...props }: NavSectionProps) => {
  return (
    <Stack sx={sx} {...props}>
      {data.map((group, index) => (
        <Group key={index} subheader={group.subheader} items={group.items} config={navVerticalConfig()} />
      ))}
    </Stack>
  );
};

const Group = ({ subheader, items, config }: GroupProps) => {
  const [open, setOpen] = useState(true);
  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((list) => (
    <NavList key={list.title + list.path} data={list} depth={1} hasChild={!!list.children} config={config} />
  ));

  return (
    <List disablePadding sx={{ px: 2 }}>
      {subheader ? (
        <>
          <StyledSubheader disableGutters disableSticky onClick={handleToggle} config={config}>
            {subheader}
          </StyledSubheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        renderContent
      )}
    </List>
  );
};
