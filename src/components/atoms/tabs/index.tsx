import { styled, Tab as TabMui, tabClasses, TabProps, Tabs as TabsMui, TabsProps, Theme } from '@mui/material';

const StyledTabs = styled(TabsMui)(({ theme }) => {
  return {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.text.primary,
    },
    '& .MuiTabs-scrollButtons': {
      width: 48,
      borderRadius: '50%',
    },
  };
});

const StyledTab = styled(TabMui)(({ theme }: { theme: Theme }) => ({
  padding: 0,
  opacity: 1,
  minWidth: 48,
  minHeight: 48,
  fontWeight: theme.typography.fontWeightSemiBold,
  '&:not(:last-of-type)': {
    marginRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5),
    },
  },
  [`&:not(.${tabClasses.selected})`]: {
    color: theme.palette.text.secondary,
  },
  [`&.${tabClasses.selected}`]: {
    color: theme.palette.text.primary,
  },
}));

export const Tabs = (props: TabsProps) => {
  return <StyledTabs {...props} />;
};

export const Tab = (props: TabProps) => {
  return <StyledTab {...props} />;
};
