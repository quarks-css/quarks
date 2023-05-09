import { validateProp } from './setup';
import media from './theme/breakpoints';
import { customOverwrites } from './theme/customOverwrites';
import { camelToKebabCase } from './utils/functions';
import { isCustomOverwrite, isMediaQuery, isPseudo, isPseudoElement } from './utils/propChecks';
import { objectEntries } from './utils/typeUtils';

import type { CSSAttribute } from 'goober';

const createStylesFromProps = (props: Record<string, unknown>): CSSAttribute =>
  objectEntries(props).reduce((prevValue, prop) => {
    const [propName, value] = prop;
    // checks if prop is for styling
    if (typeof propName !== 'string' || !validateProp(propName)) {
      return prevValue;
    }

    const key = camelToKebabCase(propName.replace('$', ''));
    // checks if prop is something from customOverwrites
    if (isCustomOverwrite(prop)) {
      const [overwriteKey, overwriteValue] = prop;
      const themeValue = customOverwrites[overwriteKey](overwriteValue);

      return {
        ...prevValue,
        [key]: themeValue,
      };
    }

    // checks if prop is a media query
    if (isMediaQuery(prop)) {
      const [mediaKey, mediaValue] = prop;

      return {
        ...prevValue,
        [media[mediaKey]]: createStylesFromProps(mediaValue),
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
