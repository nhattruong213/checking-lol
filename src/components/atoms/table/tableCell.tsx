import { styled, TableCell as TableCellMui, TableCellProps } from '@mui/material';

const StyledTableCell = styled(TableCellMui)(({ theme }) => {
  return {
    borderBottomStyle: 'dashed',
    '&.MuiTableCell-head': {
      fontSize: 14,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightSemiBold,
      backgroundColor: theme.palette.background.neutral,
    },
    '&.MuiTableCell-paddingCheckbox': {
      paddingLeft: theme.spacing(1),
    },
  };
});

export const TableCell = (props: TableCellProps) => {
  return <StyledTableCell {...props} />;
};
