import { useQuery } from '@/hooks/useQuery';
import { getTimeLine } from '@/services/api/time-line';

export const useTimeline = (matchId: string) => {
  const { data, isLoading } = useQuery({
    apiConfig: getTimeLine,
    payload: {
      matchId,
    },
    options: {
      queryKey: [matchId],
    },
  });

  return { data, isLoading };
};
