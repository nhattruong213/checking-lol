import { Box, SxProps, TableHead, TableRow, TableSortLabel, Theme } from '@mui/material';

import { CheckBox } from '@/components/atoms/checkbox';
import { TableCell } from '@/components/atoms/table/tableCell';

import { HeaderLabelItem } from './type';

type Props = {
  order?: 'asc' | 'desc';
  orderBy?: string;
  headLabel: HeaderLabelItem[];
  rowCount?: number;
  numSelected?: number;
  onSort?: (id: string) => void;
  onSelectAllRows?: (checked: boolean) => void;
  sx?: SxProps<Theme>;
  sxRows?: SxProps<Theme>;
  isSelectedAll?: boolean;
};

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

export const TableHeadNNT = (props: Props) => {
  const { sx, sxRows, rowCount = 0, numSelected, headLabel, isSelectedAll, orderBy, order, onSelectAllRows, onSort } = props;

  return (
    <TableHead sx={sx}>
      <TableRow>
        {onSelectAllRows && (
          <TableCell padding="checkbox">
            <CheckBox
              indeterminate={!!numSelected && numSelected < rowCount && !isSelectedAll}
              checked={isSelectedAll}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSelectAllRows(event.target.checked)}
            />
          </TableCell>
        )}
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth, ...sxRows }}
          >
            {onSort && headCell.orderBy !== false ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                {headCell.label}

                {orderBy === headCell.id ? <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box> : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
