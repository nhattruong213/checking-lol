import { alpha, Box, Skeleton, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import { Card } from '@/components/atoms/card';
import { Iconify } from '@/components/atoms/iconify';
import { TIER } from '@/constants/app';

import { TRankPoint } from '../type';

export const RankPoint = ({ rankPoint, title, loading }: { rankPoint?: TRankPoint; title: string; loading: boolean }) => {
  const rankText = rankPoint ? `${TIER[rankPoint?.tier]} ${rankPoint?.rank}` : 'Unranked';
  const src = rankPoint ? `/assets/tier/${rankPoint.tier}.png` : '/assets/tier/rank-unranked.png';
  let winrate = 0;

  if (rankPoint && rankPoint.losses && rankPoint.wins) {
    winrate = (rankPoint.wins / (rankPoint.wins + rankPoint.losses)) * 100;
  }

  return (
    <Card sx={{ p: 2, borderRadius: 0, height: 1 }}>
      <Box display="flex" alignItems="center">
        <Iconify icon="game-icons:rank-3"></Iconify>
        <Typography sx={{ ml: 1 }} variant="subtitle1">
          {title}
        </Typography>
      </Box>
      <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          {loading ? <Skeleton variant="rectangular" width={80} height={80} /> : <Image alt="tier" width={80} height={80} src={src} />}
          <Stack sx={{ ml: 1 }}>
            {loading ? (
              <>
                <Skeleton variant="text" width={120} height={24} />
                <Skeleton variant="text" width={60} height={20} />
              </>
            ) : (
              <>
                <Typography variant="subtitle1">{rankText}</Typography>
                <Typography variant="body2">
                  {rankPoint?.leaguePoints ?? 0} {'LP'}
                </Typography>
              </>
            )}
          </Stack>
        </Box>
        <Box>
          {loading ? (
            <>
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={100} height={20} />
            </>
          ) : (
            <>
              <Typography variant="body2">{`${rankPoint?.wins ?? 0}W - ${rankPoint?.losses ?? 0}L`}</Typography>
              <Typography variant="body2">{`${winrate.toFixed(1)}% Win rate`}</Typography>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
};
