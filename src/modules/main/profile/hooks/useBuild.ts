import { useAppSelector } from '@/stores/hooks';

export const useBuild = () => {
  const { runnes } = useAppSelector((state) => state.runnes);
  const { version } = useAppSelector((state) => state.common);

  return { runnes, version };
};
