import { AppBar, Badge, Box, IconButton, Toolbar, useTheme } from '@mui/material';

import { Iconify } from '@/components/atoms/iconify';
import { SvgColor } from '@/components/atoms/svgColor';
import { Language } from '@/components/molecules/language';
import { SettingsButton } from '@/components/molecules/settingButton';
import { HEADER, NAV } from '@/constants/app';
import { useSettingsContext } from '@/context/settings';
import { useResponsive } from '@/hooks/useResponsive';
import { bgBlur } from '@/styles/theme/css';

type Props = {
  onOpenNav?: VoidFunction;
};

export const Header = ({ onOpenNav }: Props) => {
  const theme = useTheme();

  const settings = useSettingsContext();

  const isNavMini = settings.themeLayout === 'mini';

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav}>
          <SvgColor src="/assets/icons/ic_menu_item.svg" />
        </IconButton>
      )}
      <Box sx={{ flexGrow: 1 }} />
      <Language />
      <SettingsButton />
      <Box>
        <Badge badgeContent={2} color="error">
          <IconButton sx={{ width: 45, height: 45 }}>
            <Iconify icon="solar:bell-bing-bold-duotone" width={24} />
          </IconButton>
        </Badge>
      </Box>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        boxShadow: 'none',
        backgroundImage: 'none',
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.W_VERTICAL + 1}px)`,
          height: HEADER.H_DESKTOP,
          ...(isNavMini && {
            width: `calc(100% - ${NAV.W_MINI + 1}px)`,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
};
