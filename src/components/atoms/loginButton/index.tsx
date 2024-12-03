import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import Link from 'next/link';

import { SvgColor } from '../svgColor';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export const LoginButton = ({ sx }: Props) => {
  const logo = <SvgColor src="/assets/icons/logo/riot.svg" sx={{ marginRight: 1, width: 20, height: 20, cursor: 'pointer', ...sx }} />;

  return (
    <Button component={Link} href={'/login'} variant="outlined" sx={{ mr: 2, ...sx }}>
      {logo}
      {'Login'}
    </Button>
  );
};
