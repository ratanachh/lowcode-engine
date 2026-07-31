import { getClosestNode, canClickNode } from '@rchh/lowcode-utils';
import { INode } from '../../document';

/**
 * Get the nearest clickable node from the current node
 * @param currentNode
 * @param event
 */
export const getClosestClickableNode = (
  currentNode: INode | undefined | null,
  event: MouseEvent,
) => {
  let node = currentNode;
  while (node) {
    // Check whether the current node is clickable
    let canClick = canClickNode(node, event);
    // eslint-disable-next-line no-loop-func
    const lockedNode = getClosestNode(node!, (n) => {
      // If the current node is locked, start searching from its parent
      return !!(node?.isLocked ? n.parent?.isLocked : n.isLocked);
    });
    if (lockedNode && lockedNode.getId() !== node.getId()) {
      canClick = false;
    }
    if (canClick) {
      break;
    }
    // For non-clickable nodes, keep walking upward
    node = node.parent;
  }
  return node;
};
