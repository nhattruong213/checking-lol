'use client';

import { alpha, Box, Container, LinearProgress, Link as LinkMui, Stack, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

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

import { WinRate } from './components/WinRate';
export const Rank = () => {
  const { version, champions } = useAppSelector((state) => state.common);

  const STATUS_OPTIONS = [
    { value: 'solo', label: 'Ranked Solo' },
    { value: 'flex', label: 'Ranked Flex' },
    { value: 'level', label: 'Level' },
    { value: 'master', label: 'Mastery' },
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
          <LinkMui sx={{ textDecoration: 'unset' }} component={Link} href={'/'}>
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
      label: 'TƯỚNG CHƠI NHIỀU NHẤT',
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

  const { page, rowsPerPage, onChangePage, onChangeRowsPerPage } = useTableNNT();
  const [data, setData] = useState<any[]>([]);

  const { isLoading } = useQuery({
    apiConfig: getTopPlayers,
    payload: {
      page: page,
      perpage: rowsPerPage,
    },
    options: {
      queryKey: [page, rowsPerPage],
    },
    onSuccess: ({ data }) => {
      setData(data.data);
    },
  });

  return (
    <MainLayout>
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
          <m.div variants={varFade().inDown}>
            <Typography variant="h4">{'Top rank Thách Đấu server Vietnam Liên Minh Huyền Thoại cập nhật mới nhất'}</Typography>
          </m.div>
        </Stack>

        <Card>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile={true}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab.value} iconPosition="end" value={tab.value} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        <Card sx={{ mt: 2 }}>
          {isLoading ? (
            <LinearProgress />
          ) : (
            <DataTableNNT
              rowsPerPageOptions={[5, 10, 25]}
              panigation={true}
              columns={columns}
              items={data}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>
    </MainLayout>
  );
};
