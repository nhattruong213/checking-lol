import { API_KEY } from '@/constants/app';

export async function GET() {
  const apiKey = API_KEY;
  const res = await fetch(`https://vn2.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apiKey}`, {
    next: { revalidate: 86400 },
  });
  const { freeChampionIds } = await res.json();

  return Response.json({ freeChampionIds });
}
