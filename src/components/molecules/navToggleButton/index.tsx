import { IconButton, IconButtonProps, useTheme } from '@mui/material';

import { Iconify } from '@/components/atoms/iconify';
import { NAV } from '@/constants/app';
import { useSettingsContext } from '@/context/settings';
import { useResponsive } from '@/hooks/useResponsive';
import { bgBlur } from '@/styles/theme/css';

export const NavToggleButton = ({ sx, ...props }: IconButtonProps) => {
  const { onUpdate, themeLayout } = useSettingsContext();
  const lgUp = useResponsive('up', 'lg');
  const theme = useTheme();

  if (!lgUp) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={() => onUpdate('themeLayout', themeLayout === 'vertical' ? 'mini' : 'vertical')}
      sx={{
        p: 0.5,
        top: 32,
        position: 'fixed',
        left: NAV.W_VERTICAL - 12,
        zIndex: theme.zIndex.appBar + 1,
        border: `dashed 1px ${theme.palette.divider}`,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        '&:hover': {
          bgcolor: 'background.default',
        },
        ...sx,
      }}
      {...props}
    >
      <Iconify width={16} icon={themeLayout === 'vertical' ? 'eva:arrow-ios-back-fill' : 'eva:arrow-ios-forward-fill'} />
    </IconButton>
  );
};
