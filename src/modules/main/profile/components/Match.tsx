import { Box, Card, Link as LinkMui, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { AvatarCustom } from '@/components/atoms/avatar';
import { Iconify } from '@/components/atoms/iconify';
import { Label } from '@/components/atoms/label';
import { ACHIVEMENTS, runes, summonerSpell } from '@/constants/app';
import { useBoolean } from '@/hooks/useBoolean';
import { useResponsive } from '@/hooks/useResponsive';
import { bgGradient } from '@/styles/theme/css';
import { moment } from '@/utils/moment';

import { Participant, TMatch } from '../type';
import { convertToMinutes, getGameMode, getKDA } from '../utils';
import { MatchDetail } from './MatchDetail';

export const Match = ({ match, puuid, version }: { match: TMatch; puuid?: string; version?: string | null }) => {
  const mdDown = useResponsive('down', 'lg');
  const mdUp = useResponsive('up', 'md');
  const smUp = useResponsive('up', 'sm');
  const { value: openDetail, onToggle } = useBoolean(false);

  const { info, metadata } = match;
  const { participants } = info;
  const summoner: Participant = participants.find((summoner: Participant) => summoner.puuid === puuid) as Participant;
  const { item0, item1, item2, item3, item4, item5, item6 } = summoner;
  const itemsArray = [item0, item1, item2, item3, item4, item5, item6];

  const victoryTeam = participants.filter((player: Participant) => player.win);
  const defeatedTeam = participants.filter((player: Participant) => !player.win);

  return (
    <>
      <Card
        sx={{
          ...bgGradient({
            direction: '90deg',
            startColor: summoner.win ? 'rgba(46, 192, 255, .2)' : 'rgba(255, 34, 73, .2)',
            endColor: summoner.win ? 'rgba(89, 34, 223, .2)' : 'rgba(160, 115, 255, .2)',
          }),
          p: 2,
          borderRadius: 1,
          mb: openDetail ? 0 : 1,
          borderBottomRightRadius: openDetail ? 0 : 1 + '!important',
          borderBottomLeftRadius: openDetail ? 0 : 1 + '!important',
        }}
      >
        <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography sx={{ textTransform: 'uppercase' }} variant="subtitle1">
              {getGameMode(info.queueId)}
            </Typography>
            <Typography ml={1.3} variant="caption">
              {moment(info.gameEndTimestamp).fromNow()}
            </Typography>

            <Typography ml={1.5} variant="caption">
              {convertToMinutes(info.gameDuration)}
            </Typography>
          </Box>
          {smUp && (
            <LinkMui onClick={onToggle} sx={{ display: 'flex', alignItems: 'center', gap: 0.2, cursor: 'pointer' }}>
              {'Chi tiết trận đấu'}
              {openDetail ? <Iconify width={15} height={15} icon="ep:arrow-up" /> : <Iconify width={15} height={15} icon="ep:arrow-down" />}
            </LinkMui>
          )}
        </Box>
        <Box sx={{ display: 'flex', width: 1, flexDirection: mdDown ? 'column' : 'row', gap: mdDown ? 1.5 : 5 }}>
          <Box sx={{ width: mdDown ? '100%' : '60%', gap: 2 }}>
            <Box display="flex">
              <Box display="flex" alignContent="center">
                <AvatarCustom size="lg" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${summoner.championName}.png`} />
                <Box ml={1.5}>
                  <Box mb={0.5} display="flex">
                    <Image
                      alt="spell"
                      width={25}
                      height={25}
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpell[summoner.summoner1Id]}`}
                    />
                    <Stack sx={{ ml: 0.5 }}>
                      <Image
                        alt="spell"
                        width={25}
                        height={25}
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpell[summoner.summoner2Id]}`}
                      />
                    </Stack>
                  </Box>
                  <Box width={55} display="flex">
                    <Image
                      alt={`runnes ${runes[summoner.perks.styles[0].selections[0].perk]}`}
                      width={25}
                      height={25}
                      src={`https://ddragon.leagueoflegends.com/cdn/img/${runes[summoner.perks.styles[0].selections[0].perk]}`}
                    />
                    <Stack sx={{ ml: 0.5 }}>
                      <Image
                        alt="spell"
                        width={25}
                        height={25}
                        src={`https://ddragon.leagueoflegends.com/cdn/img/${runes[summoner.perks.styles[1].selections[0].perk]}`}
                      />
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <Box ml={4}>
                <Box display="flex">
                  {itemsArray.map((item, index) => {
                    if (item !== 0) {
                      return (
                        <Box key={index} mr={0.2}>
                          <Image
                            alt={`item ${index + 1}`}
                            width={35}
                            height={35}
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`}
                          />
                        </Box>
                      );
                    }
                  })}
                </Box>
                <Box display="flex" mt={1.2} alignItems="center">
                  <Typography variant="subtitle1">{`${summoner.kills} / ${summoner.deaths} / ${summoner.assists}`}</Typography>
                  <Typography ml={3} variant="caption">{`${summoner.totalMinionsKilled + summoner.neutralMinionsKilled} CS`}</Typography>
                </Box>
                <Typography variant="caption">
                  {getKDA(summoner.kills, summoner.deaths, summoner.assists)}
                  {' KDA'}
                </Typography>
              </Box>
            </Box>
            <Box mt={1} display="flex" gap={1}>
              {ACHIVEMENTS.map((achievement) => {
                const achievementValue = summoner[achievement.id as keyof Participant];
                if ((typeof achievementValue === 'number' && achievementValue > 0) || achievementValue) {
                  return (
                    <Label key={achievement.id} sx={{ background: summoner.win ? 'rgba(46, 192, 255, 0.2)' : 'rgba(255, 34, 73, 0.2)' }}>
                      {`${achievementValue === true ? '' : achievementValue} ${achievement.name}`}
                    </Label>
                  );
                }
              })}
            </Box>
          </Box>
          {mdUp && (
            <Box sx={{ width: mdDown ? '100%' : '30%' }}>
              <Box sx={{ display: 'flex', flexDirection: mdDown ? 'column' : 'row', gap: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: mdDown ? 'row' : 'column', gap: 1 }}>
                  {victoryTeam.map((player: Participant, index: number) => (
                    <Box key={index} display="flex" alignItems="center">
                      <AvatarCustom size="xs" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championName}.png`} />
                      <LinkMui
                        component={Link}
                        href={`/profile/${encodeURIComponent(`${player.riotIdGameName}#${player.riotIdTagline}`)}`}
                        sx={{
                          fontSize: 12,
                          ml: 0.5,
                          textDecoration: 'unset',
                          maxWidth: 90,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {player.riotIdGameName}
                      </LinkMui>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: mdDown ? 'row' : 'column', gap: 1 }}>
                  {defeatedTeam.map((player: Participant, index: number) => (
                    <Box key={index} display="flex" alignItems="center">
                      <AvatarCustom size="xs" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${player.championName}.png`} />
                      <LinkMui
                        component={Link}
                        href={`/profile/${encodeURIComponent(`${player.riotIdGameName}#${player.riotIdTagline}`)}`}
                        sx={{
                          fontSize: 12,
                          ml: 0.5,
                          textDecoration: 'unset',
                          maxWidth: 90,
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {player.riotIdGameName}
                      </LinkMui>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        {!smUp && (
          <Box mt={2}>
            <LinkMui onClick={onToggle} sx={{ display: 'flex', alignItems: 'center', gap: 0.2, cursor: 'pointer' }}>
              {'Chi tiết trận đấu'}
              {openDetail ? <Iconify width={15} height={15} icon="ep:arrow-up" /> : <Iconify width={15} height={15} icon="ep:arrow-down" />}
            </LinkMui>
          </Box>
        )}
      </Card>
      {openDetail && puuid && <MatchDetail matchId={metadata.matchId} puuid={puuid} matchInfo={info} />}
    </>
  );
};
