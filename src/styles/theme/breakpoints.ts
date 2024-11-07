import { BreakpointsOptions } from '@mui/material';

type CustomBreakpointsType = {
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    mobile: number;
    laptop: number;
  };
  step: number;
} & BreakpointsOptions;

// Desktop first
export const breakpoints: CustomBreakpointsType = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    mobile: 768,
    laptop: 1280,
  },
  step: 0,
};
