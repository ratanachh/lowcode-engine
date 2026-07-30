import { IPublicTypeJSFunction } from '../shell/type/value-type';

/**
 * @deprecated use same function from '@rchh/lowcode-utils' instead
 */
export function isJSFunction(x: any): x is IPublicTypeJSFunction {
  return typeof x === 'object' && x && x.type === 'JSFunction';
}
