import { isReactClass } from './isReactClass';
import { IPublicTypeDynamicSetter } from '../shell/type/dynamic-setter';

/**
 * @deprecated use same function from '@rchh/lowcode-utils' instead
 */
export function isDynamicSetter(obj: any): obj is IPublicTypeDynamicSetter {
  return obj && typeof obj === 'function' && !isReactClass(obj);
}
