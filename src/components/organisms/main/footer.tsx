import { Link as LinkMui } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';

import { Iconify } from '@/components/atoms/iconify';
import { Logo } from '@/components/atoms/logo';

const LINKS = [
  {
    headline: 'LOL check',
    children: [
      { name: 'Trang chủ', href: '/' },
      { name: 'Ranking', href: '/ranking' },
      { name: 'Báo lỗi', href: '/report' },
    ],
  },
  {
    headline: 'Riot',
    children: [
      { name: 'Riot', href: 'https://www.riotgames.com/vi' },
      { name: 'Riot Policy', href: '#' },
    ],
  },
  {
    headline: 'Liên hệ',
    children: [{ name: 'nguyennhattruong11223344@gmail.com', href: '#' }],
  },
];

// ----------------------------------------------------------------------

const _socials = [
  {
    value: 'facebook',
    name: 'FaceBook',
    icon: 'eva:facebook-fill',
    color: '#1877F2',
    path: 'https://www.facebook.com/',
  },
  {
    value: 'instagram',
    name: 'Instagram',
    icon: 'ant-design:instagram-filled',
    color: '#E02D69',
    path: 'https://www.instagram.com/',
  },
  {
    value: 'linkedin',
    name: 'Linkedin',
    icon: 'eva:linkedin-fill',
    color: '#007EBB',
    path: 'https://www.linkedin.com/',
  },
  {
    value: 'twitter',
    name: 'Twitter',
    icon: 'eva:twitter-fill',
    color: '#00AAEC',
    path: 'https://www.twitter.com/',
  },
];

export const Footer = () => {
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 10,
          pb: 5,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Logo sx={{ mb: 3 }} />

        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
        >
          <Grid xs={8} md={3}>
            <Typography
              variant="body2"
              sx={{
                maxWidth: 270,
                mx: { xs: 'auto', md: 'unset' },
              }}
            >
              {
                'FF - Nền tảng theo dõi và phân tích lịch sử đấu Liên Minh Huyền Thoại hàng đầu. Dễ dàng tra cứu thông tin người chơi, thống kê chi tiết trận đấu, và theo dõi xếp hạng một cách nhanh chóng.'
              }
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{
                mt: 3,
                mb: { xs: 5, md: 0 },
              }}
            >
              {_socials.map((social) => (
                <IconButton
                  key={social.name}
                  sx={{
                    '&:hover': {
                      bgcolor: alpha(social.color, 0.08),
                    },
                  }}
                >
                  <Iconify color={social.color} icon={social.icon} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid xs={12} md={6}>
            <Stack spacing={5} direction={{ xs: 'column', md: 'row' }}>
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }} sx={{ width: 1 }}>
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <LinkMui key={link.name} component={Link} href={link.href} color="inherit" variant="body2">
                      {link.name}
                    </LinkMui>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          {'© 2024. All rights reserved'}
        </Typography>
      </Container>
    </Box>
  );

  return mainFooter;
};
