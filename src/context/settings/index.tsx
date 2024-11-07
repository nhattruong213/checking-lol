'use client';

import { isEqual } from 'lodash';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { SettingsContextProps, SettingValueProps } from '@/types/app';

type SettingProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingValueProps;
};

const STORAGE_KEY = 'settings';

export const SettingsContext = createContext({} as SettingsContextProps);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};

export const SettingProvider = (props: SettingProviderProps) => {
  const { children, defaultSettings } = props;
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);
  const [openDrawer, setOpenDrawer] = useState(false);

  //handle open/close drawer menu
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      canReset,
      onReset: reset,
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [reset, update, state, openDrawer, onCloseDrawer, onToggleDrawer]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
};
