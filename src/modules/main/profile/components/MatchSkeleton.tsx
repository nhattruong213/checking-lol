import { Box, Card, Skeleton, Stack } from '@mui/material';

import { useResponsive } from '@/hooks/useResponsive';

export const MatchSkeleton = () => {
  const mdDown = useResponsive('down', 'lg');
  const mdUp = useResponsive('up', 'md');
  const smUp = useResponsive('up', 'sm');

  return [...Array(5)].map((_, index) => (
    <Card key={index} sx={{ p: 2, borderRadius: 1 }}>
      <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Skeleton variant="rectangular" width={120} height={25} />
          <Skeleton variant="text" sx={{ ml: 2, width: 100 }} />
          <Skeleton variant="text" sx={{ ml: 1.5, width: 50 }} />
        </Box>
        {smUp && <Skeleton variant="text" width={140} />}
      </Box>

      <Box sx={{ display: 'flex', width: 1, flexDirection: mdDown ? 'column' : 'row', gap: mdDown ? 1.5 : 5 }}>
        <Box sx={{ width: mdDown ? '100%' : '60%', gap: 2 }}>
          <Box display="flex">
            <Box display="flex" alignContent="center">
              <Skeleton variant="circular" width={58} height={58} />
              <Box ml={1.5}>
                <Box mb={0.5} display="flex">
                  <Skeleton variant="rectangular" width={25} height={25} />
                  <Stack sx={{ ml: 0.5 }}>
                    <Skeleton variant="rectangular" width={25} height={25} />
                  </Stack>
                </Box>
                <Box width={55} display="flex">
                  <Skeleton variant="rectangular" width={25} height={25} />
                  <Stack sx={{ ml: 0.5 }}>
                    <Skeleton variant="rectangular" width={25} height={25} />
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box ml={4}>
              <Box display="flex">
                {[...Array(7)].map((_, index) => (
                  <Skeleton key={index} variant="rectangular" width={35} height={35} />
                ))}
              </Box>
              <Box display="flex" mt={1.2} alignItems="center">
                <Skeleton variant="text" sx={{ width: 80 }} />
                <Skeleton variant="text" sx={{ ml: 1, width: 30 }} />
              </Box>
              <Skeleton variant="text" sx={{ width: 70 }} />
            </Box>
          </Box>
          <Box mt={1} display="flex" gap={1}>
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} variant="rounded" width={75} height={23} />
            ))}
          </Box>
        </Box>
        {mdUp && (
          <Box sx={{ width: mdDown ? '100%' : '30%' }}>
            <Box sx={{ display: 'flex', flexDirection: mdDown ? 'column' : 'row', gap: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: mdDown ? 'row' : 'column', gap: 0.1 }}>
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} variant="text" width={95} />
                ))}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: mdDown ? 'row' : 'column', gap: 0.1 }}>
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} variant="text" width={95} />
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {!smUp && (
        <Box mt={2}>
          <Skeleton variant="text" sx={{ width: 140 }} />
        </Box>
      )}
    </Card>
  ));
};
