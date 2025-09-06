import type { Options } from 'change-case'
import { constantCase as changeCaseConstant } from 'change-case/keys'

/** From https://stackoverflow.com/a/76675889 */
/** Converts a string to camel-case based on some delimiter */
type CamelCaseFrom<S extends string, Delimiter extends string> = CamelCaseFromHelper<S, Delimiter>

type CamelCaseFromHelper<S extends string, Delimiter extends string, NotFirstToken extends boolean = false>
  = NotFirstToken extends true
    ? S extends `${infer P1}${Delimiter}${infer P2}`
      ? `${Capitalize<Lowercase<P1>>}${CamelCaseFromHelper<P2, Delimiter, true>}`
      : `${Capitalize<Lowercase<S>>}`
    : S extends `${infer P1}${Delimiter}${infer P2}`
      ? `${Lowercase<P1>}${CamelCaseFromHelper<P2, Delimiter, true>}`
      : `${Lowercase<S>}`

/** Convert an object's keys to camel-case based on some delimiter */
export type KeysToCamelCase<T, Delimiter extends string> = {
  [K in keyof T as CamelCaseFrom<string & K, Delimiter>]:
  T[K] extends Array<infer ArrayElement>
    ? KeysToCamelCaseForArrayElement<ArrayElement, Delimiter>
    : T[K] extends object
      ? KeysToCamelCase<T[K], Delimiter>
      : T[K];
}

/** Handles selecting keys from nested arrays */
type KeysToCamelCaseForArrayElement<AElement, Delimiter extends string>
  = AElement extends Array<infer BElement>
    ? Array<KeysToCamelCaseForArrayElement<BElement, Delimiter>>
    : Array<KeysToCamelCase<AElement, Delimiter>>

export type CamelCaseFromKebabCase<S extends string> = CamelCaseFrom<S, '-'>
export type CamelCaseFromSnakeCase<S extends string> = CamelCaseFrom<S, '_'>

/** Adapted from https://gist.github.com/kuroski/9a7ae8e5e5c9e22985364d1ddbf3389d  */
type CamelToConstantCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Uppercase<T>}${CamelToConstantCase<U>}`
  : S

/** Adapted from https://stackoverflow.com/a/76675889 */
export type KeysToConstantCase<T> = {
  [K in keyof T as CamelToConstantCase<string & K>]:
  T[K] extends Array<infer ArrayElement>
    ? KeysToConstantCaseForArrayElement<ArrayElement>
    : T[K] extends object
      ? KeysToConstantCase<T[K]>
      : T[K];
}

type KeysToConstantCaseForArrayElement<AElement>
  = AElement extends Array<infer BElement>
    ? Array<KeysToConstantCaseForArrayElement<BElement>>
    : Array<KeysToConstantCase<AElement>>

export const constantCase
  = <T>(object: T, depth?: number, options?: Options): KeysToConstantCase<T> =>
    changeCaseConstant(object, depth, options) as KeysToConstantCase<T>
