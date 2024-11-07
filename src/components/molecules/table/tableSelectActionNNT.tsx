import { Stack, StackProps, Typography } from '@mui/material';

import { CheckBox } from '@/components/atoms/checkbox';

interface Props extends StackProps {
  action?: React.ReactNode;
  rowCount: number;
  numSelected: number;
  isSelectedAll?: boolean;
  onSelectAllRows: (checked: boolean) => void;
}

export const TableSelectActionNNT = (props: Props) => {
  const { action, rowCount, numSelected, onSelectAllRows, isSelectedAll, sx, ...other } = props;
  if (!numSelected) {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        pl: 1,
        pr: 2,
        top: 0,
        left: 0,
        width: 1,
        zIndex: 9,
        height: 58,
        position: 'absolute',
        bgcolor: 'primary.lighter',
        ...sx,
      }}
      {...other}
    >
      <CheckBox
        indeterminate={!!numSelected && numSelected < rowCount && !isSelectedAll}
        checked={isSelectedAll}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectAllRows(event.target.checked)}
      />

      <Typography
        variant="subtitle2"
        sx={{
          ml: 2,
          flexGrow: 1,
          color: 'primary.main',
        }}
      >
        {numSelected} {'selected'}
      </Typography>

      {action && action}
    </Stack>
  );
};
