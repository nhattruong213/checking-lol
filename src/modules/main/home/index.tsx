'use client';

import { Box } from '@mui/material';

import { HomeHero } from './components/HomeHero';
import { HomeMinimal } from './components/HomeMinimal';

export const HomePage = () => {
  return (
    <>
      <HomeHero />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />
      </Box>
    </>
  );
};
