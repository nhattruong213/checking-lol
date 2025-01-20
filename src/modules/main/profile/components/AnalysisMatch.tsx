import { alpha, Box, Stack, Typography, useTheme } from '@mui/material';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import Image from 'next/image';
import { Doughnut } from 'react-chartjs-2';

import { Card } from '@/components/atoms/card';
import { Iconify } from '@/components/atoms/iconify';

import { Participant, TMatch } from '../type';
ChartJS.register(ArcElement, Tooltip, Legend);

interface IKDAStats {
  kills: number;
  deaths: number;
  assists: number;
}

interface IRoleCounts {
  [key: string]: number;
}

export const AnalysisMatch = ({ matches, puuid }: { matches: TMatch[]; puuid: string }) => {
  const totalMatches = matches.length;
  const theme = useTheme();
  const wins = matches.filter((match: TMatch) => {
    const { info } = match;
    const { participants } = info;
    const summoner = participants?.find((summoner: Participant) => summoner.puuid === puuid);

    return summoner?.win;
  }).length;

  const losses = totalMatches - wins;

  const winRate = ((wins / totalMatches) * 100).toFixed(2);

  const kdaStats = matches.reduce(
    (acc: IKDAStats, match: TMatch) => {
      const { info } = match;
      const { participants } = info;
      const summoner = participants?.find((summoner: Participant) => summoner.puuid === puuid);
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

  const roleCounts = matches.reduce((acc: IRoleCounts, match: TMatch) => {
    const { info } = match;
    const { participants } = info;
    const summoner = participants?.find((summoner: Participant) => summoner.puuid === puuid);
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

  const donutData = {
    labels: ['Thắng', 'Thua'],
    datasets: [
      {
        data: [wins, losses],
        backgroundColor: [theme.palette.primary.main, '#e0e0e0'],
        borderWidth: 1,
        cutout: '70%',
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Card sx={{ borderRadius: 0, p: 2, height: '100%' }}>
      <Box display="flex" alignItems="center">
        <Iconify icon="mdi-light:chart-line"></Iconify>
        <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
          {'Trận Đấu Gần Đây'}
        </Typography>
      </Box>
      <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box width={'40%'}>
          <Typography whiteSpace={'nowrap'} variant="subtitle2">{`${totalMatches} trận gần đây`}</Typography>
          <Box sx={{ position: 'relative', height: 100, width: 100, mt: 2 }}>
            <Doughnut data={donutData} options={donutOptions} />
            <Typography sx={{ position: 'absolute', top: 40, right: 25 }} variant="overline">{`${winRate} %`}</Typography>
          </Box>
          <Box display="flex" mt={1} flexDirection="column">
            <Typography variant="subtitle2">
              {kda} {'KDA'}
            </Typography>
            <Typography variant="caption">{`${avgKills}/${avgDeaths}/${avgAssists}`}</Typography>
          </Box>
        </Box>
        <Box width={'60%'}>
          <Typography whiteSpace={'nowrap'} textAlign={'center'} variant="subtitle2">
            {'Vai Trò Yêu Thích'}
          </Typography>
          <Box display="flex" alignItems="flex-end" justifyContent="space-around" mt={2}>
            {rolesData.map(({ role, src }) => {
              const roleData = rolePercentages.find((r) => r.role === role) || { percentage: 0 };

              return (
                <Box key={role} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box
                    sx={{
                      height: 100,
                      width: 8,
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
      </Box>
    </Card>
  );
};
