import { Profile } from '@/modules/main/profile';

export default async function Page({ params }: { params: Promise<{ gameName: string }> }) {
  const gameName = decodeURIComponent((await params).gameName);

  return <Profile gameName={gameName} />;
}
