import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
// @mui
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';

import { MotionViewport } from '@/components/atoms/animate/motion-viewport';
import { varFade } from '@/components/atoms/animate/variants/fade';
// components

// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: ' /assets/icons/home/ic_development.svg',
    title: 'Bảng Xếp Hạng Người Chơi',
    description:
      'Mang đến bảng xếp hạng người chơi chi tiết, giúp bạn dễ dàng theo dõi thứ hạng của mình và đối thủ. Với cập nhật liên tục và đầy đủ các chỉ số.',
  },
  {
    icon: ' /assets/icons/home/ic_design.svg',
    title: 'Tra cứu lịch sử',
    description:
      'Đây là một công cụ trực tuyến không chỉ đơn thuần giúp người chơi tra cứu lịch sử đấu mà còn cung cấp vô số thông tin hỗ trợ hữu ích để các game thủ có thể cải thiện kỹ năng và chiến thuật của mình trong game.',
  },
  {
    icon: ' /assets/icons/home/ic_make_brand.svg',
    title: 'Công Cụ Phân Tích & Phát Triển',
    description:
      'Với LolCheck, người chơi có thể theo dõi tiến trình cá nhân qua những phân tích chi tiết, từ đó nâng cao khả năng cạnh tranh trong các trận đấu.',
  },
];

// ----------------------------------------------------------------------

export const HomeMinimal = () => {
  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
      >
        <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
            {'LOL check'}
          </Typography>
        </m.div>

        <m.div variants={varFade().inDown}>
          <Typography variant="h4">{'CHECK LỊCH SỬ ĐẤU LIÊN MINH HUYỀN THOẠI'}</Typography>
        </m.div>
      </Stack>

      <Box
        gap={{ xs: 3, lg: 10 }}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {CARDS.map((card, index) => (
          <m.div style={{ height: '100%' }} variants={varFade().inUp} key={card.title}>
            <Card
              sx={{
                height: 1,
                textAlign: 'center',
                boxShadow: { md: 'none' },
                bgcolor: 'background.default',
                p: (theme) => theme.spacing(10, 5),
                ...(index === 1 && {
                  boxShadow: (theme) => ({
                    md: `-40px 40px 80px ${
                      theme.palette.mode === 'light' ? alpha(theme.palette.grey[500], 0.16) : alpha(theme.palette.common.black, 0.4)
                    }`,
                  }),
                }),
              }}
            >
              <Box component="img" src={card.icon} alt={card.title} sx={{ mx: 'auto', width: 48, height: 48 }} />

              <Typography variant="h5" sx={{ mt: 8, mb: 2 }}>
                {card.title}
              </Typography>

              <Typography sx={{ color: 'text.secondary' }}>{card.description}</Typography>
            </Card>
          </m.div>
        ))}
      </Box>
    </Container>
  );
};
