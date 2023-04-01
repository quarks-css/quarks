import { setup } from 'goober';
import { prefix } from 'goober/prefixer';
import { shouldForwardProp } from 'goober/should-forward-prop';
import { createElement } from 'react';

import useTheme from './theme';

const stylePropPrefix = '$';
export const validateProp = (key: string) => key.startsWith(stylePropPrefix);

const setupGoober = () =>
  setup(
    createElement,
    prefix,
    useTheme,
    shouldForwardProp(prop => !validateProp(prop)),
  );

export default setupGoober;
