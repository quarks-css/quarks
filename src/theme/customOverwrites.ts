import flattenObject from '../utils/flattenObject';

import COLORS from './color';

const flattenedColors = flattenObject(COLORS);

export const customOverwrites = {
  $backgroundColor: (value: keyof typeof flattenedColors) => flattenedColors[value],
  $color: (value: keyof typeof flattenedColors) => flattenedColors[value],
};

type GetOverwriteValues<T> = {
  [P in keyof T]?: T[P] extends (...args: any) => string ? Parameters<T[P]>[0] : never;
};
export type OverwriteValues = GetOverwriteValues<typeof customOverwrites>;
