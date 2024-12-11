import { alpha, styled } from '@mui/material';
import { m } from 'framer-motion';

import { HEADER } from '@/constants/app';
import { bgBlur, bgGradient, textGradient } from '@/styles/theme/css';
import { secondaryFont } from '@/styles/theme/typography';

export const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/bg3.jpg',
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

export const StyledWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  overflow: 'hidden',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    marginTop: HEADER.H_DESKTOP_OFFSET,
  },
}));

export const StyledTextGradient = styled(m.h1)(({ theme }) => ({
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

export const StyledEllipseTop = styled('div')(({ theme }) => ({
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

export const StyledEllipseBottom = styled('div')(({ theme }) => ({
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

export const StyledPolygon = styled('div')<StyledPolygonProps>(({ opacity = 1, anchor = 'left', theme }) => ({
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
