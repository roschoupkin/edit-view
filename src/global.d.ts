interface ObjectConstructor {
  keys<T extends Record<string, unknown>>(o: T): Array<keyof T>;
  entries<K extends string, T extends unknown>(o: Record<K, T>): Array<[K, T]>;
}
