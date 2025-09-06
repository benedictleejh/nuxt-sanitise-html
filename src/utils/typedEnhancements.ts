/** Adapted from https://stackoverflow.com/a/74823834 */
type Entries<T> = {
  [K in keyof T]-?: [K, NonNullable<T[K]>];
}[keyof T][]

declare global {
  interface ObjectConstructor {
    entries<T extends object>(o: T): Entries<T>
  }
}

export {}
