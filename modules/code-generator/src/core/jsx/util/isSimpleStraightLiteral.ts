import { Expression } from '@babel/types';

/** Whether the value is a simple straight literal */
export function isSimpleStraightLiteral(expr: Expression): boolean {
  switch (expr.type) {
    case 'BigIntLiteral':
    case 'BooleanLiteral':
    case 'DecimalLiteral':
    case 'NullLiteral':
    case 'NumericLiteral':
    case 'RegExpLiteral':
    case 'StringLiteral':
      return true;
    default:
      return false;
  }
}
