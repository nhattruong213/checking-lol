import { Box, Drawer, Stack } from '@mui/material';

import { Logo } from '@/components/atoms/logo';
import { SimpleBarScroll } from '@/components/atoms/simpleBar';
import { NavToggleButton } from '@/components/molecules/navToggleButton';
import { NAV } from '@/constants/app';
import { useResponsive } from '@/hooks/useResponsive';

import { useNavData } from '../hooks/useNavData';
import { NavSectionVertical } from './navSectionVertical';

type NavProps = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};
export const NavVertical = (props: NavProps) => {
  const { openNav, onCloseNav } = props;
  const lgUp = useResponsive('up', 'lg');
  const navData = useNavData();

  const renderContent = (
    <>
      <Logo sx={{ mt: 3, ml: 3, mb: 1, width: 160, height: 160 }} />
      <SimpleBarScroll>
        <NavSectionVertical data={navData} />
        <Box sx={{ flexGrow: 1 }} />
      </SimpleBarScroll>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      <NavToggleButton />

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};
