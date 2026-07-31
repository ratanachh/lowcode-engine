import { IScope } from '../../../types';
import { parseExpression } from '../../../utils/expressionParser';
import { isLiteralAtomicExpr } from '../util/isLiteralAtomicExpr';
import { isSimpleStraightLiteral } from '../util/isSimpleStraightLiteral';
import { transformThis2Context } from './transformThis2Context';

export function transformJsExpr(
  expr: string,
  scope: IScope,
  { dontWrapEval = false, dontTransformThis2ContextAtRootScope = false } = {},
) {
  if (!expr) {
    return 'undefined';
  }

  if (isLiteralAtomicExpr(expr)) {
    return expr;
  }

  const exprAst = parseExpression(expr);

  // For these relatively safe literals, return the expression directly without wrapping
  if (isSimpleStraightLiteral(exprAst)) {
    return expr;
  }

  if (dontWrapEval) {
    return transformThis2Context(exprAst, scope, {
      ignoreRootScope: dontTransformThis2ContextAtRootScope,
    });
  }

  switch (exprAst.type) {
    // For a bare function, no wrapping is needed since it will not throw
    case 'ArrowFunctionExpression':
    case 'FunctionExpression':
      return transformThis2Context(exprAst, scope, {
        ignoreRootScope: dontTransformThis2ContextAtRootScope,
      });

    default:
      break;
  }

  // Everything else needs wrapping
  return `__$$eval(() => (${transformThis2Context(exprAst, scope, {
    ignoreRootScope: dontTransformThis2ContextAtRootScope,
  })}))`;
}
