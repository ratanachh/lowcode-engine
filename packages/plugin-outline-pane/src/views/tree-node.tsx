import { PureComponent } from 'react';
import classNames from 'classnames';
import TreeNode from '../controllers/tree-node';
import TreeTitle from './tree-title';
import TreeBranches from './tree-branches';
import { IconEyeClose } from '../icons/eye-close';
import { IPublicModelModalNodesManager, IPublicTypeDisposable } from '@rchh/lowcode-types';
import { IOutlinePanelPluginContext } from '../controllers/tree-master';

class ModalTreeNodeView extends PureComponent<{
  treeNode: TreeNode;
}, {
  treeChildren: TreeNode[] | null;
}> {
  private modalNodesManager: IPublicModelModalNodesManager | undefined | null;
  readonly pluginContext: IOutlinePanelPluginContext;

  constructor(props: {
    treeNode: TreeNode;
  }) {
    super(props);

    // Modal manager object
    this.pluginContext = props.treeNode.pluginContext;
    const { project } = this.pluginContext;
    this.modalNodesManager = project.currentDocument?.modalNodesManager;
    this.state = {
      treeChildren: this.rootTreeNode.children,
    };
  }

  hideAllNodes() {
    this.modalNodesManager?.hideModalNodes();
  }

  componentDidMount(): void {
    const { rootTreeNode } = this;
    rootTreeNode.onExpandableChanged(() => {
      this.setState({
        treeChildren: rootTreeNode.children,
      });
    });
  }

  get rootTreeNode() {
    const { treeNode } = this.props;
    // When a new root is specified, modal nodes must still be fetched from the original root
    const { project } = this.pluginContext;
    const rootNode = project.currentDocument?.root;
    const rootTreeNode = treeNode.tree.getTreeNode(rootNode!);

    return rootTreeNode;
  }

  render() {
    const { rootTreeNode } = this;
    const { expanded } = rootTreeNode;

    const hasVisibleModalNode = !!this.modalNodesManager?.getVisibleModalNode();
    return (
      <div className="tree-node-modal">
        <div className="tree-node-modal-title">
          <span>{this.pluginContext.intlNode('Modal View')}</span>
          <div
            className="tree-node-modal-title-visible-icon"
            onClick={this.hideAllNodes.bind(this)}
          >
            {hasVisibleModalNode ? <IconEyeClose /> : null}
          </div>
        </div>
        <div className="tree-pane-modal-content">
          <TreeBranches
            treeNode={rootTreeNode}
            treeChildren={this.state.treeChildren}
            expanded={expanded}
            isModal
          />
        </div>
      </div>
    );
  }
}

export default class TreeNodeView extends PureComponent<{
  treeNode: TreeNode;
  isModal?: boolean;
  isRootNode?: boolean;
}> {
  state: {
    expanded: boolean;
    selected: boolean;
    hidden: boolean;
    locked: boolean;
    detecting: boolean;
    isRoot: boolean;
    highlight: boolean;
    dropping: boolean;
    conditionFlow: boolean;
    expandable: boolean;
    treeChildren: TreeNode[] | null;
    filterWorking: boolean;
    matchChild: boolean;
    matchSelf: boolean;
  } = {
    expanded: false,
    selected: false,
    hidden: false,
    locked: false,
    detecting: false,
    isRoot: false,
    highlight: false,
    dropping: false,
    conditionFlow: false,
    expandable: false,
    treeChildren: [],
    filterWorking: false,
    matchChild: false,
    matchSelf: false,
  };

  eventOffCallbacks: Array<IPublicTypeDisposable | undefined> = [];
  constructor(props: any) {
    super(props);

    const { treeNode, isRootNode } = this.props;
    this.state = {
      expanded: isRootNode ? true : treeNode.expanded,
      selected: treeNode.selected,
      hidden: treeNode.hidden,
      locked: treeNode.locked,
      detecting: treeNode.detecting,
      isRoot: treeNode.isRoot(),
      // Whether it is drop-responsive
      dropping: treeNode.dropDetail?.index != null,
      conditionFlow: treeNode.node.conditionGroup != null,
      highlight: treeNode.isFocusingNode(),
      expandable: treeNode.expandable,
      treeChildren: treeNode.children,
    };
  }

  componentDidMount() {
    const { treeNode } = this.props;
    const { project } = treeNode.pluginContext;

    const doc = project.currentDocument;

    treeNode.onExpandedChanged(((expanded: boolean) => {
      this.setState({ expanded });
    }));
    treeNode.onHiddenChanged((hidden: boolean) => {
      this.setState({ hidden });
    });
    treeNode.onLockedChanged((locked: boolean) => {
      this.setState({ locked });
    });
    treeNode.onExpandableChanged((expandable: boolean) => {
      this.setState({
        expandable,
        treeChildren: treeNode.children,
      });
    });
    treeNode.onFilterResultChanged(() => {
      const { filterWorking: newFilterWorking, matchChild: newMatchChild, matchSelf: newMatchSelf } = treeNode.filterReult;
      this.setState({ filterWorking: newFilterWorking, matchChild: newMatchChild, matchSelf: newMatchSelf });
    });
    this.eventOffCallbacks.push(
      doc?.onDropLocationChanged(() => {
        this.setState({
          dropping: treeNode.dropDetail?.index != null,
        });
      }),
    );

    const offSelectionChange = doc?.selection?.onSelectionChange(() => {
      this.setState({ selected: treeNode.selected });
    });
    this.eventOffCallbacks.push(offSelectionChange!);
    const offDetectingChange = doc?.detecting?.onDetectingChange(() => {
      this.setState({ detecting: treeNode.detecting });
    });
    this.eventOffCallbacks.push(offDetectingChange!);
  }
  componentWillUnmount(): void {
    this.eventOffCallbacks?.forEach((offFun: IPublicTypeDisposable | undefined) => {
      offFun && offFun();
    });
  }

  shouldShowModalTreeNode(): boolean {
    const { treeNode, isRootNode } = this.props;
    if (!isRootNode) {
      // Show modal nodes only under the current tree's root
      return false;
    }

    // When a new root is specified, modal nodes must still be fetched from the original root
    const { project } = treeNode.pluginContext;
    const rootNode = project.currentDocument?.root;
    const rootTreeNode = treeNode.tree.getTreeNode(rootNode!);
    const modalNodes = rootTreeNode.children?.filter((item) => {
      return item.node.componentMeta?.isModal;
    });
    return !!(modalNodes && modalNodes.length > 0);
  }

  render() {
    const { treeNode, isModal, isRootNode } = this.props;
    const className = classNames('tree-node', {
      // Whether expanded
      expanded: this.state.expanded,
      // Whether selected
      selected: this.state.selected,
      // Whether hidden
      hidden: this.state.hidden,
      // Whether locked
      locked: this.state.locked,
      // Whether hovered
      detecting: this.state.detecting,
      // Whether it is drop-responsive
      dropping: this.state.dropping,
      'is-root': this.state.isRoot,
      'condition-flow': this.state.conditionFlow,
      highlight: this.state.highlight,
    });
    let shouldShowModalTreeNode: boolean = this.shouldShowModalTreeNode();

    // Filter handling
    const { filterWorking, matchChild, matchSelf } = this.state;
    if (!isRootNode && filterWorking && !matchChild && !matchSelf) {
      // When filter is active, hide the node if neither it nor its descendants match
      // Root node is always shown
      return null;
    }
    return (
      <div
        className={className}
        data-id={treeNode.nodeId}
      >
        <TreeTitle
          treeNode={treeNode}
          isModal={isModal}
          expanded={this.state.expanded}
          hidden={this.state.hidden}
          locked={this.state.locked}
          expandable={this.state.expandable}
        />
        {shouldShowModalTreeNode &&
          <ModalTreeNodeView
            treeNode={treeNode}
          />
        }
        <TreeBranches
          treeNode={treeNode}
          isModal={false}
          expanded={this.state.expanded}
          treeChildren={this.state.treeChildren}
        />
      </div>
    );
  }
}
