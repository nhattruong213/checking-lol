import { type NextRequest } from 'next/server';

import { API_KEY } from '@/constants/app';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get('page')) || 0;
  const perPage = Number(searchParams.get('perpage')) || 10;
  const queue = searchParams.get('queue') ?? 'RANKED_SOLO_5x5';

  try {
    const topPlayersFetch = await fetch(`https://vn2.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}?api_key=${API_KEY}`, {
      next: { revalidate: 3600 },
    }).then((response) => response.json());

    const topPlayers = topPlayersFetch.entries;
    const total = topPlayers.length;
    const startIndex = page * perPage;
    const endIndex = page * perPage + perPage;

    const paginatedPlayers = topPlayers.slice(startIndex, endIndex);
    const enrichedData = await Promise.all(
      paginatedPlayers.map(async (player: any, index: number) => {
        const puidFetch = await fetch(`https://vn2.api.riotgames.com/lol/summoner/v4/summoners/${player.summonerId}?api_key=${API_KEY}`, {
          next: { revalidate: 3600, tags: [player.summonerId] },
        }).then((res) => res.json());
        const { puuid, profileIconId, summonerLevel } = puidFetch;

        const [gameName, championMasteries] = await Promise.all([
          fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${puuid}?api_key=${API_KEY}`, {
            next: { revalidate: 3600, tags: [puuid] },
          }).then((res) => res.json()),
          fetch(`https://vn2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${API_KEY}`, {
            next: { revalidate: 3600, tags: [puuid] },
          }).then((res) => res.json()),
        ]);
        const favoriteChampion = championMasteries.slice(0, 3).map((champion: any) => ({
          championId: champion.championId,
        }));

        return {
          ...player,
          puuid,
          id: startIndex + index + 1,
          profileIconId,
          summonerLevel,
          gameName: gameName.gameName,
          tagLine: gameName.tagLine,
          favoriteChampion,
        };
      })
    );

    return Response.json({ data: enrichedData, recordsTotal: total });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
