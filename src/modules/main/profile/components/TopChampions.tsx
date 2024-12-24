import { alpha, Box, Skeleton, Typography } from '@mui/material';

import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { Iconify } from '@/components/atoms/iconify';
import { useAppSelector } from '@/stores/hooks';

import { Participant, TMatch } from '../type';

type ChampionStats = {
  wins: number;
  losses: number;
  kills: number;
  deaths: number;
  assists: number;
  gamesPlayed: number;
  kda?: string;
  cs: number;
};

type ChampionStatsMap = {
  [key: string]: ChampionStats;
};

interface ChampionListItem extends ChampionStats {
  championName: string;
  kda: string;
  avg: string;
  csAvg: string;
}

export const TopChampions = ({ matches, puuid }: { matches: TMatch[]; puuid: string }) => {
  const { version } = useAppSelector((state) => state.common);
  if (!matches) {
    return (
      <Card sx={{ borderRadius: 0, p: 2, height: '100%' }}>
        <Box display="flex" alignItems="center">
          <Iconify icon="mynaui:chart-line"></Iconify>
          <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
            {'Chơi Nhiều Nhất Gần Đây'}
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

  const championStats: { [key: string]: ChampionStats } = matches.reduce((acc: ChampionStatsMap, match: TMatch) => {
    const { info } = match;
    const { participants } = info;

    participants.forEach((summoner: Participant) => {
      const { puuid: summonerPuuid, championName, kills, deaths, assists, win, totalMinionsKilled, neutralMinionsKilled } = summoner;
      if (summonerPuuid === puuid) {
        if (!acc[championName]) {
          acc[championName] = {
            wins: 0,
            losses: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            gamesPlayed: 0,
            cs: 0,
          };
        }

        acc[championName].gamesPlayed++;
        acc[championName].kills += kills;
        acc[championName].deaths += deaths;
        acc[championName].assists += assists;
        acc[championName].cs += totalMinionsKilled + neutralMinionsKilled;
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
      avg: `${(stats.kills / stats.gamesPlayed).toFixed(1)}/${(stats.deaths / stats.gamesPlayed).toFixed(1)}/${(
        stats.assists / stats.gamesPlayed
      ).toFixed(1)}`,
      csAvg: (stats.cs / stats.gamesPlayed).toFixed(1),
    }))
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed);

  const topChampions: ChampionListItem[] = championList.slice(0, 4);

  return (
    <Card sx={{ borderRadius: 0, p: 2, height: '100%' }}>
      <Box display="flex" alignItems="center">
        <Iconify icon="mynaui:chart-line"></Iconify>
        <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
          {'Chơi Nhiều Nhất Gần Đây'}
        </Typography>
      </Box>
      <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>

      {topChampions.map((champion: ChampionListItem) => (
        <Box key={champion.championName} sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box display={'flex'} alignItems={'center'}>
            <AvatarCustom src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.championName}.png`} />
            <Box ml={1}>
              <Typography lineHeight={1} variant="subtitle2">
                {champion.championName}
              </Typography>
              <Typography variant="caption">{`${champion.gamesPlayed} game`}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <Typography lineHeight={1} variant="subtitle2">{`${champion.wins}W - ${champion.losses}L`}</Typography>
            <Typography variant="caption">{champion.avg}</Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
            <Typography
              lineHeight={1}
              variant="subtitle2"
              sx={(theme) => ({ color: theme.palette.primary.main })}
            >{`${champion.kda} KDA`}</Typography>
            <Typography variant="caption">{`${champion.csAvg} CS`}</Typography>
          </Box>
        </Box>
      ))}
    </Card>
  );
};
