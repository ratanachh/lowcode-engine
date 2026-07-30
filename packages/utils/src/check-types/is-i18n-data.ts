import { IPublicTypeI18nData } from '@rchh/lowcode-types';
import { isObject } from '../is-object';

export function isI18nData(obj: any): obj is IPublicTypeI18nData {
  if (!isObject(obj)) {
    return false;
  }
  return obj.type === 'i18n';
}
