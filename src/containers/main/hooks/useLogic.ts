import { useQuery } from '@/hooks/useQuery';
import { getDrragon } from '@/services/api/version';
import { useAppDispatch } from '@/stores/hooks';
import { commonAction } from '@/stores/reducers/common';

export const useLogic = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useQuery({
    apiConfig: getDrragon,
    options: {
      queryKey: [],
      staleTime: 24 * 60 * 60 * 1000,
    },
    onSuccess: ({ data }) => {
      dispatch(commonAction.setData(data || null));
    },
  });

  return { loading: isLoading };
};
