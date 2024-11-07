export async function GET() {
  const versions = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`, {
    next: { revalidate: 86400 },
  });

  const data = await versions.json();
  const latest = data[0];

  const ddragon = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`);
  const champions = await ddragon.json();

  const championJson = champions['data'];

  const result = Object.values(championJson).reduce((acc: Record<string, string>, champion: any) => {
    acc[champion.key] = champion.id;

    return acc;
  }, {});

  return Response.json({ champions: result, version: latest });
}
