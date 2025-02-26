import { QUEUE_TYPE } from '@/constants/app';

import { ItemEvent, SkillEvent, TimelineData } from '../type';

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

export const processTimelineData = (data: any, puuid: string): TimelineData => {
  const skillOrder: SkillEvent[] = [];
  const itemPurchases: ItemEvent[] = [];

  // Lấy danh sách participantId từ PUUID
  const participants = data.metadata.participants;
  const participantId = participants.indexOf(puuid) + 1; // Riot bắt đầu ID từ 1

  if (participantId === 0) return { skillOrder, itemPurchases };

  data.info.frames.forEach((frame: any) => {
    frame.events.forEach((event: any) => {
      if (event.participantId === participantId) {
        const minute = Math.floor(event.timestamp / 60000); // Chuyển timestamp thành phút
        if (event.type === 'SKILL_LEVEL_UP') {
          skillOrder.push({
            skillSlot: event.skillSlot,
            levelUpType: event.levelUpType,
            timestamp: minute,
          });
        }

        if (event.type === 'ITEM_PURCHASED') {
          itemPurchases.push({
            itemId: event.itemId,
            timestamp: minute,
          });
        }
      }
    });
  });

  return { skillOrder, itemPurchases };
};
