import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export type UseTableProps = {
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export type HeaderLabelItem = {
  id: string;
  label: ReactNode;
  orderBy?: boolean;
  width?: number;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  minWidth?: number;
  sx?: SxProps<Theme>;
};

export type TableColumnsType<T> = {
  id: string;
  label: ReactNode;
  orderBy?: boolean;
  width?: number;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  minWidth?: number;
  isHidden?: boolean;
  sx?: SxProps<Theme>;
  render?: ({ row }: { row: T }) => ReactNode;
};

export type Row = {
  id: string | number;
};
