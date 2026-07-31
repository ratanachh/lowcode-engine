import TreeNode from '../controllers/tree-node';

export const FilterType = {
  CONDITION: 'CONDITION',
  LOOP: 'LOOP',
  LOCKED: 'LOCKED',
  HIDDEN: 'HIDDEN',
};

export const FILTER_OPTIONS = [{
  value: FilterType.CONDITION,
  label: 'Conditional rendering',
}, {
  value: FilterType.LOOP,
  label: 'Loop rendering',
}, {
  value: FilterType.LOCKED,
  label: 'Locked',
}, {
  value: FilterType.HIDDEN,
  label: 'Hidden',
}];

export const matchTreeNode = (
  treeNode: TreeNode,
  keywords: string,
  filterOps: string[],
): boolean => {
  // Invalid node
  if (!treeNode || !treeNode.node) {
    return false;
  }

  // Empty filter: reset filter results
  if (!keywords && filterOps.length === 0) {
    treeNode.setFilterReult({
      filterWorking: false,
      matchChild: false,
      matchSelf: false,
      keywords: '',
    });

    (treeNode.children || []).concat(treeNode.slots || []).forEach((childNode) => {
      matchTreeNode(childNode, keywords, filterOps);
    });

    return false;
  }

  const { node } = treeNode;

  // Matched filter option
  const matchFilterOps = filterOps.length === 0 || !!filterOps.find((op: string) => {
    switch (op) {
      case FilterType.CONDITION:
        return node.hasCondition();
      case FilterType.LOOP:
        return node.hasLoop();
      case FilterType.LOCKED:
        return treeNode.locked;
      case FilterType.HIDDEN:
        return treeNode.hidden;
      default:
        return false;
    }
  });

  // Matched node name
  const matchKeywords = typeof treeNode.titleLabel === 'string' && treeNode.titleLabel.indexOf(keywords) > -1;

  // Show only when both conditions match (root always matches)
  const matchSelf = treeNode.isRoot() || (matchFilterOps && matchKeywords);

  // Matched a child node
  const matchChild = !!(treeNode.children || []).concat(treeNode.slots || [])
    .map((childNode: TreeNode) => {
      return matchTreeNode(childNode, keywords, filterOps);
    }).find(Boolean);

  // If a child matches, expand this node
  if (matchChild && treeNode.expandable) {
    treeNode.setExpanded(true);
  }

  treeNode.setFilterReult({
    filterWorking: true,
    matchChild,
    matchSelf,
    keywords,
  });

  return matchSelf || matchChild;
};
