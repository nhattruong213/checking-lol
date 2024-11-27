import { useQuery } from '@/hooks/useQuery';
import { getMatchs } from '@/services/api/get-matchs';

export const useMatch = (puuid?: string, queueId?: string | number) => {
  const { data: matches, isLoading: isLoadingMatches } = useQuery({
    apiConfig: getMatchs,
    payload: {
      puuid: puuid,
      queueId: queueId,
    },
    options: {
      queryKey: [puuid, queueId],
      enabled: !!puuid,
    },
  });

  return { matches, isLoadingMatches };
};
