import { useQuery } from '@/hooks/useQuery';
import { getSummoner } from '@/services/api/get-summoner';
import { useAppSelector } from '@/stores/hooks';

export const useLogic = () => {
  const tagLine = '1910';
  const gameName = 'Thánh Chỉ Tới';
  const { champions, version } = useAppSelector((state) => state.common);

  const { data, isLoading } = useQuery({
    apiConfig: getSummoner,
    payload: {
      tagLine,
      gameName,
    },
    options: {
      queryKey: [tagLine, gameName],
    },
  });

  return { data, isLoading, champions, version };
};
