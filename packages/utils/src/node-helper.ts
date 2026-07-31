// Types only
import { IPublicModelNode } from '@rchh/lowcode-types';
import { MouseEvent } from 'react';

export const getClosestNode = <Node extends IPublicModelNode = IPublicModelNode>(
  node: Node,
  until: (n: Node) => boolean,
  ): Node | undefined => {
  if (!node) {
    return undefined;
  }
  if (until(node)) {
    return node;
  } else {
    // @ts-ignore
    return getClosestNode(node.parent, until);
  }
};

/**
 * Whether the node can be clicked
 * @param {Node} node Node
 * @param {unknown} e Click event
 * @returns {boolean} Whether clickable; true means clickable
 */
export function canClickNode<Node extends IPublicModelNode = IPublicModelNode>(node: Node, e: MouseEvent): boolean {
  const onClickHook = node.componentMeta?.advanced?.callbacks?.onClickHook;
  const canClick = typeof onClickHook === 'function' ? onClickHook(e, node) : true;
  return canClick;
}
