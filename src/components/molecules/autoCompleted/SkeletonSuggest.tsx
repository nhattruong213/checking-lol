import { alpha, Box, ListItem, ListItemButton, Skeleton } from '@mui/material';

export const SkeletonSuggest = () => {
  return [...Array(3)].map((_, index) => (
    <ListItem sx={(theme) => ({ p: 0, borderBottom: '1px solid', borderColor: alpha(theme.palette.grey[500], 0.08) })} key={index}>
      <ListItemButton sx={{ p: 0.8, display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box>
            <Box sx={{ display: 'flex', ml: 0.8 }}>
              <Skeleton variant="text" width={120} />
            </Box>
            <Skeleton variant="text" sx={{ width: 80, ml: 0.8 }} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={90} />
        </Box>
      </ListItemButton>
    </ListItem>
  ));
};
