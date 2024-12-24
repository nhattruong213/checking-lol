import { type NextRequest } from 'next/server';

import { API_KEY } from '@/constants/app';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const start = searchParams.get('start') ?? 0;
  const count = searchParams.get('count') ?? 10;
  const puuid = searchParams.get('puuid');
  const queueId = searchParams.get('queueId') ?? 'all';
  const queryQueue = queueId != 'all' ? `queue=${queueId}&` : '';
  try {
    const matches = await fetch(
      `https://sea.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?${queryQueue}start=${start}&count=${count}&api_key=${API_KEY}`
    ).then((response) => response.json());

    const enrichedData = await Promise.all(
      matches.map(
        async (match: string) =>
          await fetch(`https://sea.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${API_KEY}`, {
            next: { revalidate: 900, tags: [match] },
          }).then((response) => response.json())
      )
    );

    return Response.json(enrichedData);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
