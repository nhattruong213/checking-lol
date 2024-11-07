import { alpha, Theme } from '@mui/material';

type BgBlurProps = {
  blur?: number;
  opacity?: number;
  color?: string;
  imgUrl?: string;
};

type BgGradientProps = {
  direction?: string;
  color?: string;
  startColor?: string;
  endColor?: string;
  imgUrl?: string;
};

export const bgBlur = (props?: BgBlurProps) => {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    } as const;
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
};

export function bgGradient(props?: BgGradientProps) {
  const direction = props?.direction || 'to bottom';
  const startColor = props?.startColor;
  const endColor = props?.endColor;
  const imgUrl = props?.imgUrl;
  const color = props?.color;

  if (imgUrl) {
    return {
      background: `linear-gradient(${direction}, ${startColor || color}, ${endColor || color}), url(${imgUrl})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    };
  }

  return {
    background: `linear-gradient(${direction}, ${startColor}, ${endColor})`,
  };
}

export const paper = ({ theme, bgcolor, dropdown }: { theme: Theme; bgcolor?: string; dropdown?: boolean }) => ({
  ...bgBlur({
    blur: 20,
    opacity: 0.9,
    color: theme.palette.background.paper,
    ...(!!bgcolor && {
      color: bgcolor,
    }),
  }),
  backgroundImage: 'url(/assets/cyan-blur.png), url(/assets/red-blur.png)',
  backgroundRepeat: 'no-repeat, no-repeat',
  backgroundPosition: 'top right, left bottom',
  backgroundSize: '50%, 50%',
  ...(theme.direction === 'rtl' && {
    backgroundPosition: 'top left, right bottom',
  }),
  ...(dropdown && {
    padding: theme.spacing(0.5),
    boxShadow: theme.customShadows.dropdown,
    borderRadius: theme.shape.borderRadius * 1.25,
  }),
});

export function textGradient(value: string) {
  return {
    background: `-webkit-linear-gradient(${value})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
}
