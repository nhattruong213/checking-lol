import { useQuery } from '@/hooks/useQuery';
import { getFreeChampions } from '@/services/api/free-champion';

export const useLogic = () => {
  const { data } = useQuery({
    apiConfig: getFreeChampions,
    options: {
      queryKey: [],
      staleTime: 24 * 60 * 60 * 1000,
    },
  });

  return { freeChampionIds: data?.freeChampionIds };
};
