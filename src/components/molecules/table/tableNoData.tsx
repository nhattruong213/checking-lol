import { SxProps, Theme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTranslations } from 'next-intl';

import { EmptyContent } from '../emptyContent';

type Props = {
  notFound: boolean;
  sx?: SxProps<Theme>;
};

export const TableNoData = ({ notFound, sx }: Props) => {
  const t = useTranslations('table');

  return (
    <TableRow>
      {notFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            filled
            title={t('noData')}
            sx={{
              py: 10,
              ...sx,
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
};
