import { Link as LinkMui, ListItemText } from '@mui/material';
import Link from 'next/link';

import { Iconify } from '@/components/atoms/iconify';

import { NavConfigProps, NavItemProps } from '../type';
import { StyledDotIcon, StyledIcon, StyledItem } from './style';

type Props = NavItemProps & {
  config: NavConfigProps;
};
export const NavItem = ({ item, open, depth, active, config, ...props }: Props) => {
  const { title, path, icon, children } = item;
  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem disableGutters open={open} depth={depth} active={active} config={config} {...props}>
      <>
        {icon && <StyledIcon size={config.iconSize}>{icon}</StyledIcon>}
        {subItem && (
          <StyledIcon size={config.iconSize}>
            <StyledDotIcon active={active} />
          </StyledIcon>
        )}
      </>

      <ListItemText
        primary={title}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'body2',
          textTransform: 'capitalize',
          fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
        }}
        secondaryTypographyProps={{
          noWrap: true,
          component: 'span',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />

      {!!children && (
        <Iconify
          width={16}
          icon="eva:arrow-ios-forward-fill"
          sx={{
            top: 14,
            right: 6,
            position: 'absolute',
          }}
        />
      )}
    </StyledItem>
  );

  if (children) {
    return renderContent;
  }

  return (
    <LinkMui component={Link} href={path} underline="none" color="inherit">
      {renderContent}
    </LinkMui>
  );
};
