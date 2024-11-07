'use client';

import { LoadingScreen } from '@/components/molecules/loading';

import { useLogic } from './useLogic';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLogic();

  return isLoading ? <LoadingScreen /> : children;
};
