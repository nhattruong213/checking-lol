import { alpha, Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { Card } from '@/components/atoms/card';
import { Iconify } from '@/components/atoms/iconify';

export const AnalysisMatch = ({ matches, puuid }: { matches: any; puuid: string }) => {
  const totalMatches = matches.length;

  const wins = matches.filter((match: any) => {
    const { info } = match;
    const { participants } = info;
    const summoner = participants?.find((summoner: any) => summoner.puuid === puuid);

    return summoner?.win;
  }).length;

  const losses = totalMatches - wins;

  const winRate = ((wins / totalMatches) * 100).toFixed(2);

  const kdaStats = matches.reduce(
    (acc: any, match: any) => {
      const { info } = match;
      const { participants } = info;
      const summoner = participants?.find((summoner: any) => summoner.puuid === puuid);
      if (summoner) {
        acc.kills += summoner.kills;
        acc.deaths += summoner.deaths;
        acc.assists += summoner.assists;
      }

      return acc;
    },
    { kills: 0, deaths: 0, assists: 0 }
  );

  const avgKills = (kdaStats.kills / totalMatches).toFixed(2);
  const avgDeaths = (kdaStats.deaths / totalMatches).toFixed(2);
  const avgAssists = (kdaStats.assists / totalMatches).toFixed(2);
  const kda = ((kdaStats.kills + kdaStats.assists) / kdaStats.deaths).toFixed(2);

  const roleCounts = matches.reduce((acc: any, match: any) => {
    const { info } = match;
    const { participants } = info;
    const summoner = participants?.find((summoner: any) => summoner.puuid === puuid);
    if (summoner) {
      acc[summoner.teamPosition] = (acc[summoner.teamPosition] || 0) + 1;
    }

    return acc;
  }, {});

  const maxRoleCount = Math.max(...(Object.values(roleCounts) as number[]), 1);

  const rolePercentages = Object.entries(roleCounts).map(([role, count]) => ({
    role,
    percentage: Math.round(((count as number) / maxRoleCount) * 100),
  }));

  const rolesData = [
    { role: 'TOP', src: '/assets/position/top.png' },
    { role: 'JUNGLE', src: '/assets/position/jungle.png' },
    { role: 'MIDDLE', src: '/assets/position/mid.png' },
    { role: 'BOTTOM', src: '/assets/position/ad.png' },
    { role: 'UTILITY', src: '/assets/position/sup.png' },
  ];

  return (
    <Card sx={{ borderRadius: 0, p: 2 }}>
      <Box display="flex" alignItems="center">
        <Iconify icon="mdi-light:chart-line"></Iconify>
        <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
          {'Trận Đấu Gần Đây'}
        </Typography>
      </Box>
      <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1">{`${wins}W - ${losses}L`}</Typography>
        <Typography variant="subtitle1">{`WR: ${winRate} %`}</Typography>
      </Box>

      <Typography mt={1} variant="h4">
        {kda} {'KDA'}
      </Typography>
      <Typography variant="body1">
        {'Average:'} {avgKills} {'/'} {avgDeaths} {'/'} {avgAssists}
      </Typography>

      <Box mt={2}>
        <Typography variant="h6">{'Vai Trò Yêu Thích'}</Typography>
        <Box display="flex" alignItems="flex-end" justifyContent="space-around" mt={2}>
          {rolesData.map(({ role, src }) => {
            const roleData = rolePercentages.find((r) => r.role === role) || { percentage: 0 };

            return (
              <Box key={role} textAlign="center">
                <Box
                  sx={{
                    height: 150,
                    width: 20,
                    backgroundColor: '#e0e0e0',
                    position: 'relative',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      height: `${roleData.percentage}%`,
                      width: '100%',
                      backgroundColor: theme.palette.primary.main,
                      position: 'absolute',
                      bottom: 0,
                    })}
                  />
                </Box>
                <Stack mt={2}>
                  <Image src={src} alt={role} width={16} height={16} />
                </Stack>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Card>
  );
};
