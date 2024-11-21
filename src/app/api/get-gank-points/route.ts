import { type NextRequest } from 'next/server';

import { API_KEY } from '@/constants/app';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const summonerId = searchParams.get('summonerId') ?? '';

  try {
    const rankPoints = await fetch(`https://vn2.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`, {
      next: { revalidate: 3600, tags: [summonerId] },
    }).then((response) => response.json());

    return Response.json(rankPoints);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
