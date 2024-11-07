import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useQuery } from '@/hooks/useQuery';
import { AuthInfoRes } from '@/schemas/auth/infoRes';
import { info } from '@/services/api/info';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';

export const useLogic = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  // user info
  useQuery({
    apiConfig: info,
    responseSchema: AuthInfoRes,
    options: {
      queryKey: [],
    },
    onSuccess: ({ data }) => {
      dispatch(authAction.setUser(data || null));
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
      router.push('/auth/login');
    },
  });

  useEffect(() => {
    if (user.data) {
      setIsLoading(false);
    }
  }, [user]);

  return { isLoading };
};
