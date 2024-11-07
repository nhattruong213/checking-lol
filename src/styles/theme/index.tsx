'use client';

import { ThemeProvider as MuiThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import createTheme, { ThemeOptions } from '@mui/material/styles/createTheme';
import { merge } from 'lodash';
import { useMemo } from 'react';

import { useSettingsContext } from '@/context/settings';

import { customShadows } from './customShadows';
import { NextAppDirEmotionCacheProvider } from './nextEmotionCache';
import { darkMode } from './options/darkMode';
import { presets } from './options/presets';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const settings = useSettingsContext();
  const darkModeOption = darkMode(settings.themeMode);
  const presetsOption = presets(settings.themeColorPresets);

  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const memoizedValue = useMemo(() => merge(baseOption, darkModeOption, presetsOption), [baseOption, darkModeOption, presetsOption]);
  const theme = createTheme(memoizedValue as ThemeOptions);

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
};
