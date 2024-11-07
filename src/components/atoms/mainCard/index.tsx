import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';
import { forwardRef, ReactNode, Ref } from 'react';

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode;
  content?: boolean;
  contentSX?: SxProps<Theme>;
  darkTitle?: boolean;
  elevation?: number;
  secondary?: ReactNode;
  shadow?: string;
  sx?: SxProps<Theme>;
  title?: ReactNode;
  [key: string]: any;
}

const headerSX = {
  p: 2.5,
  '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

export const MainCard = forwardRef(function MainCard(
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentSX = {},
    darkTitle,
    elevation,
    secondary,
    shadow,
    sx = {},
    title,
    ...others
  }: MainCardProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <Card
      elevation={elevation || 0}
      ref={ref}
      {...others}
      sx={(theme) => ({
        border: border ? '1px solid' : 'none',
        borderColor: theme.palette.grey[200],
        boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || `0px 2px 8px ${theme.palette.grey[900]}` : 'inherit',
        ':hover': {
          boxShadow: boxShadow ? shadow || `0px 2px 8px ${theme.palette.grey[900]}` : 'inherit',
        },
        '& pre': {
          m: 0,
          p: '16px !important',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.75rem',
        },
        ...sx,
      })}
    >
      {!darkTitle && title && <CardHeader sx={headerSX} titleTypographyProps={{ variant: 'subtitle1' }} title={title} action={secondary} />}
      {darkTitle && title && <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
});
