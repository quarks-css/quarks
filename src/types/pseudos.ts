import type { Pseudos } from 'csstype';
import type { Replace } from 'src/utils/typeUtils';

type FilterPseudoTypes<T extends string, U extends string> = T extends `${U}${string}` ? T : never;

type PseudoElements = FilterPseudoTypes<Pseudos, '::'>;
type PseudoClasses = Exclude<Pseudos, PseudoElements>;

export type PseudoClassProps = Replace<PseudoClasses, ':', '$'>;
export type PseudoElementProps = Replace<PseudoElements, ':', '$'>;
