import { readFileSync } from 'fs';

export const stringToKebabCase = (id: string) =>
  id
    .toLowerCase()
    .replace(/[^A-Za-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const toCamelCase = (string?: string | null) =>
  string
    ? string
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, '')
    : '';

type CamelToKebabCase<T extends string, A extends string> = T extends `${infer F}${infer R}`
  ? CamelToKebabCase<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A;

export const camelToKebabCase = <T extends string>(string: T) =>
  string.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase()) as CamelToKebabCase<
    T,
    string
  >;

export const readFromFile = <T extends any[]>(filepath: string): T => {
  const readerBuffer = readFileSync(filepath);

  return JSON.parse(readerBuffer.toString());
};
