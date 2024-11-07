import { useCallback } from 'react';

import { useAppDispatch } from '@/stores/hooks';
import { authAction } from '@/stores/reducers/auth';

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback(() => {
    dispatch(authAction.resetUser());
  }, []);

  return { logout };
};
