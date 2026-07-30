import { IPublicTypePropType, IPublicTypeRequiredType } from '@rchh/lowcode-types';

export function isRequiredPropType(propType: IPublicTypePropType): propType is IPublicTypeRequiredType {
  if (!propType) {
    return false;
  }
  return typeof propType === 'object' && propType.type && ['array', 'bool', 'func', 'number', 'object', 'string', 'node', 'element', 'any'].includes(propType.type);
}