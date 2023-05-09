import { prefixedPseudoElements } from '../constants/pseudoElements';

import type { PropsType } from '../createStylesFromProps';

export const isPseudo = <T extends keyof JSX.IntrinsicElements>(value: unknown): value is PropsType<T> =>
  typeof value === 'object';

export const isPseudoElement = (propName: string) => prefixedPseudoElements.includes(propName);
