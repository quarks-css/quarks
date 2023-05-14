import { styled } from 'goober';

import createStylesFromProps from './createStylesFromProps';

import type { QuarkProps } from './types/quarkProps';

// TODO: Remove type assertion on `props` by solving "Index signature for type 'string' is missing in type" from SVGProps
const quark = <T extends keyof JSX.IntrinsicElements>(tag: T) =>
  styled<QuarkProps<T>>(tag)(props => createStylesFromProps(props as Record<string, unknown>));

export default quark;
