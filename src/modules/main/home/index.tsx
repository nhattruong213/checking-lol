'use client';

import { Box } from '@mui/material';

import { MainLayout } from '@/components/organisms/main';

import { FreeChampion } from './components/FreeChampions';
import { HomeHero } from './components/HomeHero';
import { HomeMinimal } from './components/HomeMinimal';

export const HomePage = () => {
  return (
    <MainLayout>
      <HomeHero />
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeMinimal />
        <FreeChampion />
      </Box>
    </MainLayout>
  );
};
