import type { PseudoClassProps, PseudoElementProps } from './pseudos';
import type media from '../theme/breakpoints';
import type { OverwriteValues } from '../theme/customOverwrites';
import type { OverwriteProperties, Prefix } from '../utils/typeUtils';
import type { Properties } from 'csstype';
import type { DefaultTheme, Theme } from 'goober';

type PrefixedProperties = Prefix<Properties, '$'>;

type DirectStyleProps = OverwriteProperties<PrefixedProperties, OverwriteValues>;

type StyleProps = DirectStyleProps & {
  [P in keyof typeof media]?: StyleProps;
} & {
  [P in PseudoClassProps]?: StyleProps;
} & {
  [P in PseudoElementProps]?: StyleProps;
};

export type QuarkProps<T extends keyof JSX.IntrinsicElements> = StyleProps &
  JSX.LibraryManagedAttributes<T, JSX.IntrinsicElements[T]> &
  Theme<DefaultTheme>;
