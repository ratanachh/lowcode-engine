import { IPublicTypeJSSlot, isJSSlot, IPublicTypeNodeData } from '@rchh/lowcode-types';
import { CodeGeneratorError, NodeGenerator, IScope } from '../types';
import { unwrapJsExprQuoteInJsx } from './jsxHelpers';

function generateSingleLineComment(commentText: string): string {
  return `/* ${commentText.split('\n').join(' ').replace(/\*\//g, '*-/')}*/`;
}

export function generateJsSlot(slot: any, scope: IScope, generator: NodeGenerator<string>): string {
  if (isJSSlot(slot)) {
    const { title, params, value } = slot as IPublicTypeJSSlot;

    // Slots can be with or without parameters
    // - A parameterized slot is like a render function and needs a child scope
    // - A parameterless slot is like a JSX node and needs no child scope
    const slotScope = params ? scope.createSubScope(params || []) : scope;
    const contentExpr = !value
      ? 'null'
      : generateNodeDataOrArrayForJsSlot(value, generator, slotScope);
    if (params) {
      return [
        title && generateSingleLineComment(title),
        '(',
        (params || []).join(', '),
        ') => ((__$$context) => (',
        contentExpr,
        '))(',
        `  __$$createChildContext(__$$context, { ${(params || []).join(', ')} }`,
        '))',
      ]
        .filter(Boolean)
        .join('');
    }

    return contentExpr || '[]';
  }

  throw new CodeGeneratorError('Not a JSSlot');
}

function generateNodeDataOrArrayForJsSlot(
  value: IPublicTypeNodeData | IPublicTypeNodeData[],
  generator: NodeGenerator<string>,
  scope: IScope,
) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }

    if (value.length === 1) {
      return unwrapJsExprQuoteInJsx(generator(value, scope)) || 'null';
    }

    return `[\n${
      value
        .map((v) => {
          if (typeof v === 'string') {
            return JSON.stringify(v);
          }

          return unwrapJsExprQuoteInJsx(generator(v, scope)) || 'null';
        })
        .join(',\n') || 'null'
    }\n]`;
  }

  return unwrapJsExprQuoteInJsx(generator(value, scope)) || 'null';
}
