import { Link as LinkMui, LinkProps } from '@mui/material';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import { m } from 'framer-motion';
import Link from 'next/link';
import { forwardRef } from 'react';

import { Iconify } from '@/components/atoms/iconify';

import { NavItemDesktopProps, NavItemProps } from '../types';
import { ListItem } from './styles';

export const NavItem = forwardRef<HTMLDivElement, NavItemDesktopProps>(({ item, open, offsetTop, active, subItem, externalLink, ...other }, ref) => {
  const { title, path, children } = item;

  const renderContent = (
    <ListItem ref={ref} disableRipple offsetTop={offsetTop} subItem={subItem} active={active} open={open} {...other}>
      {title}

      {!!children && <Iconify width={16} icon="eva:arrow-ios-downward-fill" sx={{ ml: 1 }} />}
    </ListItem>
  );

  // External link
  if (externalLink) {
    return (
      <LinkMui href={path} target="_blank" rel="noopener" underline="none">
        {renderContent}
      </LinkMui>
    );
  }

  // Has child
  if (children) {
    return renderContent;
  }

  return (
    <LinkMui component={Link} href={path} underline="none">
      {renderContent}
    </LinkMui>
  );
});

NavItem.displayName = 'NavItem';

// ----------------------------------------------------------------------

interface NavItemDashboardProps extends LinkProps {
  item: NavItemProps;
}

export const NavItemDashboard = ({ item, sx, ...other }: NavItemDashboardProps) => {
  return (
    <LinkMui component={Link} href={item.path} sx={{ width: 1 }} {...other}>
      <CardActionArea
        sx={{
          py: 5,
          px: 10,
          minHeight: 400,
          borderRadius: 1.5,
          color: 'text.disabled',
          bgcolor: 'background.neutral',
          ...sx,
        }}
      >
        <m.div
          whileTap="tap"
          whileHover="hover"
          variants={{
            hover: { scale: 1.02 },
            tap: { scale: 0.98 },
          }}
        >
          <Box component="img" alt="illustration_dashboard" src="/assets/illustrations/illustration_dashboard.png" />
        </m.div>
      </CardActionArea>
    </LinkMui>
  );
};
