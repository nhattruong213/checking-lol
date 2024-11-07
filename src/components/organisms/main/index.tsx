'use client';

import Box from '@mui/material/Box';
import { usePathname } from 'next/navigation';

import { Footer } from './footer';
import { Header } from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};
