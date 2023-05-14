import { setup } from 'goober';
import { prefix } from 'goober/prefixer';
import { shouldForwardProp } from 'goober/should-forward-prop';
import { createElement } from 'react';

import PROP_PREFIX from './constants/prefix';

import type { StyleProps } from './types/quarkProps';

export const validateProp = (string: string): string is keyof StyleProps =>
  typeof string === 'string' && string.startsWith(PROP_PREFIX);

const setupQuarks = () =>
  setup(
    createElement,
    prefix,
    undefined,
    shouldForwardProp(prop => !validateProp(prop)),
  );

export default setupQuarks;
