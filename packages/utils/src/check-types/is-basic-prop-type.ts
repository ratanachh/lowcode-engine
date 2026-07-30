import { IPublicTypeBasicType, IPublicTypePropType } from '@rchh/lowcode-types';

export function isBasicPropType(propType: IPublicTypePropType): propType is IPublicTypeBasicType {
  if (!propType) {
    return false;
  }
  return typeof propType === 'string';
}