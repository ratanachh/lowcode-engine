import { IPublicTypeJSONValue, IPublicTypeJSExpression, IPublicTypeJSFunction, IPublicTypeJSSlot, IPublicTypeCompositeArray, IPublicTypeCompositeObject } from './';

/**
 * Composite type
 */
export type IPublicTypeCompositeValue = IPublicTypeJSONValue |
  IPublicTypeJSExpression |
  IPublicTypeJSFunction |
  IPublicTypeJSSlot |
  IPublicTypeCompositeArray |
  IPublicTypeCompositeObject;
