/**
 * Whether the expression is an atomic literal
 */
export function isLiteralAtomicExpr(expr: string): boolean {
  return (
    expr === 'null' ||
    expr === 'undefined' ||
    expr === 'true' ||
    expr === 'false' ||
    /^-?\d+(\.\d+)?$/.test(expr)
  );
}
