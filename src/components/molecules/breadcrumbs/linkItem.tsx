import { Link as LinkMui } from '@mui/material';
import Box from '@mui/material/Box';
import Link from 'next/link';

import { BreadcrumbsLinkProps } from './type';

type Props = {
  link: BreadcrumbsLinkProps;
  activeLast?: boolean;
  disabled: boolean;
};

export const LinkItem = ({ link, activeLast, disabled }: Props) => {
  const { name, href, icon } = link;

  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
      }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  );

  if (href) {
    return (
      <LinkMui component={Link} href={href} sx={styles}>
        {renderContent}
      </LinkMui>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
};
