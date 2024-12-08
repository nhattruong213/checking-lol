import { useDebounce } from '@/hooks/useDebounce';
import { useQuery } from '@/hooks/useQuery';
import { suggestName } from '@/services/api/suggest-name';
import { useAppSelector } from '@/stores/hooks';

export const useSuggest = (searchParam?: string) => {
  const { version } = useAppSelector((state) => state.common);

  const debouncedSearchParam = useDebounce(searchParam, 500);

  const { data: account } = useQuery({
    apiConfig: suggestName,
    payload: {
      gameName: debouncedSearchParam,
    },
    options: {
      queryKey: [debouncedSearchParam],
      staleTime: 24 * 60 * 60 * 1000,
      enabled: !!debouncedSearchParam,
    },
  });

  return { account, version };
};
