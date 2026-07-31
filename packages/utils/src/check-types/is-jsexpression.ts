import { IPublicTypeJSExpression } from '@rchh/lowcode-types';
import { isObject } from '../is-object';

/**
 * Extra logic to avoid treating { type: 'JSExpression', extType: 'function' } as an expression.
 *
 * How functions are represented in the engine:
 *  Open-source: { type: 'JSFunction', source: '', value: '' }
 *  Internal: { type: 'JSExpression', source: '', value: '', extType: 'function' }
 *  Capabilities are equivalent, but open-source react-renderer only recognizes the first form, while internal (including Java / RE) only recognizes the second.
 * @param data
 * @returns
 */
export function isJSExpression(data: any): data is IPublicTypeJSExpression {
  if (!isObject(data)) {
    return false;
  }
  return data.type === 'JSExpression' && data.extType !== 'function';
}
