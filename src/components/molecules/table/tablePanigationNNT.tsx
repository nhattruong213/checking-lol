import { Box, SxProps, TablePagination, TablePaginationProps, Theme } from '@mui/material';

type Props = {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps<Theme>;
};

export const TablePanigationNNT = (props: Props & TablePaginationProps) => {
  const { sx, rowsPerPageOptions = [5, 10], ...other } = props;

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...other}
        sx={{
          borderTopColor: 'transparent',
        }}
      />
    </Box>
  );
};
