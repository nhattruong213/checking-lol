import { Button, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { alpha, styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { m, useScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { MotionContainer } from '@/components/atoms/animate/motion-container';
import { varFade } from '@/components/atoms/animate/variants';
import { FormProvider } from '@/components/atoms/formProvider';
import { Iconify } from '@/components/atoms/iconify';
import { TextField } from '@/components/atoms/textField';
import { HEADER } from '@/constants/app';
import { useResponsive } from '@/hooks/useResponsive';
import { bgBlur, bgGradient, textGradient } from '@/styles/theme/css';
import { secondaryFont } from '@/styles/theme/typography';

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100vh',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    position: 'fixed',
  },
}));

const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

const StyledTextGradient = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  padding: 0,
  marginTop: 8,
  lineHeight: 1,
  marginBottom: 24,
  letterSpacing: 8,
  textAlign: 'center',
  backgroundSize: '400%',
  fontSize: `${54 / 16}rem`,
  fontFamily: secondaryFont.style.fontFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: `${64 / 16}rem`,
  },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  top: -80,
  width: 480,
  right: -80,
  height: 480,
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  position: 'absolute',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

type StyledPolygonProps = {
  opacity?: number;
  anchor?: 'left' | 'right';
};

const StyledPolygon = styled('div')<StyledPolygonProps>(({ opacity = 1, anchor = 'left', theme }) => ({
  ...bgBlur({
    opacity,
    color: theme.palette.background.default,
  }),
  zIndex: 9,
  bottom: 0,
  height: 80,
  width: '50%',
  position: 'absolute',
  clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)',
  ...(anchor === 'left' && {
    left: 0,
    ...(theme.direction === 'rtl' && {
      transform: 'scale(-1, 1)',
    }),
  }),
  ...(anchor === 'right' && {
    right: 0,
    transform: 'scaleX(-1)',
    ...(theme.direction === 'rtl' && {
      transform: 'scaleX(1)',
    }),
  }),
}));

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

  const methods = useForm({});

  const { handleSubmit, watch } = methods;
  const router = useRouter();

  const searchValue = watch('search');
  const [showHash, setShowHash] = useState(true);
  const textWidthRef = useRef<HTMLDivElement>(null);
  const textWidth = textWidthRef.current?.offsetWidth || 0;

  useEffect(() => {
    setShowHash(!searchValue?.includes('#'));
  }, [searchValue]);

  const handleOnSubmit = handleSubmit((data) => {
    const encodedGameName = encodeURIComponent(data.search);
    router.push(`/profile/${encodedGameName}`);
  });

  const renderDescription = (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 480,
        mt: {
          md: `-${HEADER.H_DESKTOP + percent * 2.5}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
          }}
        >
          {'League of legends'}
        </Typography>
      </m.div>
      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          {'FF'}
        </StyledTextGradient>
      </m.div>

      <m.div style={{ width: '100%' }} variants={varFade().in}>
        <FormProvider methods={methods} onSubmit={handleOnSubmit}>
          <Stack sx={{ marginBottom: 4, width: '100%', position: 'relative' }}>
            <TextField
              sx={(theme) => ({
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Iconify width={25} icon="arcticons:emoji-search"></Iconify>
                  </InputAdornment>
                ),
              }}
              // onChange={handleInputChange}
              placeholder="Name player, i.e. player#VN1"
              name="search"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Box ref={textWidthRef} sx={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', fontSize: '16px', fontFamily: 'inherit' }}>
              {searchValue}
            </Box>
            {showHash && searchValue && <Box sx={{ position: 'absolute', top: '2rem', left: `${textWidth + 23}px` }}>{'#'}</Box>}
            <Button type="submit" variant="contained" color="primary">
              {'Tìm kiếm'}
            </Button>
          </Stack>
        </FormProvider>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {
            'FF - Nền tảng theo dõi và phân tích lịch sử đấu Liên Minh Huyền Thoại hàng đầu. Dễ dàng tra cứu thông tin người chơi, thống kê chi tiết trận đấu, và theo dõi xếp hạng một cách nhanh chóng.'
          }
        </Typography>
      </m.div>
    </Stack>
  );

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

  const renderPolygons = (
    <>
      <StyledPolygon />
      <StyledPolygon anchor="right" opacity={0.48} />
      <StyledPolygon anchor="right" opacity={0.48} sx={{ height: 48, zIndex: 10 }} />
      <StyledPolygon anchor="right" sx={{ zIndex: 11, height: 24 }} />
    </>
  );

  const renderEllipses = (
    <>
      {mdUp && <StyledEllipseTop />}
      <StyledEllipseBottom />
    </>
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
                {renderDescription}
              </Grid>

              {mdUp && <Grid md={6}>{renderSlides}</Grid>}
            </Grid>
          </Container>

          {renderEllipses}
        </StyledWrapper>
      </StyledRoot>

      {mdUp && renderPolygons}

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
};
