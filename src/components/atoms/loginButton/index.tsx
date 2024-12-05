import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';

import { SvgColor } from '../svgColor';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export const LoginButton = ({ sx }: Props) => {
  const logo = <SvgColor src="/assets/icons/logo/riot.svg" sx={{ marginRight: 1, width: 18, height: 18, cursor: 'pointer', ...sx }} />;

  return (
    <Button component={Link} href={'/login'} variant="outlined" sx={{ ml: 2, px: '10px', py: '2px', ...sx }}>
      {logo}
      {'Login'}
    </Button>
  );
};
