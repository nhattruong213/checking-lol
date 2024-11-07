'use client';

import { alpha, Card, CardMedia, Container, Grid, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';

import { MotionViewport } from '@/components/atoms/animate/motion-viewport';
import { varFade } from '@/components/atoms/animate/variants';
import { useAppSelector } from '@/stores/hooks';

import { useLogic } from './hooks/useLogic';

export const FreeChampion = () => {
  const { freeChampionIds } = useLogic();
  const { champions } = useAppSelector((state) => state.common);

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            {'Tướng xoay tua miễn phí'}
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h4">{'TƯỚNG MIỄN PHÍ TRONG TUẦN'}</Typography>
        </m.div>
      </Stack>
      <Grid container spacing={2} justifyContent="center">
        {freeChampionIds?.map((champId: string) => (
          <Grid item key={champId} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champions?.[champId]}_0.jpg`}
                alt={`${champions?.[champId]}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
