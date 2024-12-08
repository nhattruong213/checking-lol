import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get('gameName') ?? '';
  const tags = `${search}#`;

  const [gameName, tagLine] = search.split('#').map((part) => part.trim());
  const url = new URL(`https://lol-web-api.op.gg/api/v1.0/internal/bypass/summoners/v2/vn/autocomplete`);
  url.searchParams.set('gameName', gameName);
  if (tagLine) {
    url.searchParams.set('tagline', tagLine);
  }

  try {
    const accountList = await fetch(url, {
      next: { revalidate: 3600, tags: [tags] },
    }).then((response) => response.json());

    const filteredAccounts = accountList.data?.map((account: any) => {
      return {
        id: account.id,
        summoner_id: account.summoner_id,
        puuid: account.puuid,
        game_name: account.game_name,
        tagline: account.tagline,
        name: account.name,
        profile_icon: account.profile_image_url?.match(/profileIcon(\d+)/)?.[1],
        level: account.level,
        solo_tier_info: account.solo_tier_info && {
          tier: account.solo_tier_info.tier,
          division: account.solo_tier_info.division,
          lp: account.solo_tier_info.lp,
          level: account.solo_tier_info.level,
        },
      };
    });

    return Response.json(filteredAccounts);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
