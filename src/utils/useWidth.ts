export const useWidth = (w: number, xs: Size, sm: Size, md: Size, lg: Size, lx: Size): any => {
  if (w >= 0 && w <= 300) {
    return xs;
  } else if (w >= 300 && w <= 500) {
    return sm;
  } else if (w >= 500 && w <= 700) {
    return md;
  } else if (w >= 700 && w <= 1024) {
    return lg;
  } else if (w >= 1024) {
    return lx;
  }
};

type Size = string | number