import { Link as LinkMui, SxProps, Theme } from '@mui/material';
import Link from 'next/link';

import { SvgColor } from '../svgColor';

type LogoSectionProps = {
  sx?: SxProps<Theme>;
};

export const Logo: React.FC<LogoSectionProps> = ({ sx }) => {
  const logo = <SvgColor src="/assets/icons/logo/lol.svg" sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }} />;

  return (
    <LinkMui component={Link} href="/" sx={{ display: 'contents' }}>
      {logo}
    </LinkMui>
  );
};
