import { useCallback, useState } from 'react';

import { UseTableProps } from '../type';
import { getComparator } from '../utils';

export const useTableNNT = (props?: UseTableProps) => {
  const { defaultOrder = 'asc', defaultOrderBy = 'name', defaultSelected = [], defaultRowsPerPage = 10, defaultCurrentPage = 0 } = props || {};

  const [page, setPage] = useState(defaultCurrentPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState<(string | number)[]>(defaultSelected);
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);
  const [result, setResult] = useState(0);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string | number) => {
      const newSelected = selected.includes(inputValue) ? selected.filter((value) => value !== inputValue) : [...selected, inputValue];
      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback(
    (checked: boolean, values: (string | number)[]) => {
      if (checked) {
        const newSelected = [...selected, ...values.filter((value) => !selected.includes(value))];
        setSelected(newSelected);
      } else {
        const newSelected = selected.filter((value) => !values.includes(value));
        setSelected(newSelected);
      }
    },
    [selected]
  );

  const onSort = (column: string) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const applyOrderby = useCallback(
    <T>(inputData: T[]) => {
      const comparator: (a: any, b: any) => number = getComparator(order, orderBy);
      const stabilizedThis = inputData.map((el, index) => [el, index] as const);

      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;

        return a[1] - b[1];
      });

      return stabilizedThis.map((el) => el[0]);
    },
    [order, orderBy]
  );

  return {
    page,
    rowsPerPage,
    selected,
    orderBy,
    order,
    result,
    setResult,
    setPage,
    onChangePage,
    onChangeRowsPerPage,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onResetPage,
    applyOrderby,
  };
};
