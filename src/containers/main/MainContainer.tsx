'use client';

import { LoadingScreen } from '@/components/molecules/loading';

import { useLogic } from './hooks/useLogic';

export const MainComponent = ({ children }: React.PropsWithChildren) => {
  const { loading } = useLogic();

  return loading ? <LoadingScreen /> : children;
};
