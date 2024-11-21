import { TIER } from '@/constants/app';

export type TRankPoint = {
  rank: string;
  leaguePoints: number;
  losses: number;
  tier: keyof typeof TIER;
  wins: number;
  queueType: string;
};
