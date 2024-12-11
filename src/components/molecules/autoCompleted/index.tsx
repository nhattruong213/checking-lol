import { alpha, Box, List, ListItem, ListItemButton, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { Label } from '@/components/atoms/label';
import { SimpleBarScroll } from '@/components/atoms/simpleBar';
import { TIER } from '@/constants/app';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { SkeletonSuggest } from './SkeletonSuggest';

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
const initState = {};

export const AutoComplated = ({
  account,
  version,
  searchValue,
  isLoading,
}: {
  account?: TAcount[];
  version: string;
  searchValue?: string;
  isLoading: boolean;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { state, update } = useLocalStorage(STORAGE_KEY, initState);

  const handleRedirect = (account: TAcount) => {
    const updatedAccounts = [account, ...(state.data?.filter((item: TAcount) => item.puuid !== account.puuid) || [])];
    const recentAccounts = updatedAccounts.slice(0, 3);

    update('data', recentAccounts);

    router.push(`/profile/${encodeURIComponent(`${account.game_name}#${account.tagline}`)}`);
  };

  const data = searchValue ? account : state.data;

  return (
    <Card sx={{ width: 1, position: 'absolute', top: 80, left: 0, borderRadius: 1 }}>
      <Label sx={{ height: 35, m: 1.5, mb: 0 }}>{'Tìm kiếm lịch sử bằng cách: GameName#tagline'}</Label>
      <Box>
        <List sx={{ width: 1, height: 200, py: 0 }}>
          <SimpleBarScroll>
            <Box p={1.5}>
              {isLoading && <SkeletonSuggest />}
              {data?.map((item: TAcount, index: number) => {
                return (
                  <ListItem sx={(theme) => ({ p: 0, borderBottom: '1px solid', borderColor: alpha(theme.palette.grey[500], 0.08) })} key={index}>
                    <ListItemButton
                      onClick={() => {
                        handleRedirect(item);
                      }}
                      sx={{ p: 0.8, display: 'flex', justifyContent: 'space-between' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarCustom
                          type="outlined"
                          src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${item?.profile_icon}.png`}
                        />
                        <Box>
                          <Box sx={{ display: 'flex', ml: 0.8 }}>
                            <Typography>{item?.game_name}</Typography>
                            <Typography sx={{ ml: 0.3, color: theme.palette.grey[500] }} variant="body2">{`#${item?.tagline}`}</Typography>
                          </Box>
                          <Typography sx={{ ml: 0.8 }} variant="body2">{`Level ${item?.level}`}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                        <Typography variant="body2">{TIER[item?.solo_tier_info?.tier as keyof typeof TIER]}</Typography>
                        <Typography variant="body2">{`LP ${item?.solo_tier_info?.lp ?? ''}`}</Typography>
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
