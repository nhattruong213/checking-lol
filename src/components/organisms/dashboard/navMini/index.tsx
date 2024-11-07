import { Box, Stack } from '@mui/material';

import { Logo } from '@/components/atoms/logo';
import { NavToggleButton } from '@/components/molecules/navToggleButton';
import { NAV } from '@/constants/app';

import { useNavData } from '../hooks/useNavData';
import { NavSectionMini } from './navSectionMini';

export const NavMini = () => {
  const navData = useNavData();

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 32,
          left: NAV.W_MINI - 12,
        }}
      />
      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Logo sx={{ mt: 3, ml: 3, mb: 1 }} />
        <Box
          sx={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <NavSectionMini data={navData} />
        </Box>
      </Stack>
    </Box>
  );
};
