import { styled } from 'goober';

import createStylesFromProps from './createStylesFromProps';

// @ts-expect-error TODO: add correct types
const quark = <T extends keyof JSX.IntrinsicElements>(tag: T) => styled(tag)(props => createStylesFromProps(props));

export default quark;
