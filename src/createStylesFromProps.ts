import { validateProp } from './setup';
import media from './theme/breakpoints';
import { customOverwrites } from './theme/customOverwrites';
import { camelToKebabCase } from './utils/functions';
import { hasOwnProperty, objectEntries } from './utils/typeUtils';

import type { ThemeValues } from './theme/customOverwrites';
import type { ExtractFunctionsFromUnion, OverwriteProperties, Prefix, valueof } from './utils/typeUtils';
import type { Properties } from 'csstype';
import type { CSSAttribute, DefaultTheme, Tagged, Theme } from 'goober';

type PrefixedProperties = Prefix<Properties, '$'>;

export type StyleProps = OverwriteProperties<PrefixedProperties, ThemeValues>;

export type QuarkProps<T extends keyof JSX.IntrinsicElements> = StyleProps &
  JSX.LibraryManagedAttributes<T, JSX.IntrinsicElements[T]> &
  Theme<DefaultTheme>;

type StylingFunction<T extends keyof JSX.IntrinsicElements> = Tagged<QuarkProps<T>>;

type PropsType<T extends keyof JSX.IntrinsicElements> = ExtractFunctionsFromUnion<
  Parameters<StylingFunction<T>>[number]
>;

const createStylesFromProps = <T extends keyof JSX.IntrinsicElements>(props: PropsType<T>): CSSAttribute =>
  objectEntries(props).reduce((prevValue, [propertyKey, value]) => {
    // checks if prop is for styling
    if (typeof propertyKey === 'string' && validateProp(propertyKey)) {
      const key = camelToKebabCase(propertyKey.replaceAll('$', ''));
      // checks if prop is something from customOverwrites
      if (hasOwnProperty(customOverwrites, propertyKey)) {
        const themeValue = customOverwrites[propertyKey](value as Parameters<valueof<typeof customOverwrites>>[0]);

        return {
          ...prevValue,
          [key]: themeValue,
        };
      }

      // checks if prop is a media query
      if (hasOwnProperty(media, propertyKey)) {
        return {
          ...prevValue,
          [media[propertyKey]]: createStylesFromProps(value as PropsType<T>),
        };
      }

      // checks if prop is pseudo-class or pseudo-element
      if (typeof value === 'object') {
        const extraColon = propertyKey.split('$').length > 2 ? ':' : '';

        return {
          ...prevValue,
          // @ts-expect-error: "Expression produces a union type that is too complex to represent", TODO: find solution
          [`&:${extraColon}${key}`]: createStylesFromProps(value as PropsType<T>),
        };
      }

      return {
        ...prevValue,
        [key]: value,
      };
    }

    return prevValue;
  }, {});

export default createStylesFromProps;
