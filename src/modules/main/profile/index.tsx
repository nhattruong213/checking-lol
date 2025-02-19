'use client';

import { alpha, Button, Container, Grid, Typography } from '@mui/material';
import { Box, Stack, styled } from '@mui/system';

import { MotionViewport } from '@/components/atoms/animate/motion-viewport';
import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { Tab, Tabs } from '@/components/atoms/tabs';
import { LoadingScreen } from '@/components/molecules/loading';
import { MainLayout } from '@/components/organisms/main';
import { QUEUE_OPTIONS } from '@/constants/app';
import { useResponsive } from '@/hooks/useResponsive';
import { bgGradient } from '@/styles/theme/css';

import { AnalysisMatch } from './components/AnalysisMatch';
import { AnalysisSkeleton } from './components/AnalysisSkeleton';
import { Match } from './components/Match';
import { MatchSkeleton } from './components/MatchSkeleton';
import { RankPoint } from './components/RankPoint';
import { TopChampions } from './components/TopChampions';
import { useLogic } from './hooks/useLogic';
import { useMatch } from './hooks/useMatch';
import { TMatch, TRankPoint } from './type';

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
}));

export const Profile = ({ gameName }: { gameName: string }) => {
  const mdDown = useResponsive('down', 'md');
  const smd = useResponsive('between', 700, 'md');

  const { data, version, isLoading, rankPoints, isLoadingRankPoints } = useLogic(gameName);
  const { matches, isLoadingMatches, queueId, handleChangeQueue, handleLoadMore } = useMatch(data?.puuid);

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
                sx={(theme) => ({
                  mt: 2,
                  py: 4,
                  pl: 3,
                  borderRadius: 0,
                  ...bgGradient({
                    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
                    imgUrl: '/assets/background/overlay_3.jpg',
                  }),
                })}
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

            {mdDown && (
              <Box sx={{ display: 'flex', flexDirection: smd ? 'row' : 'column', gap: smd ? 1 : 0 }}>
                <Stack width={smd ? '50%' : 1} marginBottom={1}>
                  <RankPoint
                    loading={isLoadingRankPoints}
                    title="RANK ĐƠN"
                    rankPoint={rankPoints?.find((ranked: TRankPoint) => ranked.queueType === 'RANKED_SOLO_5x5')}
                  />
                </Stack>
                <Stack width={smd ? '50%' : 1} marginBottom={1}>
                  <RankPoint
                    loading={isLoadingRankPoints}
                    title="RANK LINH HOẠT"
                    rankPoint={rankPoints?.find((ranked: TRankPoint) => ranked.queueType === 'RANKED_FLEX_SR')}
                  />
                </Stack>
              </Box>
            )}
            <Stack>
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile={true}
                value={queueId}
                onChange={handleChangeQueue}
                sx={{
                  px: 2.5,
                  boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                }}
              >
                {QUEUE_OPTIONS.map((queue) => (
                  <Tab key={queue.queueId} value={queue.queueId} label={queue.description} />
                ))}
              </Tabs>
              <Stack sx={{ borderBottom: '1', mb: 2 }} />
            </Stack>
            <Grid container spacing={1} pb={5}>
              <Grid item xs={12} md={4}>
                {!mdDown && (
                  <>
                    <Stack marginBottom={1}>
                      <RankPoint
                        loading={isLoadingRankPoints}
                        title="RANK ĐƠN"
                        rankPoint={rankPoints?.find((ranked: TRankPoint) => ranked.queueType === 'RANKED_SOLO_5x5')}
                      />
                    </Stack>
                    <Stack marginBottom={1}>
                      <RankPoint
                        loading={isLoadingRankPoints}
                        title="RANK LINH HOẠT"
                        rankPoint={rankPoints?.find((ranked: TRankPoint) => ranked.queueType === 'RANKED_FLEX_SR')}
                      />
                    </Stack>
                  </>
                )}

                <Box sx={{ display: 'flex', flexDirection: smd ? 'row' : 'column', gap: smd ? 1 : 0 }}>
                  <Stack width={smd ? '50%' : 1} marginBottom={1}>
                    {!matches ? <AnalysisSkeleton /> : <AnalysisMatch matches={matches} puuid={data?.puuid} />}
                  </Stack>
                  <Stack width={smd ? '50%' : 1} marginBottom={1}>
                    <TopChampions matches={matches} puuid={data?.puuid} />
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 1, borderRadius: 0, pt: 1 }}>
                  {matches.length == 0 && isLoadingMatches ? (
                    <MatchSkeleton />
                  ) : (
                    matches?.map((match: TMatch, key: number) => {
                      return <Match key={key} match={match} version={version} puuid={data?.puuid} />;
                    })
                  )}

                  {matches.length > 0 && isLoadingMatches && <MatchSkeleton itemCount={5} />}

                  <Box sx={{ display: 'flex', justifyContent: 'center', width: 1, mt: 2 }}>
                    <Button onClick={handleLoadMore} sx={{ width: 200 }} variant="outlined">
                      {'Tải thêm'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </StyledRoot>
      </Box>
    </MainLayout>
  );
};
