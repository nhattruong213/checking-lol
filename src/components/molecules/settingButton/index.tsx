import IconButton from '@mui/material/IconButton';

import { Iconify } from '@/components/atoms/iconify';
import { useSettingsContext } from '@/context/settings';

export const SettingsButton = () => {
  const settings = useSettingsContext();

  return (
    <IconButton
      aria-label="settings"
      onClick={settings.onToggle}
      sx={{
        width: 45,
        height: 45,
      }}
    >
      <Iconify icon="ic:baseline-settings" width={24} />
    </IconButton>
  );
};
