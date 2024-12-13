import { alpha, Box, Skeleton, Stack, Typography } from '@mui/material';

import { Card } from '@/components/atoms/card';
import { Iconify } from '@/components/atoms/iconify';

export const AnalysisSkeleton = () => {
  return (
    <Card sx={{ borderRadius: 0, p: 2 }}>
      <Box display="flex" alignItems="center">
        <Iconify icon="mdi-light:chart-line"></Iconify>
        <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
          {'Trận Đấu Gần Đây'}
        </Typography>
      </Box>
      <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Skeleton width={60} />
        <Skeleton width={60} />
      </Box>

      <Skeleton sx={{ mt: 2 }} width={80} height={40} />
      <Skeleton width={120} />

      <Box mt={2}>
        <Skeleton width={120} />
        <Box display="flex" alignItems="flex-end" justifyContent="space-around" mt={2}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={index} textAlign="center">
              <Skeleton variant="rectangular" width={20} height={150} />
              <Stack mt={2}>
                <Skeleton width={16} height={16} />
              </Stack>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
};
