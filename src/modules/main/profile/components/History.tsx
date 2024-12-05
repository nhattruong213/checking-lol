import { alpha, Stack } from '@mui/material';
import { useCallback, useState } from 'react';

import { Card } from '@/components/atoms/card';
import { Tab, Tabs } from '@/components/atoms/tabs';
import { QUEUE_OPTIONS } from '@/constants/app';
import { useAppSelector } from '@/stores/hooks';

import { useMatch } from '../hooks/useMatch';
import { Match } from './Match';
import { MatchSkeleton } from './MatchSkeleton';

export const History = ({ puuid }: { puuid?: string }) => {
  const [queueId, setQueueId] = useState<string | number>('all');
  const { matches, isLoadingMatches } = useMatch(puuid, queueId);
  const { version } = useAppSelector((state) => state.common);

  const handleChangeQueue = useCallback(
    (event: React.SyntheticEvent, newValue: string | number) => {
      setQueueId(newValue);
    },
    [setQueueId]
  );

  return (
    <Card sx={{ p: 1, borderRadius: 0, pt: 0.3 }}>
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
      {isLoadingMatches ? (
        <MatchSkeleton />
      ) : (
        matches?.map((match: any, key: string) => {
          return <Match key={key} match={match} version={version} puuid={puuid} />;
        })
      )}
    </Card>
  );
};
