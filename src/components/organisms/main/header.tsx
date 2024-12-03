import { Toolbar, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { AppBar } from '@/components/atoms/appBar';
import { HeaderShadow } from '@/components/atoms/headerShadow';
import { LoginButton } from '@/components/atoms/loginButton';
import { Logo } from '@/components/atoms/logo';
import { SettingsButton } from '@/components/molecules/settingButton';
import { HEADER } from '@/constants/app';
import { useOffSetTop } from '@/hooks/useOffSetTop';
import { useResponsive } from '@/hooks/useResponsive';
import { bgBlur } from '@/styles/theme/css';

import { navConfig } from './config-navigation';
import { NavDesktop } from './nav/desktop/nav-desktop';
import { NavMobile } from './nav/mobile/nav-mobile';

// ----------------------------------------------------------------------

export const Header = () => {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          backgroundColor: 'transparent',
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            backgroundImage: 'none',
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo sx={{ ml: 2 }} />

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {mdUp && <LoginButton />}

            <SettingsButton />

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
};
