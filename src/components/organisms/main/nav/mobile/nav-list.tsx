import Collapse from '@mui/material/Collapse';
import { listClasses } from '@mui/material/List';
import { listItemButtonClasses } from '@mui/material/ListItemButton';
import { listItemTextClasses } from '@mui/material/ListItemText';
import { usePathname } from 'next/navigation';

import { NavSectionVertical } from '@/components/organisms/dashboard/navVertical/navSectionVertical';
import { useBoolean } from '@/hooks/useBoolean';

import { NavItemProps } from '../types';
import { NavItem } from './nav-item';

type NavListProps = {
  item: NavItemProps;
};

export const NavList = ({ item }: NavListProps) => {
  const pathname = usePathname();

  const { path, children } = item;

  const externalLink = path.includes('http');

  const nav = useBoolean();

  return (
    <>
      <NavItem item={item} open={nav.value} onClick={nav.onToggle} active={pathname === path} externalLink={externalLink} />

      {!!children && (
        <Collapse in={nav.value} unmountOnExit>
          <NavSectionVertical
            data={children}
            sx={{
              [`& .${listClasses.root}`]: {
                '&:last-of-type': {
                  [`& .${listItemButtonClasses.root}`]: {
                    height: 160,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    bgcolor: 'background.neutral',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: 'url(/assets/illustrations/illustration_dashboard.png)',
                    [`& .${listItemTextClasses.root}`]: {
                      display: 'none',
                    },
                  },
                },
              },
            }}
          />
        </Collapse>
      )}
    </>
  );
};
