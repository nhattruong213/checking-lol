'use client';

import { alpha, Container, Grid, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';

import { MotionViewport } from '@/components/atoms/animate/motion-viewport';
import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { LoadingScreen } from '@/components/molecules/loading';
import { MainLayout } from '@/components/organisms/main';
import { bgGradient } from '@/styles/theme/css';

import { useLogic } from './hooks/useLogic';

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
}));

export const Profile = () => {
  const { data, version, isLoading } = useLogic();

  return (
    <MainLayout>
      {isLoading && <LoadingScreen />}
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container component={MotionViewport} sx={{ height: 1 }}>
          <Stack sx={{ width: 1, mb: 2 }}>
            <StyledRoot>
              <Box sx={{ mt: 4, mb: 3.5, pl: 3 }} display="flex" alignItems="center">
                <AvatarCustom
                  size="xxl"
                  type="outlined"
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data?.profileIconId}.png`}
                />
                <Box sx={{ ml: 1.5 }}>
                  <Box display="flex" alignItems="end">
                    <Typography sx={{ lineHeight: 1.2 }} variant="h3">
                      {data?.gameName}
                    </Typography>
                    <Typography variant="h5">
                      {'#'}
                      {data?.tagLine}
                    </Typography>
                  </Box>
                  <Typography variant="body1">{`Level ${data?.summonerLevel}`}</Typography>
                </Box>
              </Box>
            </StyledRoot>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 1.2, height: 100 }}></Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 1.2, height: 400 }}></Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </MainLayout>
  );
};
