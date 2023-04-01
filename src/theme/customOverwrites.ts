import flattenObject from 'src/utils/flattenObject';

import COLORS from './color';

const flattenedColors = flattenObject(COLORS);

export const customOverwrites = {
  $backgroundColor: (value: keyof typeof flattenedColors) => flattenedColors[value],
  $color: (value: keyof typeof flattenedColors) => flattenedColors[value],
};

type GetThemeValues<T> = {
  [P in keyof T]?: T[P] extends (...args: any) => string ? Parameters<T[P]>[0] : never;
};
export type ThemeValues = GetThemeValues<typeof customOverwrites>;
