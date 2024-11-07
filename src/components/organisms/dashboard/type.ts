import { ListItemButtonProps, StackProps } from '@mui/material';

export type NavListProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: any;
};

export type NavConfigProps = {
  hiddenLabel?: boolean;
  itemGap?: number;
  iconSize?: number;
  itemRadius?: number;
  itemPadding?: string;
  currentRole?: string;
  itemSubHeight?: number;
  itemRootHeight?: number;
};

export type NavItemProps = ListItemButtonProps & {
  item: NavListProps;
  depth: number;
  open?: boolean;
  active: boolean;
  externalLink?: boolean;
};

export type NavSectionProps = StackProps & {
  data: {
    subheader: string;
    items: NavListProps[];
  }[];
};

export type GroupProps = {
  subheader: string;
  items: NavListProps[];
  config: NavConfigProps;
};
