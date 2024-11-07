import { Box, Typography } from '@mui/material';

export const WinRate = ({ player }: { player: { wins: number; losses: number } }) => {
  const getWinrate = (wins: number, losses: number): number => {
    const totalGames = wins + losses;

    return totalGames === 0 ? 0 : (wins / totalGames) * 100;
  };

  const winRate = getWinrate(player.wins, player.losses);
  const loseRate = 100 - winRate;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Box
          sx={{
            flexGrow: winRate,
            backgroundColor: '#4caf50',
            height: 20,
            position: 'relative',
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {player.wins}
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: loseRate,
            backgroundColor: '#FF3030',
            height: 20,
            position: 'relative',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {player.losses}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
