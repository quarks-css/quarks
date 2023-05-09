// part and slotted not currently supported by quarks
const PSEUDO_ELEMENTS = [
  '::after',
  '::backdrop',
  '::before',
  '::cue',
  '::cue-region',
  '::first-letter',
  '::first-line',
  '::file-selector-button',
  '::grammar-error',
  '::marker',
  // '::part()',
  '::placeholder',
  '::selection',
  // '::slotted()',
  '::spelling-error',
  '::target-text',
];

export const prefixedPseudoElements = PSEUDO_ELEMENTS.map(pseudoEle => pseudoEle.replace('::', '$'));

export default PSEUDO_ELEMENTS;
