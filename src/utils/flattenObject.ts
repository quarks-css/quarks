// see @https://stackoverflow.com/questions/69843406/flattening-a-nested-object-in-typescript-whilst-preserving-types#comment123459995_69843406
type FlattenObjectReturn<T extends object> = object extends T
  ? object
  : {
      [K in keyof T]-?: (
        x: NonNullable<T[K]> extends infer V
          ? V extends object
            ? V extends readonly any[]
              ? Pick<T, K>
              : FlattenObjectReturn<V> extends infer FV
              ? {
                  [P in keyof FV as `${Extract<K, string | number>}-${Extract<P, string | number>}`]: FV[P];
                }
              : never
            : Pick<T, K>
          : never,
      ) => void;
    } extends Record<keyof T, (y: infer O) => void>
  ? O extends infer _U
    ? { [K in keyof O]: O[K] }
    : never
  : never;

const flattenObject = <T extends object>(obj: T, parentKey?: string): FlattenObjectReturn<T> => {
  const result = Object.entries(obj).reduce<FlattenObjectReturn<T>>((prevValue, [key, value]) => {
    const newKey = parentKey ? (`${parentKey}-${String(key)}` as const) : key;
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      return { ...prevValue, ...flattenObject(value, String(newKey)) };
    }

    return { ...prevValue, [newKey]: value };
  }, {} as FlattenObjectReturn<T>);

  return result;
};

export default flattenObject;
