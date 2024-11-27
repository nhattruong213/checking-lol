import { useQuery } from '@/hooks/useQuery';
import { getRanksPoint } from '@/services/api/get-rank-points';
import { getSummoner } from '@/services/api/get-summoner';
import { useAppSelector } from '@/stores/hooks';

export const useLogic = (gameName: string) => {
  const [name, tagLine] = gameName.split('#').map((part) => part.trim());

  const { champions, version } = useAppSelector((state) => state.common);

  const { data, isLoading } = useQuery({
    apiConfig: getSummoner,
    payload: {
      tagLine,
      gameName: name,
    },
    options: {
      queryKey: [tagLine, gameName],
    },
  });

  const { data: rankPoints, isLoading: isLoadingRankPoints } = useQuery({
    apiConfig: getRanksPoint,
    payload: {
      summonerId: data?.id,
    },
    options: {
      queryKey: [data?.id],
      enabled: !!data,
    },
  });

  return { data, isLoading, champions, version, rankPoints, isLoadingRankPoints };
};
