'use client';

import { alpha, Box, Container, Link as LinkMui, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import { MotionViewport } from '@/components/atoms/animate/motion-viewport';
import { varFade } from '@/components/atoms/animate/variants';
import { AvatarCustom } from '@/components/atoms/avatar';
import { Card } from '@/components/atoms/card';
import { Tab, Tabs } from '@/components/atoms/tabs';
import { DataTableNNT } from '@/components/molecules/table';
import { useTableNNT } from '@/components/molecules/table/hooks/useTableNNT';
import { TableColumnsType } from '@/components/molecules/table/type';
import { MainLayout } from '@/components/organisms/main';
import { RANK } from '@/constants/app';
import { useQuery } from '@/hooks/useQuery';
import { getTopPlayers } from '@/services/api/get-top-player';
import { useAppSelector } from '@/stores/hooks';

import { SkeletonTable } from './components/SkeletonTable';
import { WinRate } from './components/WinRate';
export const Rank = () => {
  const { version, champions } = useAppSelector((state) => state.common);

  const FILTER_OPTION = [
    { value: 'RANKED_SOLO_5x5', label: 'Rank Đơn/Đôi' },
    { value: 'RANKED_FLEX_SR', label: 'Rank Linh Hoạt' },
  ];

  const columns: TableColumnsType<any>[] = [
    {
      id: 'id',
      label: '#',
    },
    {
      id: 'user',
      label: 'NGƯỜI CHƠI',
      render: ({ row }) => {
        return (
          <LinkMui sx={{ textDecoration: 'unset' }} component={Link} href={`/profile/${encodeURIComponent(`${row.gameName}#${row.tagLine}`)}`}>
            <Box display="flex" alignItems="center">
              <AvatarCustom type="filled" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${row.profileIconId}.png`} />
              <Typography sx={{ ml: 2 }}>
                {row.gameName}
                {'#'}
                {row.tagLine}
              </Typography>
            </Box>
          </LinkMui>
        );
      },
    },
    {
      id: 'rank',
      label: 'HẠNG',
      render: ({ row }) => {
        return <Typography>{RANK[row.rank as 'I' | 'II' | 'III']}</Typography>;
      },
    },
    {
      id: 'leaguePoints',
      label: 'ĐIỂM LP',
      render: ({ row }) => {
        return (
          <Typography>
            {row.leaguePoints} {'LP'}
          </Typography>
        );
      },
    },
    { id: 'summonerLevel', label: 'CẤP ĐỘ' },
    {
      id: 'mastery',
      label: 'TƯỚNG THÔNG THẠO',
      render: ({ row }) => {
        return (
          <Box display="flex" alignItems="center">
            {row.favoriteChampion.map((favorite: any) => {
              return (
                <Box key={favorite.championId} sx={{ mr: 1 }}>
                  <AvatarCustom
                    type="outline"
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champions?.[favorite.championId]}.png`}
                  />
                </Box>
              );
            })}
          </Box>
        );
      },
    },
    {
      id: 'winrate',
      label: 'TỶ LỆ THẮNG',
      render: ({ row }) => {
        return <WinRate player={row} />;
      },
    },
  ];

  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } = useTableNNT();
  const [data, setData] = useState<any[]>([]);
  const [queue, setQueue] = useState('RANKED_SOLO_5x5');

  const [recordsTotal, setRecordsTotal] = useState(0);
  const { isLoading } = useQuery({
    apiConfig: getTopPlayers,
    payload: {
      page: page,
      perpage: rowsPerPage,
      queue: queue,
    },
    options: {
      queryKey: [page, rowsPerPage, queue],
    },
    onSuccess: ({ data }) => {
      setData(data.data);
      setRecordsTotal(data.recordsTotal);
    },
  });

  const handleFilter = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setQueue(newValue);
      setPage(0);
    },
    [setQueue]
  );

  return (
    <MainLayout>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container
          component={MotionViewport}
          sx={{
            py: { xs: 4, md: 4.5 },
          }}
        >
          <Stack
            spacing={3}
            sx={{
              textAlign: 'center',
              mb: { xs: 2, md: 2 },
            }}
          >
            <m.div variants={varFade().in}>
              <Typography variant="h4">{'Top rank Thách Đấu server Vietnam Liên Minh Huyền Thoại cập nhật mới nhất'}</Typography>
            </m.div>
          </Stack>

          <Card>
            <Tabs
              variant="scrollable"
              value={queue}
              scrollButtons="auto"
              allowScrollButtonsMobile={true}
              onChange={handleFilter}
              sx={{
                px: 2.5,
                boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
              }}
            >
              {FILTER_OPTION.map((tab) => (
                <Tab key={tab.value} value={tab.value} label={tab.label} />
              ))}
            </Tabs>
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <DataTableNNT
                rowsPerPageOptions={[5, 10]}
                panigation={true}
                columns={columns}
                items={data}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                recordsTotal={recordsTotal}
              />
            )}
          </Card>
        </Container>
      </Box>
    </MainLayout>
  );
};
