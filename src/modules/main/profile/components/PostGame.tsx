import { Box, useTheme } from '@mui/material';

import { SvgColor } from '@/components/atoms/svgColor';
import { bgGradient } from '@/styles/theme/css';

import { Info, Participant, TFinalParticipants } from '../type';
import { getKDA } from '../utils';
import { TeamInfo } from './TeamInfo';

type TProp = {
  matchInfo: Info;
};

type TNewParticipants = Participant & {
  kda: number;
};

export const PostGame = (props: TProp) => {
  const { matchInfo } = props;
  const { participants, teams } = matchInfo;

  const newParticipants: TNewParticipants[] = participants.map((p) => {
    return {
      ...p,
      kda: Number(getKDA(p.kills, p.deaths, p.assists)),
    };
  });
  const sortedByKDA = [...newParticipants].sort((a, b) => b.kda - a.kda);
  const rankMap = new Map(sortedByKDA.map((player, index) => [player.puuid, index + 1]));
  const finalParticipants = newParticipants.map((p) => ({
    ...p,
    rankPosition: rankMap.get(p.puuid) as number,
  }));
  const maxDamage = Math.max(...finalParticipants.map((p) => p.totalDamageDealtToChampions));
  const playerWins: TFinalParticipants[] = finalParticipants.filter((player: TFinalParticipants) => player.win);
  const playerLoses: TFinalParticipants[] = finalParticipants.filter((player: TFinalParticipants) => !player.win);
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 1,
        ...bgGradient({
          direction: '90.21deg',
          startColor: 'rgba(45, 145, 210, 0.1)',
          endColor: 'rgba(120, 65, 233, 0.1)',
        }),
      }}
    >
      <Box pt={2}>
        <TeamInfo maxDamage={maxDamage} name={'Team 1'} team={teams[0]} players={teams[0].win ? playerWins : playerLoses} />
      </Box>
      <Box px={5} py={1}>
        <SvgColor sx={{ width: '100%', color: theme.palette.primary.main }} src="/assets/match/strack.svg" />
      </Box>
      <TeamInfo maxDamage={maxDamage} name={'Team 2'} team={teams[1]} players={teams[1].win ? playerWins : playerLoses} />
    </Box>
  );
};
