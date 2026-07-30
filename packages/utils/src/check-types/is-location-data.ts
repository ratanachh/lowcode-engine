import { IPublicTypeLocationData } from '@rchh/lowcode-types';
import { isObject } from '../is-object';

export function isLocationData(obj: any): obj is IPublicTypeLocationData {
  if (!isObject(obj)) {
    return false;
  }
  return 'target' in obj && 'detail' in obj;
}