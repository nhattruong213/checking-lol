import { useQuery } from '@/hooks/useQuery';
import { suggestName } from '@/services/api/suggest-name';
import { useAppSelector } from '@/stores/hooks';

export const useSuggest = (searchParam?: string) => {
  const { version } = useAppSelector((state) => state.common);

  const { data: account } = useQuery({
    apiConfig: suggestName,
    payload: {
      gameName: searchParam,
    },
    options: {
      queryKey: [searchParam],
      staleTime: 24 * 60 * 60 * 1000,
      enabled: !!searchParam,
    },
  });

  return { account, version };
};
