import { Box, Chip, Link as LinkMui, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { AvatarCustom } from '@/components/atoms/avatar';
import { SvgColor } from '@/components/atoms/svgColor';
import { runes, summonerSpell } from '@/constants/app';
import { useResponsive } from '@/hooks/useResponsive';
import { useAppSelector } from '@/stores/hooks';

import { TFinalParticipants } from '../type';

type TProp = {
  player: TFinalParticipants;
  maxDamage: number;
};

export const TeamItemInfo = (props: TProp) => {
  const { player, maxDamage } = props;
  const { version } = useAppSelector((state) => state.common);
  const { item0, item1, item2, item3, item4, item5, item6 } = player;
  const itemsArray = [item0, item1, item2, item3, item4, item5, item6];
  const theme = useTheme();
  const widthDamage = (player.totalDamageDealtToChampions / maxDamage) * 100;
  const mdUp = useResponsive('up', 800);
  const smDown = useResponsive('down', 'sm');
  const seDown = useResponsive('down', 400);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        p: 0.5,
        mb: 0.5,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: smDown ? 'column' : 'row', gap: 1, alignItems: smDown ? 'start' : 'center' }}>
        <Box sx={{ display: 'flex', flexShrink: 0, gap: 1 }}>
          <Box sx={{ position: 'relative' }}>
            <AvatarCustom alt="champion" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championName}.png`} />
            <Box
              sx={{
                position: 'absolute',
                bottom: -2,
                left: -5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: 'black',
                border: 1,
                borderColor: 'purple.main',
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '10px', color: 'white' }}>
                {player.champLevel}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box mb={0.5} display="flex">
              <Image
                alt="spell"
                width={20}
                height={20}
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpell[player.summoner1Id]}`}
              />
              <Stack sx={{ ml: 0.5 }}>
                <Image
                  alt="spell"
                  width={20}
                  height={20}
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpell[player.summoner2Id]}`}
                />
              </Stack>
            </Box>
            <Box width={45} display="flex">
              <Image
                alt={`runnes ${runes[player.perks.styles[0].selections[0].perk]}`}
                width={20}
                height={20}
                src={`https://ddragon.leagueoflegends.com/cdn/img/${runes[player.perks.styles[0].selections[0].perk]}`}
              />
              <Stack sx={{ ml: 0.5 }}>
                <Image
                  alt="spell"
                  width={25}
                  height={25}
                  src={`https://ddragon.leagueoflegends.com/cdn/img/${runes[player.perks.styles[1].selections[0].perk]}`}
                />
              </Stack>
            </Box>
          </Box>
          <Box display={'flex'} flexDirection={'column'} ml={1}>
            <LinkMui
              component={Link}
              href={`/profile/${encodeURIComponent(`${player.riotIdGameName}#${player.riotIdTagline}`)}`}
              sx={{
                fontSize: 15,
                fontWeight: 'bold',
                textDecoration: 'unset',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: 90,
              }}
            >
              {player.riotIdGameName}
            </LinkMui>

            <Chip
              label={player.rankPosition === 1 ? 'MVP' : `${player.rankPosition}nd`}
              sx={{
                width: 36,
                height: 25,
                px: 0,
                backgroundColor: player.rankPosition === 1 ? 'rgb(255 186 21/1)' : '#588de378',
                borderRadius: 1,
                '.MuiChip-label': {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
                fontWeight: 600,
                fontSize: player.rankPosition === 1 ? 11 : 13,
              }}
            />
          </Box>
        </Box>
        <Box display="flex" alignItems={'center'} width={smDown ? 200 : 235} height={25}>
          {itemsArray.map((item, index) => {
            if (item !== 0) {
              return (
                <Box width={smDown ? 27 : 32} key={index} mr={0.2}>
                  <Image
                    alt={`item ${index + 1}`}
                    width={32}
                    height={32}
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
                  />
                </Box>
              );
            }
          })}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: mdUp ? 'row' : 'column', gap: mdUp ? 3 : 1 }}>
        <Box display={'flex'} gap={seDown ? 1 : 2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: 60 }}>
            <Typography
              sx={{ whiteSpace: 'nowrap', fontSize: smDown ? 12 : 14 }}
              variant="subtitle2"
            >{`${player.kills} / ${player.deaths} / ${player.assists}`}</Typography>
            <Typography sx={{ fontSize: smDown ? 12 : 14 }} variant="subtitle2">{`${player.kda}  KDA`}</Typography>
          </Box>

          {!seDown && (
            <Box width={60}>
              <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', fontSize: smDown ? 12 : 14 }}>
                {`${player.totalMinionsKilled + player.neutralMinionsKilled} CS`}
              </Typography>

              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap', fontSize: smDown ? 12 : 14 }}>
                  {`${(player.goldEarned / 1000).toFixed(1)}K`}
                </Typography>
                <SvgColor src="/assets/match/good.svg" />
              </Box>
            </Box>
          )}
        </Box>

        <Box flexGrow={1}>
          <Typography sx={{ whiteSpace: 'nowrap', fontSize: smDown ? 12 : 14 }} variant="body2">
            {`${player.totalDamageDealtToChampions} DMG`}
          </Typography>
          <Box sx={{ width: '90%' }}>
            <Box sx={{ position: 'relative', width: 1, height: 8, backgroundColor: '#919EAB', borderRadius: 1 }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: `${widthDamage}%`,
                  height: 1,
                  backgroundColor: player.win ? '#2d91d2' : theme.palette.error.main,
                  borderRadius: 1,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
