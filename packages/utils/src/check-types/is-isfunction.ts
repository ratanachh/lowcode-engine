import { IPublicTypeJSFunction } from '@rchh/lowcode-types';
import { isObject } from '../is-object';

interface InnerJsFunction {
  type: 'JSExpression';
  source: string;
  value: string;
  extType: 'function';
}

/**
 *  Internal { type: 'JSExpression', source: '', value: '', extType: 'function' } is equivalent to JSFunction
 */
export function isInnerJsFunction(data: any): data is InnerJsFunction {
  if (!isObject(data)) {
    return false;
  }
  return data.type === 'JSExpression' && data.extType === 'function';
}

export function isJSFunction(data: any): data is IPublicTypeJSFunction {
  if (!isObject(data)) {
    return false;
  }
  return data.type === 'JSFunction' || isInnerJsFunction(data);
}
