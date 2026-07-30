import { IPublicModelSettingField } from '@rchh/lowcode-types';
import { isObject } from '../is-object';

export function isSettingField(obj: any): obj is IPublicModelSettingField {
  if (!isObject(obj)) {
    return false;
  }

  return 'isSettingField' in obj && obj.isSettingField;
}
