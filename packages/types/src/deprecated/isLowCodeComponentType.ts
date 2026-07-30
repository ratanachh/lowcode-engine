import { isProCodeComponentType } from './isProCodeComponentType';
import { IPublicTypeComponentMap, IPublicTypeLowCodeComponent } from '../shell/type/npm';

/**
 * @deprecated use same function from '@rchh/lowcode-utils' instead
 */
export function isLowCodeComponentType(desc: IPublicTypeComponentMap): desc is IPublicTypeLowCodeComponent {
  return !isProCodeComponentType(desc);
}
