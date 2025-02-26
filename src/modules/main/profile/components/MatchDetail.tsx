import { Box, Button, useTheme } from '@mui/material';
import { useState } from 'react';

import { Card } from '@/components/atoms/card';

import { Info } from '../type';
import { Build } from './Build';
import { PostGame } from './PostGame';

type TProp = {
  matchInfo: Info;
  puuid: string;
  matchId: string;
};
export const MatchDetail = (props: TProp) => {
  const { matchInfo, puuid, matchId } = props;
  const [active, setActive] = useState('postGame');
  const handleSetActive = (tab: string) => {
    setActive(tab);
  };
  const theme = useTheme();

  return (
    <Card sx={{ width: 1, mb: 1, borderRadius: 1, borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
      <Box sx={{ display: 'flex', alignItem: 'center', background: '#42b4ff1a' }}>
        <Button
          sx={{
            width: '33.33%',
            borderRadius: 0,
            backgroundColor: active === 'postGame' ? theme.palette.primary.main : 'transparent',
            '&:hover': {
              backgroundColor: active === 'postGame' ? theme.palette.primary.main : 'transparent',
            },
            color: active === 'postGame' ? '#fff' : theme.palette.primary.main,
            boxShadow: 'unset',
          }}
          variant="contained"
          onClick={() => handleSetActive('postGame')}
        >
          {'Post Game'}
        </Button>
        <Button
          sx={{
            width: '33.33%',
            borderRadius: 0,
            backgroundColor: active === 'build' ? theme.palette.primary.main : 'transparent',
            '&:hover': {
              backgroundColor: active === 'build' ? theme.palette.primary.main : 'transparent',
            },
            color: active === 'build' ? '#fff' : theme.palette.primary.main,
            boxShadow: 'unset',
          }}
          variant="contained"
          onClick={() => handleSetActive('build')}
        >
          {'Build'}
        </Button>
        <Button
          sx={{
            width: '33.33%',
            borderRadius: 0,
            backgroundColor: active === 'teamAnalysis' ? theme.palette.primary.main : 'transparent',
            '&:hover': {
              backgroundColor: active === 'teamAnalysis' ? theme.palette.primary.main : 'transparent',
            },
            boxShadow: 'unset',
            color: active === 'teamAnalysis' ? '#fff' : theme.palette.primary.main,
          }}
          variant="contained"
          onClick={() => handleSetActive('teamAnalysis')}
        >
          {'Analysis'}
        </Button>
      </Box>
      {active === 'postGame' && <PostGame matchInfo={matchInfo} />}
      {active === 'build' && <Build matchId={matchId} matchInfo={matchInfo} puuid={puuid} />}
    </Card>
  );
};
