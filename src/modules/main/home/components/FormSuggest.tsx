import { InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { useState } from 'react';

import { varFade } from '@/components/atoms/animate/variants';
import { Iconify } from '@/components/atoms/iconify';
import { AutoComplated } from '@/components/molecules/autoCompleted';
import { HEADER } from '@/constants/app';
import { useResponsive } from '@/hooks/useResponsive';

import { useSuggest } from './hooks/useSuggest';
import { StyledTextGradient } from './style';

export const FormSuggest = () => {
  const [value, setValue] = useState('');
  const [autoComplated, setAutoComplated] = useState(false);
  const { account, version, isLoading } = useSuggest(value);
  const mdUp = useResponsive('up', 'md');
  const handleFocus = () => {
    setAutoComplated(true);
  };

  const handleBlur = () => {
    const timer = setTimeout(() => {
      setAutoComplated(false);
    }, 200);

    return () => clearTimeout(timer);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        mx: 'auto',
        maxWidth: 480,
        mt: {
          md: `-${HEADER.H_DESKTOP}px`,
        },
      }}
    >
      <m.div variants={varFade().in}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
          }}
        >
          {'League of legends'}
        </Typography>
      </m.div>
      <m.div variants={varFade().in}>
        <StyledTextGradient
          animate={mdUp ? { backgroundPosition: '200% center' } : {}}
          transition={
            mdUp
              ? {
                  repeatType: 'reverse',
                  ease: 'linear',
                  duration: 10,
                  repeat: Infinity,
                  repeatDelay: 5,
                }
              : undefined
          }
        >
          {'FF'}
        </StyledTextGradient>
      </m.div>

      <m.div style={{ width: '100%' }} variants={varFade().in}>
        <Stack sx={{ marginBottom: 4, width: '100%', position: 'relative' }}>
          <TextField
            fullWidth
            value={value}
            sx={(theme) => ({
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Iconify width={25} icon="arcticons:emoji-search"></Iconify>
                </InputAdornment>
              ),
            }}
            placeholder="Name player, i.e. player#VN1"
            name="search"
            variant="outlined"
            margin="normal"
            onChange={handleOnChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
          />
          {autoComplated && version && <AutoComplated searchValue={value} account={account} version={version} isLoading={isLoading} />}
        </Stack>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {
            'FF - Nền tảng theo dõi và phân tích lịch sử đấu Liên Minh Huyền Thoại hàng đầu. Dễ dàng tra cứu thông tin người chơi, thống kê chi tiết trận đấu, và theo dõi xếp hạng một cách nhanh chóng.'
          }
        </Typography>
      </m.div>
    </Stack>
  );
};
