import { Expression } from '@babel/types';
import generate from '@babel/generator';
import { IScope } from '../../../types';
import { parseExpressionConvertThis2Context } from '../../../utils/expressionParser';

/**
 * Replace all this.xxx with __$$context.xxx
 * @param expr
 */
export function transformThis2Context(
  expr: string | Expression,
  scope: IScope,
  { ignoreRootScope = false } = {},
): string {
  if (ignoreRootScope && scope.parent == null) {
    return typeof expr === 'string' ? expr : generate(expr).code;
  }

  // String replacement is simple but can mis-match complex cases; later switched to parse AST, mutate AST, then regenerate code
  // return expr
  //   .replace(/\bthis\.item\./g, () => 'item.')
  //   .replace(/\bthis\.index\./g, () => 'index.')
  //   .replace(/\bthis\./g, () => '__$$context.');
  return parseExpressionConvertThis2Context(
    expr,
    '__$$context',
    scope.bindings?.getAllBindings() || [],
  );
}
