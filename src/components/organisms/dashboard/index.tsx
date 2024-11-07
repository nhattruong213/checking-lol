'use client';

import { Box, Container } from '@mui/material';

import { useSettingsContext } from '@/context/settings';
import { useBoolean } from '@/hooks/useBoolean';
import { useResponsive } from '@/hooks/useResponsive';

import { Header } from './header';
import { Main } from './main';
import { NavMini } from './navMini';
import { NavVertical } from './navVertical';

type Props = {
  children: React.ReactNode;
};

export const DashBoardLayout = ({ children }: Props) => {
  const settings = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');
  const { onFalse, value, onTrue } = useBoolean();

  const isMini = settings.themeLayout === 'mini';

  const renderNavVertical = <NavVertical openNav={value} onCloseNav={onFalse} />;
  const renderNavMini = <NavMini />;

  if (isMini) {
    return (
      <>
        <Header onOpenNav={onTrue} />
        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {lgUp ? renderNavMini : renderNavVertical}
          <Main>
            <Container maxWidth={'xl'}>{children}</Container>
          </Main>
        </Box>
      </>
    );
  }

  return (
    <>
      <Header onOpenNav={onTrue} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {renderNavVertical}
        <Main>
          <Container maxWidth={'xl'}>{children}</Container>
        </Main>
      </Box>
    </>
  );
};
