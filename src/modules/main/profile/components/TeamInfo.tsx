import { alpha, Box, Chip, Stack, Typography } from '@mui/material';

import { SvgColor } from '@/components/atoms/svgColor';

import { Team, TFinalParticipants } from '../type';
import { TeamItemInfo } from './TeamItemInfo';

type TProp = {
  players: TFinalParticipants[];
  team: Team;
  name: string;
  maxDamage: number;
};
export const TeamInfo = (props: TProp) => {
  const { players, team, name, maxDamage } = props;
  const color = team.win ? '#2d91d2' : alpha('rgb(188, 64, 79)', 1);
  const { totalKills, totalDeaths, totalAssists, totalGold } = players.reduce(
    (totals, player) => ({
      totalKills: totals.totalKills + player.kills,
      totalDeaths: totals.totalDeaths + player.deaths,
      totalAssists: totals.totalAssists + player.assists,
      totalGold: totals.totalGold + player.goldEarned,
    }),
    { totalKills: 0, totalDeaths: 0, totalAssists: 0, totalGold: 0 }
  );

  return (
    <Box sx={{ w: 1 }}>
      <Box display="flex" flexWrap="wrap" alignItems="center" gap={2} px={2} pb={1}>
        <Typography variant="body2" fontWeight="bold" sx={{ textTransform: 'uppercase', color: color }}>
          {name}
        </Typography>

        <Chip
          label={team.win ? 'win' : 'loss'}
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            backgroundColor: team.win ? 'rgba(83, 164, 240, 0.3)' : 'rgba(255, 0, 0, 0.2)',
            color: color,
            borderRadius: 1,
          }}
        />

        <Stack direction="row" gap={{ xs: 2, md: 4 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <SvgColor sx={{ width: 13, height: 13, color: color }} src="/assets/match/sword.svg" />
            <Typography variant="body2" fontWeight="bold" sx={{ textTransform: 'uppercase', color: color, fontSize: 13 }}>
              {`${totalKills}/${totalDeaths}/${totalAssists}`}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <SvgColor sx={{ color: color }} src="/assets/match/good.svg" />
            <Typography variant="body2" fontWeight="bold" sx={{ textTransform: 'uppercase', color: color, fontSize: 13 }}>
              {`${(totalGold / 1000).toFixed(1)}K`}
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <Box display="flex" alignItems="center" gap={1} sx={{ color: color }}>
              <SvgColor sx={{ color: color }} src="/assets/match/baron.svg" />
              <Typography fontSize={13} variant="body2">
                {team.objectives.baron.kills}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} sx={{ color: color }}>
              <SvgColor sx={{ color: color }} src="/assets/match/dragon.svg" />
              <Typography fontSize={13} variant="body2">
                {team.objectives.dragon.kills}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} sx={{ color: color }}>
              <SvgColor sx={{ color: color, height: 20 }} src="/assets/match/tower.svg" />
              <Typography fontSize={13} variant="body2">
                {team.objectives.tower.kills}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box p={1}>
        {players.map((player: TFinalParticipants, index: number) => (
          <Box key={index}>
            <TeamItemInfo maxDamage={maxDamage} player={player} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
