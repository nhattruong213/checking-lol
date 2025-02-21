import { useQuery } from '@/hooks/useQuery';
import { getRanksPoint } from '@/services/api/get-rank-points';
import { getRunnes } from '@/services/api/get-runnes';
import { getSummoner } from '@/services/api/get-summoner';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { runnesAction } from '@/stores/reducers/runnes';

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

  const dispatch = useAppDispatch();

  useQuery({
    apiConfig: getRunnes,
    options: {
      queryKey: [version],
      staleTime: 24 * 60 * 60 * 1000,
    },
    onSuccess: ({ data }) => {
      dispatch(runnesAction.setData(data || null));
    },
  });

  return { data, isLoading, champions, version, rankPoints, isLoadingRankPoints };
};
