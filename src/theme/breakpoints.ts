import { objectEntries } from '../utils/typeUtils';

const DEFAULT_BREAKPOINTS = {
  xs: '375px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
} as const;

type CreateMedia<T extends typeof DEFAULT_BREAKPOINTS> = {
  [P in keyof T & string as `$${P}`]: T[P] extends string ? `@media screen and (min-width: ${T[P]})` : never;
};

type Media = CreateMedia<typeof DEFAULT_BREAKPOINTS>;

const media = objectEntries(DEFAULT_BREAKPOINTS).reduce(
  (prevValue, [breakpointKey, breakpointValue]) => ({
    ...prevValue,
    [`$${breakpointKey}`]: `@media screen and (min-width: ${breakpointValue})`,
  }),
  {} as Media,
);

export default media;
