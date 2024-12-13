import { alpha, Box, Skeleton, Stack, Typography } from '@mui/material';

import { Card } from '@/components/atoms/card';
import { Iconify } from '@/components/atoms/iconify';

export const AnalysisSkeleton = () => {
  return (
    <Card sx={{ borderRadius: 0, p: 2, height: '100%' }}>
      <Box display="flex" alignItems="center">
        <Iconify icon="mdi-light:chart-line"></Iconify>
        <Typography sx={{ ml: 1, textTransform: 'uppercase' }} variant="subtitle1">
          {'Trận Đấu Gần Đây'}
        </Typography>
      </Box>
      <Box sx={{ my: 1, borderBottom: 1, borderColor: (theme) => alpha(theme.palette.grey[500], 0.08) }}></Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left Section */}
        <Box width={'40%'}>
          <Skeleton variant="text" width={120} />
          <Box sx={{ position: 'relative', height: 100, width: 100, mt: 2 }}>
            <Skeleton variant="circular" width={100} height={100} />
            <Skeleton variant="text" width={40} sx={{ position: 'absolute', top: 40, right: 25 }} />
          </Box>
          <Box display="flex" mt={1} flexDirection="column">
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={100} />
          </Box>
        </Box>

        {/* Right Section */}
        <Box width={'60%'}>
          <Skeleton variant="text" width={140} sx={{ mb: 2, mx: 'auto' }} />
          <Box display="flex" alignItems="flex-end" justifyContent="space-around" mt={2}>
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    height: 100,
                    width: 8,
                    backgroundColor: '#e0e0e0',
                    position: 'relative',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <Skeleton variant="rectangular" width={8} height={60} sx={{ position: 'absolute', bottom: 0 }} />
                </Box>
                <Stack mt={2}>
                  <Skeleton variant="circular" width={16} height={16} />
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
