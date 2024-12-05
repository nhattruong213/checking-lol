import { Box, Skeleton, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

import { TableCell } from '@/components/atoms/table/tableCell';

export const SkeletonTable = ({ rows = 10 }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{'#'}</TableCell>
            <TableCell>{'Người Chơi'}</TableCell>
            <TableCell>{'Hạng'}</TableCell>
            <TableCell>{'Điểm LP'}</TableCell>
            <TableCell>{'Cấp Độ'}</TableCell>
            <TableCell>{'Tướng Thông Thạo'}</TableCell>
            <TableCell>{'Tỷ Lệ Thắng'}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(rows)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton variant="text" width={30} />
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Box ml={2}>
                    <Skeleton variant="text" width={120} />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={80} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={60} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={50} />
              </TableCell>
              <TableCell>
                <Box display="flex">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} variant="circular" width={30} height={30} style={{ marginRight: 8 }} />
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Skeleton variant="text" width={40} />
                  <Skeleton variant="text" width={40} style={{ marginLeft: 8 }} />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
