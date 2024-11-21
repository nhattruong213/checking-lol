import { QUEUE_TYPE } from '@/constants/app';

export const getGameMode = (id: number) => {
  const gameMode = QUEUE_TYPE.find((que) => que.queueId === id);

  return gameMode?.description || 'Normal Draft';
};

export const convertToMinutes = (gameDuration: number) => {
  return `${Math.floor(gameDuration / 60)} phút`;
};

export const getKDA = (kills: number, deaths: number, assists: number) => {
  if (deaths === 0) {
    deaths = 1;
  }

  return ((kills + assists) / deaths).toFixed(1) || 0;
};
