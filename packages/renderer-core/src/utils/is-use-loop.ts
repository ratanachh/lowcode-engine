import { IPublicTypeJSExpression } from '@rchh/lowcode-types';
import { isJSExpression } from '@rchh/lowcode-utils';

// 1. In render mode, if loop is an array, render by array length
// 2. In design mode, loop must have length > 0 and render in loop mode so the node remains editable
export default function isUseLoop(loop: null | any[] | IPublicTypeJSExpression, isDesignMode: boolean): boolean {
  if (isJSExpression(loop)) {
    return true;
  }

  if (!isDesignMode) {
    return true;
  }

  if (!Array.isArray(loop)) {
    return false;
  }

  return loop.length > 0;
}
