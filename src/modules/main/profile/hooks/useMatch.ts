import { useState } from 'react';

import { useQuery } from '@/hooks/useQuery';
import { getMatchs } from '@/services/api/get-matchs';

import { TMatch } from '../type';

export const useMatch = (puuid?: string) => {
  const [matches, setMatches] = useState<TMatch[]>([]);
  const [queueId, setQueueId] = useState<string | number>('all');
  const [start, setStart] = useState(0);
  const [count, setCount] = useState(10);

  const { isLoading: isLoadingMatches } = useQuery({
    apiConfig: getMatchs,
    payload: {
      puuid: puuid,
      queueId: queueId,
      start: start,
      count: count,
    },
    options: {
      queryKey: [puuid, queueId, start, count],
      enabled: !!puuid,
    },
    onSuccess: ({ data }) => {
      setMatches((prevMatches) => (start === 0 ? data : [...prevMatches, ...data]));
    },
  });

  const handleLoadMore = () => {
    setStart(count);
    setCount(5);
  };

  const handleChangeQueue = (event: React.SyntheticEvent, newValue: string | number) => {
    setQueueId(newValue);
    setStart(0);
    setCount(10);
  };

  return { matches, isLoadingMatches, queueId, handleLoadMore, handleChangeQueue };
};
