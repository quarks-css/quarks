import { validateProp } from './setup';
import media from './theme/breakpoints';
import { customOverwrites } from './theme/customOverwrites';
import { camelToKebabCase } from './utils/functions';
import { isPseudo, isPseudoElement } from './utils/pseudoUtils';
import { hasOwnProperty, objectEntries } from './utils/typeUtils';

import type { QuarkProps } from './types/quarkProps';
import type { ExtractFunctionsFromUnion, valueof } from './utils/typeUtils';
import type { CSSAttribute, Tagged } from 'goober';

type StylingFunction<T extends keyof JSX.IntrinsicElements> = Tagged<QuarkProps<T>>;

export type PropsType<T extends keyof JSX.IntrinsicElements> = ExtractFunctionsFromUnion<
  Parameters<StylingFunction<T>>[number]
>;

const createStylesFromProps = <T extends keyof JSX.IntrinsicElements>(props: PropsType<T>): CSSAttribute =>
  objectEntries(props).reduce((prevValue, [propName, value]) => {
    // checks if prop is for styling
    if (typeof propName !== 'string' || !validateProp(propName)) {
      return prevValue;
    }

    const key = camelToKebabCase(propName.replace('$', ''));
    // checks if prop is something from customOverwrites
    if (hasOwnProperty(customOverwrites, propName)) {
      const themeValue = customOverwrites[propName](value as Parameters<valueof<typeof customOverwrites>>[0]);

      return {
        ...prevValue,
        [key]: themeValue,
      };
    }

    // checks if prop is a media query
    if (hasOwnProperty(media, propName)) {
      return {
        ...prevValue,
        [media[propName]]: createStylesFromProps(value as PropsType<T>),
      };
    }

    // checks if prop is pseudo-class or pseudo-element
    if (isPseudo(value)) {
      const extraColon = isPseudoElement(propName) ? ':' : '';

      return {
        ...prevValue,
        [`&:${extraColon}${key}`]: createStylesFromProps(value),
      };
    }

    return {
      ...prevValue,
      [key]: value,
    };
  }, {});

export default createStylesFromProps;
