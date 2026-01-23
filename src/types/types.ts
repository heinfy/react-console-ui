export type WithFalse<T> = T | false;

export const sizeTypeMap = {
  large: 'large',
  middle: 'middle',
  small: 'small'
} as const;

export type SizeTypeMap = typeof sizeTypeMap;
