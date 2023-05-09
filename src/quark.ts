import { styled } from 'goober';

import createStylesFromProps from './createStylesFromProps';

import type { QuarkProps } from './types/quarkProps';

const quark = <T extends keyof JSX.IntrinsicElements>(tag: T) =>
  styled<QuarkProps<T>>(tag)(props => createStylesFromProps(props));

export default quark;
