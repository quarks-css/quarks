import { customOverwrites } from 'src/theme/customOverwrites';

import { prefixedPseudoElements } from '../constants/pseudoElements';
import media from '../theme/breakpoints';

import type { valueof } from './typeUtils';

type customOverWriteValues = Parameters<valueof<typeof customOverwrites>>[number];

export const isCustomOverwrite = (
  prop: [string, unknown],
): prop is [keyof typeof customOverwrites, customOverWriteValues] => prop[0] in customOverwrites;

export const isMediaQuery = (prop: [string, unknown]): prop is [keyof typeof media, Record<string, unknown>] =>
  prop[0] in media;

export const isPseudo = (value: unknown): value is Record<string, unknown> => typeof value === 'object';

export const isPseudoElement = (propName: string) => prefixedPseudoElements.includes(propName);
