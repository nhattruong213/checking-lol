import { AppBar as AppBarMui, AppBarProps, styled } from '@mui/material';

const StyledAppBar = styled(AppBarMui)(() => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
}));

export const AppBar = (props: AppBarProps) => {
  return <StyledAppBar {...props} />;
};
