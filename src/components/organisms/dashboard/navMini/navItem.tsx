import { Link as LinkMui, ListItemText, useTheme } from '@mui/material';
import Link from 'next/link';
import { forwardRef } from 'react';

import { Iconify } from '@/components/atoms/iconify';

import { NavConfigProps, NavItemProps } from '../type';
import { StyledIcon, StyledItem } from './style';

type Props = NavItemProps & {
  config: NavConfigProps;
};

export const NavItem = forwardRef<HTMLDivElement, Props>(({ item, open, depth, active, config, ...props }, ref) => {
  const { title, path, icon, children } = item;
  const theme = useTheme();
  const subItem = depth !== 1;
  const renderContent = (
    <StyledItem disableGutters open={open} depth={depth} active={active} config={config} ref={ref} {...props}>
      {icon && (
        <StyledIcon
          size={config.iconSize}
          sx={{
            ...(subItem && { mr: 1.5 }),
          }}
        >
          {icon}
        </StyledIcon>
      )}

      <ListItemText
        sx={{
          width: 1,
          flex: 'unset',
          ...(!subItem && {
            px: 0.5,
            mt: 0.5,
          }),
        }}
        primary={title}
        primaryTypographyProps={{
          noWrap: true,
          fontSize: 10,
          lineHeight: '16px',
          textAlign: 'center',
          textTransform: 'capitalize',
          fontWeight: active ? 'fontWeightBold' : 'fontWeightSemiBold',
          ...(subItem && {
            textAlign: 'unset',
            fontSize: theme.typography.body2.fontSize,
            lineHeight: theme.typography.body2.lineHeight,
            fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
          }),
        }}
      />

      {!!children && (
        <Iconify
          width={16}
          icon="eva:arrow-ios-forward-fill"
          sx={{
            top: 11,
            right: 6,
            position: 'absolute',
          }}
        />
      )}
    </StyledItem>
  );

  return (
    <LinkMui component={Link} href={path} underline="none" color="inherit">
      {renderContent}
    </LinkMui>
  );
});

NavItem.displayName = 'NavItem';
