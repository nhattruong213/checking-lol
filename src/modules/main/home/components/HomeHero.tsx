import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import { m, useScroll } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MotionContainer } from '@/components/atoms/animate/motion-container';
import { useResponsive } from '@/hooks/useResponsive';

import { FormSuggest } from './FormSuggest';
import { Polygons } from './Polygons';
import { StyledEllipseBottom, StyledEllipseTop, StyledRoot, StyledWrapper } from './style';

// ----------------------------------------------------------------------

export const HomeHero = () => {
  const mdUp = useResponsive('up', 'md');

  const theme = useTheme();

  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  const getScroll = useCallback(() => {
    let heroHeight = 0;

    if (heroRef.current) {
      heroHeight = heroRef.current.offsetHeight;
    }

    scrollY.on('change', (scrollHeight) => {
      const scrollPercent = (scrollHeight * 100) / heroHeight;

      setPercent(Math.floor(scrollPercent));
    });
  }, [scrollY]);

  useEffect(() => {
    getScroll();
  }, [getScroll]);

  const transition = {
    repeatType: 'loop',
    ease: 'linear',
    duration: 60 * 4,
    repeat: Infinity,
  } as const;

  const opacity = 1 - percent / 100;

  const hide = percent > 120;

  const renderSlides = (
    <Stack
      direction="row"
      alignItems="flex-start"
      sx={{
        height: '150%',
        position: 'absolute',
        opacity: opacity > 0 ? opacity : 0,
        transform: `skew(${-16 - percent / 24}deg, ${4 - percent / 16}deg)`,
        ...(theme.direction === 'rtl' && {
          transform: `skew(${16 + percent / 24}deg, ${4 + percent / 16}deg)`,
        }),
      }}
    >
      <Stack
        component={m.div}
        sx={{
          width: 344,
          position: 'relative',
        }}
      >
        <Box
          component={m.img}
          animate={{ y: ['0%', '100%'] }}
          transition={transition}
          alt={'bg-1'}
          src={`/assets/images/home/hero/a1.webp`}
          sx={{ position: 'absolute', mt: -5 }}
        />
        <Box
          component={m.img}
          animate={{ y: ['-100%', '0%'] }}
          transition={transition}
          alt={'bg-1'}
          src={`/assets/images/home/hero/a1.webp`}
          sx={{ position: 'absolute' }}
        />
      </Stack>

      <Stack component={m.div} sx={{ width: 720, position: 'relative', ml: -5 }}>
        <Box
          component={m.img}
          animate={{ y: ['100%', '0%'] }}
          transition={transition}
          alt={'bg-2'}
          src={`/assets/images/home/hero/a2.webp`}
          sx={{ position: 'absolute', mt: -5 }}
        />
        <Box
          component={m.img}
          animate={{ y: ['0%', '-100%'] }}
          transition={transition}
          alt={'bg-2'}
          src={`/assets/images/home/hero/a2.webp`}
          sx={{ position: 'absolute' }}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      <StyledRoot
        ref={heroRef}
        sx={{
          ...(hide && {
            opacity: 0,
          }),
        }}
      >
        <StyledWrapper>
          <Container component={MotionContainer} sx={{ height: 1 }}>
            <Grid container columnSpacing={{ md: 10 }} sx={{ height: 1 }}>
              <Grid xs={12} md={6}>
                <FormSuggest />
              </Grid>

              {mdUp && <Grid md={6}>{renderSlides}</Grid>}
            </Grid>
          </Container>

          {mdUp && <StyledEllipseTop />}
          <StyledEllipseBottom />
        </StyledWrapper>
      </StyledRoot>

      {mdUp && <Polygons />}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
};
