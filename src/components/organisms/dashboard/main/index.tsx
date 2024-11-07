import { Box, BoxProps } from '@mui/material';

import { HEADER, NAV } from '@/constants/app';
import { useSettingsContext } from '@/context/settings';
import { useResponsive } from '@/hooks/useResponsive';

const SPACING = 8;

export const Main = ({ children, sx, ...other }: BoxProps) => {
  const settings = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');
  const isNavMini = settings.themeLayout === 'mini';

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.W_VERTICAL}px)`,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI}px)`,
          }),
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
};
