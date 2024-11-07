import { Box, ClickAwayListener, IconButton, List, ListItemButton, ListItemText, Paper, Popper } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { Iconify } from '@/components/atoms/iconify';
import { MainCard } from '@/components/atoms/mainCard';
import { Transitions } from '@/components/atoms/transitions';
import { Locale } from '@/config';
import { LANGUGE_OPTIONS } from '@/constants/languageSelect';
import { setUserLocale } from '@/services/locale';

export const Language = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const locale = useLocale();
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState(locale);
  const t = useTranslations('Header');

  const handleListItemClick = (value: string) => {
    const locale = value as Locale;
    setUserLocale(locale);
    setOpen(false);
    setSelected(value);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  const iconSeleted = LANGUGE_OPTIONS.find((option) => option.key === locale)?.icon;

  return (
    <>
      <Box sx={{ flexShrink: 0, ml: 0.75 }}>
        <IconButton
          aria-label="open profile"
          ref={anchorRef}
          aria-controls={open ? 'profile-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            width: 45,
            height: 45,
            ...(open && {
              bgcolor: 'action.selected',
            }),
          }}
        >
          {iconSeleted && <Iconify icon={iconSeleted} sx={{ borderRadius: 0.65, width: 28 }} />}
        </IconButton>
        <Popper
          placement="bottom-end"
          open={open}
          anchorEl={anchorRef.current}
          disablePortal
          transition
          popperOptions={{
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [0, 9],
                },
              },
            ],
          }}
        >
          {({ TransitionProps }) => (
            <Transitions type="grow" position="top-right" in={open} {...TransitionProps}>
              <Paper sx={(theme) => ({ boxShadow: theme.customShadows.z4, width: 150 })}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
                      {LANGUGE_OPTIONS.map((val, index) => (
                        <ListItemButton key={index} selected={selected === val.code} onClick={() => handleListItemClick(val.code)}>
                          <Iconify icon={val.icon} sx={{ borderRadius: 0.65, width: 28 }} />
                          <ListItemText sx={{ ml: 1 }} primary={t(val.code)} />
                        </ListItemButton>
                      ))}
                    </List>
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            </Transitions>
          )}
        </Popper>
      </Box>
    </>
  );
};
