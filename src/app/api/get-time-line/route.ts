import { type NextRequest } from 'next/server';

import { API_KEY } from '@/constants/app';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const matchId = searchParams.get('matchId') || '';
  try {
    const timeLine = await fetch(`https://sea.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${API_KEY}`, {
      next: { tags: [matchId] },
    }).then((response) => response.json());

    return Response.json({ ...timeLine });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
