import { Box, Grid, Stack } from '@mui/material';
import Image from 'next/image';

import { bgGradient } from '@/styles/theme/css';

import { useBuild } from '../hooks/useBuild';
import { Info } from '../type';

type TProps = {
  matchInfo: Info;
  puuid: string;
};

export const Build = (props: TProps) => {
  const { matchInfo, puuid } = props;
  const { participants } = matchInfo;
  const currentParticipants = participants.find((p) => p.puuid === puuid);
  const primary = currentParticipants?.perks.styles[0];
  const subPrimary = currentParticipants?.perks.styles[1];
  const subPrimaryStyle = subPrimary?.style;
  const primaryStyle = primary?.style;
  const selections = primary?.selections.map((s) => s.perk);
  const subSelections = subPrimary?.selections.map((s) => s.perk);
  const { runnes } = useBuild();
  const slotsPrimary = runnes?.find((r) => r.id === primaryStyle)?.slots;
  const subSlotsPrimary = runnes?.find((r) => r.id === subPrimaryStyle)?.slots;

  return (
    <Box p={2}>
      <Box display={'flex'} justifyContent={'center'}>
        <Box sx={{ width: '80%' }}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Stack justifyContent="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mt: 1, mb: 2 }}>
                  {runnes?.map((r, i) => {
                    return (
                      <Box
                        key={i}
                        sx={(theme) => ({
                          filter:
                            primaryStyle !== r.id
                              ? `
                            blur(1px) 
                            brightness(0.9) 
                            contrast(1.5) 
                            grayscale(1)  
                            hue-rotate(45deg) 
                            invert(0.4) 
                            saturate(1.5) 
                            sepia(0.3) 
                            drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))
                          `
                              : '',
                          width: 30,
                          height: 30,
                          border: primaryStyle == r.id ? `1px solid ${theme.palette.primary.main}` : '',
                          borderRadius: 50,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        })}
                      >
                        <Image alt="spell" width={20} height={20} src={`https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`} />
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    width: 1,
                    ...bgGradient({
                      direction: '90deg',
                      startColor: 'rgba(46, 192, 255, .2)',
                      endColor: 'rgba(89, 34, 223, .2)',
                    }),
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: 2,
                    py: 4,
                  }}
                >
                  {slotsPrimary?.map((slot, i) => {
                    return (
                      <Box
                        key={i}
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        {slot.runes.map((r, i) => {
                          const check = selections?.includes(Number(r.id));

                          return (
                            <Box
                              key={i}
                              sx={(theme) => ({
                                width: 45,
                                height: 45,
                                filter: check
                                  ? ''
                                  : `
                                brightness(1.2) 
                                contrast(1.5) 
                                grayscale(1)  
                                hue-rotate(45deg) 
                                invert(0.4) 
                                saturate(1.5) 
                                sepia(0.3) 
                                drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))
                              `,
                                border: check ? `1px solid ${theme.palette.primary.main}` : '',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              })}
                            >
                              <Image alt="spell" width={45} height={45} src={`https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`} />
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  })}
                </Box>
              </Stack>
            </Grid>

            <Grid item sm={6}>
              <Stack justifyContent="center">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mt: 1, mb: 2 }}>
                  {runnes?.map((r, i) => {
                    return (
                      <Box
                        key={i}
                        sx={(theme) => ({
                          filter:
                            subPrimaryStyle !== r.id
                              ? `
                            blur(1px) 
                            brightness(0.9) 
                            contrast(1.5) 
                            grayscale(1)  
                            hue-rotate(45deg) 
                            invert(0.4) 
                            saturate(1.5) 
                            sepia(0.3) 
                            drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))
                          `
                              : '',
                          width: 30,
                          height: 30,
                          border: subPrimaryStyle == r.id ? `1px solid ${theme.palette.primary.main}` : '',
                          borderRadius: 50,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        })}
                      >
                        <Image alt="spell" width={20} height={20} src={`https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`} />
                      </Box>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    width: 1,
                    ...bgGradient({
                      direction: '90deg',
                      startColor: 'rgba(46, 192, 255, .2)',
                      endColor: 'rgba(89, 34, 223, .2)',
                    }),
                    borderRadius: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    px: 2,
                    py: 4,
                  }}
                >
                  {subSlotsPrimary?.map((slot, i) => {
                    return (
                      i > 0 && (
                        <Box
                          key={i}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          {slot.runes.map((r, i) => {
                            const check = subSelections?.includes(Number(r.id));

                            return (
                              <Box
                                key={i}
                                sx={(theme) => ({
                                  width: 45,
                                  height: 45,
                                  filter: check
                                    ? ''
                                    : `
                                brightness(1.2) 
                                contrast(1.5) 
                                grayscale(1)  
                                hue-rotate(45deg) 
                                invert(0.4) 
                                saturate(1.5) 
                                sepia(0.3) 
                                drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))
                              `,
                                  border: check ? `1px solid ${theme.palette.primary.main}` : '',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                })}
                              >
                                <Image alt="spell" width={45} height={45} src={`https://ddragon.leagueoflegends.com/cdn/img/${r.icon}`} />
                              </Box>
                            );
                          })}
                        </Box>
                      )
                    );
                  })}
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
