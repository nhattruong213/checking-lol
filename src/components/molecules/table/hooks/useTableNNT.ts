import { useCallback, useState } from 'react';

import { UseTableProps } from '../type';

export const useTableNNT = (props?: UseTableProps) => {
  const { defaultOrder = 'asc', defaultOrderBy = 'name', defaultSelected = [], defaultRowsPerPage = 10, defaultCurrentPage = 0 } = props || {};

  const [page, setPage] = useState(defaultCurrentPage);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selected, setSelected] = useState<(string | number)[]>(defaultSelected);
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy);
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);

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

  return {
    page,
    rowsPerPage,
    selected,
    orderBy,
    order,
    setPage,
    onChangePage,
    onChangeRowsPerPage,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onResetPage,
  };
};
