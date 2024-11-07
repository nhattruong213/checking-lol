import ListItemButton from '@mui/material/ListItemButton';
import { alpha, styled } from '@mui/material/styles';

import { NavItemMobileProps } from '../types';

// ----------------------------------------------------------------------

type ListItemProps = Omit<NavItemMobileProps, 'item'>;

export const ListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<ListItemProps>(({ active, theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 48,
  // Active
  ...(active && {
    color: theme.palette.primary.main,
    ...theme.typography.subtitle2,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
}));
