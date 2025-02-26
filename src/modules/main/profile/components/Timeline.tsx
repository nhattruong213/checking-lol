import { Box } from '@mui/material';

import { useTimeline } from '../hooks/useTimeline';
import { processTimelineData } from '../utils';
import { ItemPurchases } from './ItemPurchases';
import { SkillOrder } from './SkillOrder';

type TProps = {
  matchId: string;
  puuid: string;
};
export const Timeline = (props: TProps) => {
  const { matchId, puuid } = props;
  const { data } = useTimeline(matchId);

  if (!data) return <p>{'Loading...'}</p>;

  const { skillOrder, itemPurchases } = processTimelineData(data, puuid);

  return (
    <Box mt={4}>
      <SkillOrder skillOrder={skillOrder} />
      <Box mt={4}>
        <ItemPurchases itemPurchases={itemPurchases} />
      </Box>
    </Box>
  );
};
