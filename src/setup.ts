import { setup } from 'goober';
import { prefix } from 'goober/prefixer';
import { shouldForwardProp } from 'goober/should-forward-prop';
import { createElement } from 'react';

import getConfig from './getConfig';

import type { StyleProps } from './types/quarkProps';

const stylePropPrefix = '$';
export const validateProp = (string: string): string is keyof StyleProps =>
  typeof string === 'string' && string.startsWith(stylePropPrefix);

const config = getConfig();
console.log(config);

const setupQuarks = () =>
  setup(
    createElement,
    prefix,
    undefined,
    shouldForwardProp(prop => !validateProp(prop)),
  );

export default setupQuarks;
