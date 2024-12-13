import { alpha, Box, Skeleton, Typography } from '@mui/material';

import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { Iconify } from '@/components/atoms/iconify';
import { useAppSelector } from '@/stores/hooks';

type ChampionStats = {
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  gamesPlayed: number;
  kda?: string;
};

export const TopChampions = ({ matches, puuid }: { matches: any; puuid: string }) => {
  const { version } = useAppSelector((state) => state.common);
  if (!matches) {
    return (
      <Card sx={{ borderRadius: 0, p: 2 }}>
        <Box display="flex" alignItems="center">
          <Iconify icon="hugeicons:champion"></Iconify>
          <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
            {'Top 3 Tướng Chơi Nhiều Nhất'}
          </Typography>
        </Box>
        <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>

        <Skeleton variant="text" width={150} />
        <Skeleton variant="rectangular" height={60} sx={{ mt: 1 }} />
        <Skeleton variant="text" width={100} />
        <Skeleton variant="rectangular" height={60} sx={{ mt: 1 }} />
      </Card>
    );
  }

  const championStats: { [key: string]: ChampionStats } = matches.reduce((acc: any, match: any) => {
    const { info } = match;
    const { participants } = info;

    participants.forEach((summoner: any) => {
      const { puuid: summonerPuuid, championName, kills, deaths, assists, win } = summoner;
      if (summonerPuuid === puuid) {
        if (!acc[championName]) {
          acc[championName] = {
            wins: 0,
            losses: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            gamesPlayed: 0,
          };
        }

        acc[championName].gamesPlayed++;
        acc[championName].kills += kills;
        acc[championName].deaths += deaths;
        acc[championName].assists += assists;
        if (win) acc[championName].wins++;
        else acc[championName].losses++;
      }
    });

    return acc;
  }, {});

  const championList = Object.entries(championStats)
    .map(([championName, stats]) => ({
      championName,
      ...stats,
      kda: ((stats.kills + stats.assists) / stats.deaths).toFixed(2),
    }))
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed);

  const topChampions = championList.slice(0, 3);

  return (
    <Card sx={{ borderRadius: 0, p: 2 }}>
      <Box display="flex" alignItems="center">
        <Iconify icon="hugeicons:champion"></Iconify>
        <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
          {'Top 3 Tướng Chơi Nhiều Nhất'}
        </Typography>
      </Box>
      <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>

      {topChampions.map((champion: any) => (
        <Box key={champion.championName} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <AvatarCustom src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.championName}.png`} />

          <Typography ml={2}>{`${champion.wins}W - ${champion.losses}L`}</Typography>
          <Typography sx={(theme) => ({ color: theme.palette.primary.main })} ml={2}>{`${champion.kda} KDA`}</Typography>
        </Box>
      ))}
    </Card>
  );
};
