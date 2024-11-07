import {
  Card as CardMui,
  CardContent as CardContentMui,
  CardContentProps,
  CardHeader as CardHeaderMui,
  CardHeaderProps,
  CardProps,
  styled,
  Theme,
} from '@mui/material';

const StyledCard = styled(CardMui)(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  boxShadow: theme.customShadows.card,
  borderRadius: theme.shape.borderRadius * 2,
  zIndex: 0,
}));

const StyledCardHeader = styled(CardHeaderMui)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(3, 3, 0),
}));

const StyledCardContent = styled(CardContentMui)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(3),
}));

export const Card = (props: CardProps) => {
  return <StyledCard {...props} />;
};

export const CardHeader = (props: CardHeaderProps) => {
  return <StyledCardHeader {...props} />;
};

export const CardContent = (props: CardContentProps) => {
  return <StyledCardContent {...props} />;
};
