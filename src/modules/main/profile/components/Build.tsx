import { Box, Stack } from '@mui/material';
import Image from 'next/image';

import { bgGradient } from '@/styles/theme/css';
import { TRunnes, TSlot } from '@/types/runnes';

import { StatMods } from '../constants';
import { useBuild } from '../hooks/useBuild';
import { Info, StatPerks } from '../type';
import { Timeline } from './Timeline';

type TProps = {
  matchInfo: Info;
  puuid: string;
  matchId: string;
};

const RuneDisplay = ({ runes, selectedStyle }: { runes: TRunnes[]; selectedStyle: number }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mt: 1, mb: 2 }}>
    {runes?.map((rune) => {
      const isSelected = selectedStyle === rune.id;

      return (
        <Box
          key={rune.id}
          sx={(theme) => ({
            filter: isSelected
              ? ''
              : `blur(1px) brightness(0.9) contrast(1.5) grayscale(1) hue-rotate(45deg) invert(0.4) saturate(1.5) sepia(0.3) drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))`,
            width: 30,
            height: 30,
            border: isSelected ? `1px solid ${theme.palette.primary.main}` : '',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <Image alt="spell" width={20} height={20} src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} />
        </Box>
      );
    })}
  </Box>
);

const SlotDisplay = ({ slots, selectedPerks, isSubPrimary }: { slots: TSlot[]; selectedPerks: number[]; isSubPrimary: boolean }) => (
  <Box
    sx={{
      width: 1,
      ...bgGradient({ direction: '90deg', startColor: 'rgba(46, 192, 255, .2)', endColor: 'rgba(89, 34, 223, .2)' }),
      borderRadius: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      px: 2,
      py: isSubPrimary ? 2 : 4,
    }}
  >
    {slots?.map((slot, index) =>
      isSubPrimary && index == 0 ? null : (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
          {slot.runes.map((rune) => {
            const isSelected = selectedPerks?.includes(Number(rune.id));

            return (
              <Box
                key={rune.id}
                sx={(theme) => ({
                  width: 45,
                  height: 45,
                  filter: isSelected
                    ? ''
                    : `brightness(1.2) contrast(1.5) grayscale(1) hue-rotate(45deg) invert(0.4) saturate(1.5) sepia(0.3) drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))`,
                  border: isSelected ? `1px solid ${theme.palette.primary.main}` : '',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
              >
                <Image alt="spell" width={45} height={45} src={`https://ddragon.leagueoflegends.com/cdn/img/${rune.icon}`} />
              </Box>
            );
          })}
        </Box>
      )
    )}
  </Box>
);

const Mods = ({ statPerks }: { statPerks: StatPerks }) => {
  return (
    <Box
      sx={{
        w: 1,
        ...bgGradient({ direction: '90deg', startColor: 'rgba(46, 192, 255, .2)', endColor: 'rgba(89, 34, 223, .2)' }),
        mt: 1,
        borderRadius: 1,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {StatMods.map((mod, index) => {
        const activeStat = statPerks[mod.group];

        return (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
            {mod.items.map((m, i) => {
              return (
                <Box
                  key={i}
                  sx={(theme) => ({
                    w: 34,
                    h: 34,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: '50%',
                    filter:
                      m.id === activeStat
                        ? ''
                        : `brightness(1.2) contrast(1.5) grayscale(1) hue-rotate(45deg) invert(0.4) saturate(1.5) sepia(0.3) drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))`,
                  })}
                >
                  <Image alt={m.name} width={30} height={30} src={`/assets/statMod/${m.icon}`} />
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
};

export const Build = ({ matchInfo, puuid, matchId }: TProps) => {
  const { participants } = matchInfo;
  const currentParticipant = participants.find((p) => p.puuid === puuid);
  const { perks } = currentParticipant || {};
  const primary = perks?.styles[0];
  const subPrimary = perks?.styles[1];
  const statPerks = perks?.statPerks;

  const { runnes } = useBuild();
  const primarySlots = runnes?.find((r) => r.id === primary?.style)?.slots;
  const subPrimarySlots = runnes?.find((r) => r.id === subPrimary?.style)?.slots;

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="center">
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          {[
            { style: primary?.style, slots: primarySlots, selections: primary?.selections, isSubPrimary: false },
            { style: subPrimary?.style, slots: subPrimarySlots, selections: subPrimary?.selections, isSubPrimary: true },
          ].map((data, index) => (
            <Box width={278} key={index}>
              <Stack justifyContent="center">
                {data.style && runnes && <RuneDisplay runes={runnes} selectedStyle={data.style} />}
                {data.slots && (
                  <SlotDisplay slots={data.slots} isSubPrimary={data.isSubPrimary} selectedPerks={data.selections?.map((s) => s.perk) || []} />
                )}
                {data.isSubPrimary && statPerks && <Mods statPerks={statPerks} />}
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
      <Timeline matchId={matchId} puuid={puuid} />
    </Box>
  );
};
