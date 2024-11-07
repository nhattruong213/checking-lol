import { SxProps, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { Theme } from '@mui/system';
import { ReactNode } from 'react';

import { CheckBox } from '@/components/atoms/checkbox';
import { SimpleBarScroll } from '@/components/atoms/simpleBar';
import { TableCell } from '@/components/atoms/table/tableCell';

import { TableHeadNNT } from './tableHeadNNT';
import { TableNoData } from './tableNoData';
import { TablePanigationNNT } from './tablePanigationNNT';
import { TableSelectActionNNT } from './tableSelectActionNNT';
import { Row, TableColumnsType } from './type';

type Props<T> = {
  columns: TableColumnsType<T>[];
  items: T[];
  sx?: SxProps<Theme>;
  sxHead?: SxProps<Theme>;
  size?: 'medium' | 'small';
  action?: ReactNode;
  panigation?: boolean;
  page?: number;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  onChangePage?: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: 'asc' | 'desc';
  orderBy?: string;
  selected?: (string | number)[];
  onSort?: (value: string) => void;
  onSelectRow?: (inputValue: string | number) => void;
  onSelectAllRows?: (checked: boolean, values: (string | number)[]) => void;
};

export const DataTableNNT = <T extends Row>(props: Props<T>) => {
  const {
    columns,
    items,
    size = 'medium',
    sx,
    sxHead,
    action,
    page = 0,
    rowsPerPage = 10,
    panigation = false,
    order = 'asc',
    orderBy = '',
    selected,
    rowsPerPageOptions,
    onChangePage,
    onChangeRowsPerPage,
    onSelectRow,
    onSelectAllRows,
    onSort,
  } = props;

  const notFound = !items.length;
  const itemSlides = panigation ? items?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : items;
  const isSelectedAll = itemSlides.every((item) => selected?.includes(item.id));

  return (
    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
      {selected && (
        <TableSelectActionNNT
          numSelected={selected.length}
          rowCount={items.length}
          isSelectedAll={isSelectedAll}
          onSelectAllRows={(checked) =>
            onSelectAllRows?.(
              checked,
              itemSlides.map((row) => row.id)
            )
          }
          action={action}
        />
      )}
      <SimpleBarScroll>
        <Table size={size} sx={{ minWidth: 960, ...sx }}>
          <TableHeadNNT
            {...(selected && {
              onSelectAllRows: (checked) =>
                onSelectAllRows?.(
                  checked,
                  itemSlides.map((row) => row.id)
                ),
              rowCount: items.length,
              numSelected: selected?.length,
              isSelectedAll: isSelectedAll,
            })}
            sx={{ ...sxHead }}
            headLabel={columns}
            order={order}
            orderBy={orderBy}
            onSort={onSort}
          />

          <TableBody>
            {itemSlides.map((item) => (
              <TableRow hover selected={selected?.includes(item.id)} key={item.id}>
                {selected && (
                  <TableCell padding="checkbox">
                    <CheckBox checked={selected?.includes(item.id)} onClick={() => onSelectRow?.(item.id)} />
                  </TableCell>
                )}

                {columns.map((col, index) => {
                  const value: string = col.id ? String(item[col.id as keyof T] || '') : '';

                  return (
                    !col.isHidden && (
                      <TableCell key={index} sx={{ whiteSpace: 'nowrap' }}>
                        {col.render ? col.render({ row: item }) : value}
                      </TableCell>
                    )
                  );
                })}
              </TableRow>
            ))}
            <TableNoData notFound={notFound} />
          </TableBody>
        </Table>
        {panigation && onChangePage && (
          <TablePanigationNNT
            count={items.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        )}
      </SimpleBarScroll>
    </TableContainer>
  );
};
