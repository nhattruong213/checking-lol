import { useQuery } from '@/hooks/useQuery';
import { getMatchs } from '@/services/api/get-matchs';

export const useMatch = (puuid?: string) => {
  const { data: matches, isLoading: isLoadingMatches } = useQuery({
    apiConfig: getMatchs,
    payload: {
      puuid: puuid,
    },
    options: {
      queryKey: [puuid],
      enabled: !!puuid,
    },
  });

  return { matches, isLoadingMatches };
};
