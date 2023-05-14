import { validateProp } from './setup';
import media from './theme/breakpoints';
import { customOverwrites } from './theme/customOverwrites';
import { camelToKebabCase } from './utils/functions';
import { hasOwnProperty, objectEntries } from './utils/typeUtils';

import type { ThemeValues } from './theme/customOverwrites';
import type { ExtractFunctionsFromUnion, OverwriteProperties } from './utils/typeUtils';
import type { Properties } from 'csstype';
import type { CSSAttribute, DefaultTheme, Tagged, Theme } from 'goober';

type PrefixedProperties<T> = {
  [P in keyof T & string as `$${P}`]?: T[P];
};

type StyleProps = OverwriteProperties<PrefixedProperties<Properties>, ThemeValues>;

type StylingFunction = Tagged<
  JSX.LibraryManagedAttributes<'div', JSX.IntrinsicElements['div']> & StyleProps & Theme<DefaultTheme>
>;

type CallbackArg = ExtractFunctionsFromUnion<Parameters<StylingFunction>[number]>;

const createStylesFromProps = (props: CallbackArg): CSSAttribute =>
  objectEntries(props).reduce((prevValue, [propertyKey, value]) => {
    const key = camelToKebabCase(propertyKey.replaceAll('$', ''));
    // checks if prop is for styling
    if (validateProp(propertyKey)) {
      // checks if prop is something from customOverwrites
      if (hasOwnProperty(customOverwrites, propertyKey)) {
        const themeValue = customOverwrites[propertyKey](value);

        return {
          ...prevValue,
          [key]: themeValue,
        };
      }

      // checks if prop is a media query
      if (hasOwnProperty(media, propertyKey)) {
        return {
          ...prevValue,
          [media[propertyKey]]: createStylesFromProps(value),
        };
      }

      // checks if prop is pseudo-class or pseudo-element
      if (typeof value === 'object') {
        const extraColon = propertyKey.split('$').length > 2 ? ':' : '';

        return {
          ...prevValue,
          [`&:${extraColon}${key}`]: createStylesFromProps(value),
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
