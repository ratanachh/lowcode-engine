import { IPublicTypeJSSlot } from '../shell/type/value-type';

/**
 * @deprecated use same function from '@rchh/lowcode-utils' instead
 */
export function isJSSlot(data: any): data is IPublicTypeJSSlot {
  return data && data.type === 'JSSlot';
}
