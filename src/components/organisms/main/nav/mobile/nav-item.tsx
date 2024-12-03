import { Link as LinkMui } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

import { Iconify } from '@/components/atoms/iconify';

import { NavItemMobileProps } from '../types';
import { ListItem } from './styles';

export const NavItem = ({ item, open, active, externalLink, ...other }: NavItemMobileProps) => {
  const { title, path, icon, children } = item;

  const renderContent = (
    <ListItem active={active} {...other}>
      <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}> {icon} </ListItemIcon>

      <ListItemText disableTypography primary={title} />

      {!!children && <Iconify width={16} icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'} sx={{ ml: 1 }} />}
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

  // Default
  return (
    <LinkMui component={Link} href={path} underline="none">
      {renderContent}
    </LinkMui>
  );
};
