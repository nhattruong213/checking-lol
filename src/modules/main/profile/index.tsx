'use client';

import { alpha, Container, Grid, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';

import { MotionViewport } from '@/components/atoms/animate/motion-viewport';
import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { LoadingScreen } from '@/components/molecules/loading';
import { MainLayout } from '@/components/organisms/main';
import { useResponsive } from '@/hooks/useResponsive';
import { bgGradient } from '@/styles/theme/css';

import { History } from './components/History';
import { RankPoint } from './components/RankPoint';
import { useLogic } from './hooks/useLogic';
import { TRankPoint } from './type';

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
}));

export const Profile = ({ gameName }: { gameName: string }) => {
  const { data, version, isLoading, rankPoints, isLoadingRankPoints } = useLogic(gameName);
  const mdDown = useResponsive('down', 'md');

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
        <StyledRoot>
          <Container component={MotionViewport} sx={{ height: 1 }}>
            <Stack sx={{ width: 1, mb: 2 }}>
              <Card
                sx={{
                  mt: 2,
                  py: 4,
                  pl: 3,
                  borderRadius: 0,
                }}
              >
                <Box display="flex" alignItems="center">
                  <Box sx={{ position: 'relative' }}>
                    <AvatarCustom
                      size={mdDown ? 'xl' : 'xxl'}
                      type="outlined"
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data?.profileIconId}.png`}
                    />
                    <Stack
                      sx={(theme) => ({
                        borderRadius: 10,
                        px: 0.5,
                        fontSize: 12,
                        background: theme.palette.primary.lighter,
                        color: theme.palette.common.black,
                        position: 'absolute',
                        top: mdDown ? 67 : 88,
                        right: mdDown ? 23 : 33,
                      })}
                    >
                      {data?.summonerLevel}
                    </Stack>
                  </Box>
                  <Box sx={{ ml: 1.5 }}>
                    <Typography sx={{ lineHeight: 1.2 }} variant="h3">
                      {data?.gameName}
                    </Typography>
                    <Typography variant="h5">
                      {'#'}
                      {data?.tagLine}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Stack>
            <Grid container spacing={2} pb={5}>
              <Grid item xs={12} md={4}>
                <Stack marginBottom={1}>
                  <RankPoint
                    loading={isLoadingRankPoints}
                    title="RANK ĐƠN"
                    rankPoint={rankPoints?.find((ranked: TRankPoint) => ranked.queueType === 'RANKED_SOLO_5x5')}
                  />
                </Stack>
                <RankPoint
                  loading={isLoadingRankPoints}
                  title="RANK LINH HOẠT"
                  rankPoint={rankPoints?.find((ranked: TRankPoint) => ranked.queueType === 'RANKED_FLEX_SR')}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <History puuid={data?.puuid} />
              </Grid>
            </Grid>
          </Container>
        </StyledRoot>
      </Box>
    </MainLayout>
  );
};
