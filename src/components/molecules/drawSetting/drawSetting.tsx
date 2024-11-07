'use client';

// @mui
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { Iconify } from '@/components/atoms/iconify';
import { SimpleBarScroll } from '@/components/atoms/simpleBar';
import { useSettingsContext } from '@/context/settings';
import { paper } from '@/styles/theme/css';

import { BaseOptions } from './baseOption';
import { PresetsOptions } from './presetsOption';

export const SettingsDrawer = () => {
  const theme = useTheme();
  const t = useTranslations('Settings');
  const settings = useSettingsContext();

  const labelStyles = {
    mb: 1.5,
    color: 'text.disabled',
    fontWeight: 'fontWeightSemiBold',
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2, pr: 1, pl: 2.5 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {t('settings')}
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={settings.onReset}>
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={settings.onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderMode = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        {t('mode')}
      </Typography>

      <BaseOptions
        value={settings.themeMode}
        onChange={(newValue: string) => settings.onUpdate('themeMode', newValue)}
        options={['light', 'dark']}
        icons={['sun', 'moon']}
      />
    </div>
  );

  const renderPresets = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        {t('presets')}
      </Typography>

      <PresetsOptions value={settings.themeColorPresets} onChange={(newValue: string) => settings.onUpdate('themeColorPresets', newValue)} />
    </div>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.open}
      onClose={settings.onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({ theme, bgcolor: theme.palette.background.default }),
          width: 280,
        },
      }}
    >
      {renderHead}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <SimpleBarScroll>
        <Stack spacing={3} sx={{ p: 3 }}>
          {renderMode}
          {renderPresets}
        </Stack>
      </SimpleBarScroll>
    </Drawer>
  );
};
