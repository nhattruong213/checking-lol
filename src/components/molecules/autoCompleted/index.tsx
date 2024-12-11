import { alpha, Box, List, ListItem, ListItemButton, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { Label } from '@/components/atoms/label';
import { SimpleBarScroll } from '@/components/atoms/simpleBar';
import { TIER } from '@/constants/app';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TAcount {
  id: number;
  summoner_id: string;
  puuid: string;
  game_name: string;
  tagline: string;
  name: string;
  profile_icon: string;
  level: number;
  solo_tier_info: Solotierinfo;
}

interface Solotierinfo {
  tier: string;
  division: number;
  lp: number;
  level: null;
}
const STORAGE_KEY = 'recent_search_results';
const initState = {
  data: [
    {
      id: 597001,
      summoner_id: 'Ms-gVliMiCQ3iXN1isXC98DmvUJVo_DEE_SDxdbNiIt599BKSJW6ovogjQ',
      puuid: 'uR08mAGOK5iZ3JMshXspRR0OU3RPOcsunT9sgEW_oFE__TqvsphDyRkUIDsE-AMXK9s8-9SDvKEx2Q',
      game_name: 'Thầy Hùng Bry',
      tagline: '8888',
      name: 'Vũ Hà Linh',
      profile_icon: '6635',
      level: 1253,
      solo_tier_info: {
        tier: 'GRANDMASTER',
        division: 1,
        lp: 293,
        level: null,
      },
    },
  ],
};

export const AutoComplated = ({ account, version }: { account?: TAcount[]; version: string }) => {
  const router = useRouter();
  const theme = useTheme();
  const { state, update } = useLocalStorage(STORAGE_KEY, initState);

  const handleRedirect = (account: TAcount) => {
    const updatedAccounts = [account, ...(state.data?.filter((item: TAcount) => item.puuid !== account.puuid) || [])];
    const recentAccounts = updatedAccounts.slice(0, 3);

    update('data', recentAccounts);

    router.push(`/profile/${encodeURIComponent(`${account.game_name}#${account.tagline}`)}`);
  };

  const data = account ? account : state.data;

  return (
    <Card sx={{ width: 1, position: 'absolute', top: 80, left: 0, borderRadius: 1 }}>
      <Label sx={{ height: 35, m: 1.5, mb: 0, background: theme.palette.primary.lighter }}>{'Tìm kiếm lịch sử bằng cách: GameName#tagline'}</Label>
      <Box>
        <List sx={{ width: 1, maxHeight: 210, py: 0 }}>
          <SimpleBarScroll>
            <Box p={1.5}>
              {data?.map((item: TAcount, index: number) => {
                return (
                  <ListItem sx={(theme) => ({ p: 0, borderBottom: '1px solid', borderColor: alpha(theme.palette.grey[500], 0.08) })} key={index}>
                    <ListItemButton
                      onClick={() => {
                        handleRedirect(item);
                      }}
                      sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarCustom
                          type="outlined"
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${item?.profile_icon}.png`}
                        />
                        <Box>
                          <Box sx={{ display: 'flex', ml: 0.5 }}>
                            <Typography>{item?.game_name}</Typography>
                            <Typography sx={{ lineHeight: 1.7, ml: 0.3 }} variant="body2">{`#${item?.tagline}`}</Typography>
                          </Box>
                          <Typography sx={{ lineHeight: 1.7, ml: 0.5 }} variant="body2">{`level ${item?.level}`}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                        <Typography sx={{ lineHeight: 1.7 }} variant="body2">
                          {TIER[item?.solo_tier_info?.tier as keyof typeof TIER]}
                        </Typography>
                        <Typography sx={{ lineHeight: 1.7 }} variant="body2">{`lp ${item?.solo_tier_info?.lp ?? ''}`}</Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </Box>
          </SimpleBarScroll>
        </List>
      </Box>
    </Card>
  );
};
