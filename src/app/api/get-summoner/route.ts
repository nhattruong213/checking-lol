import { type NextRequest } from 'next/server';

import { API_KEY } from '@/constants/app';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const tagLineSearch = searchParams.get('tagLine');
  const gameNameSearch = searchParams.get('gameName');
  const tags = `${gameNameSearch}#${tagLineSearch}`;

  try {
    const account = await fetch(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameNameSearch}/${tagLineSearch}?api_key=${API_KEY}`,
      {
        next: { revalidate: 3600, tags: [tags] },
      }
    ).then((response) => response.json());

    const summoners = await fetch(`https://vn2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${account.puuid}?api_key=${API_KEY}`, {
      next: { revalidate: 3600, tags: [account.puuid] },
    }).then((response) => response.json());

    return Response.json({ ...account, ...summoners });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
