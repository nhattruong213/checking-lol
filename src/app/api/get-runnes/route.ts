import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const version = searchParams.get('version') ?? '15.2.1';

  const fetchData = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/runesReforged.json`);
  const runnes = await fetchData.json();

  return Response.json({ runnes: runnes });
}
