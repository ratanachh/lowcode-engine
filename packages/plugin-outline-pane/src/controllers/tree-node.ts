import {
  IPublicTypeTitleContent,
  IPublicTypeLocationChildrenDetail,
  IPublicModelNode,
  IPublicTypeDisposable,
} from '@rchh/lowcode-types';
import { isI18nData, isLocationChildrenDetail, uniqueId } from '@rchh/lowcode-utils';
import EventEmitter from 'events';
import { Tree } from './tree';
import { IOutlinePanelPluginContext } from './tree-master';

/**
 * Outline tree filter result
 */
export interface FilterResult {
  // Whether the filter is active
  filterWorking: boolean;
  // Matched a child node
  matchChild: boolean;
  // Matched this node
  matchSelf: boolean;
  // keywords
  keywords: string;
}

enum EVENT_NAMES {
  filterResultChanged = 'filterResultChanged',

  expandedChanged = 'expandedChanged',

  hiddenChanged = 'hiddenChanged',

  lockedChanged = 'lockedChanged',

  titleLabelChanged = 'titleLabelChanged',

  expandableChanged = 'expandableChanged',

  conditionChanged = 'conditionChanged',
}

export default class TreeNode {
  readonly pluginContext: IOutlinePanelPluginContext;
  event = new EventEmitter();

  private _node: IPublicModelNode;

  readonly tree: Tree;

  private _filterResult: FilterResult = {
    filterWorking: false,
    matchChild: false,
    matchSelf: false,
    keywords: '',
  };

  /**
   * Collapsed by default
   * Set to expanded when initializing the root node
   */
  private _expanded = false;

  id = uniqueId('treeNode');

  get nodeId(): string {
    return this.node.id;
  }

  /**
   * Whether the node can expand
   */
  get expandable(): boolean {
    if (this.locked) return false;
    return this.hasChildren() || this.hasSlots() || this.dropDetail?.index != null;
  }

  get expanded(): boolean {
    return this.isRoot(true) || (this.expandable && this._expanded);
  }

  /**
   * Insert-line position info
   */
  get dropDetail(): IPublicTypeLocationChildrenDetail | undefined | null {
    const loc = this.pluginContext.project.getCurrentDocument()?.dropLocation;
    return loc && this.isResponseDropping() && isLocationChildrenDetail(loc.detail) ? loc.detail : null;
  }

  get depth(): number {
    return this.node.zLevel;
  }

  get detecting() {
    const doc = this.pluginContext.project.currentDocument;
    return !!(doc?.isDetectingNode(this.node));
  }

  get hidden(): boolean {
    const cv = this.node.isConditionalVisible();
    if (cv == null) {
      return !this.node.visible;
    }
    return !cv;
  }

  get locked(): boolean {
    return this.node.isLocked;
  }

  get selected(): boolean {
    // TODO: check is dragging
    const selection = this.pluginContext.project.getCurrentDocument()?.selection;
    if (!selection) {
      return false;
    }
    return selection?.has(this.node.id);
  }

  get title(): IPublicTypeTitleContent {
    return this.node.title;
  }

  get titleLabel() {
    let { title } = this;
    if (!title) {
      return '';
    }
    if ((title as any).label) {
      title = (title as any).label;
    }
    if (typeof title === 'string') {
      return title;
    }
    if (isI18nData(title)) {
      const currentLocale = this.pluginContext.getLocale();
      const currentTitle = title[currentLocale];
      return currentTitle;
    }
    return this.node.componentName;
  }

  get icon() {
    return this.node.componentMeta?.icon;
  }

  get parent(): TreeNode | null {
    const { parent } = this.node;
    if (parent) {
      return this.tree.getTreeNode(parent);
    }
    return null;
  }

  get slots(): TreeNode[] {
    // todo: shallowEqual
    return this.node.slots.map((node) => this.tree.getTreeNode(node));
  }

  get condition(): boolean {
    return this.node.hasCondition() && !this.node.conditionGroup;
  }

  get children(): TreeNode[] | null {
    return this.node.children?.map((node) => this.tree.getTreeNode(node)) || null;
  }

  get node(): IPublicModelNode {
    return this._node;
  }

  constructor(tree: Tree, node: IPublicModelNode) {
    this.tree = tree;
    this.pluginContext = tree.pluginContext;
    this._node = node;
  }

  setLocked(flag: boolean) {
    this.node.lock(flag);
    this.event.emit(EVENT_NAMES.lockedChanged, flag);
  }
  deleteNode(node: IPublicModelNode) {
    node && node.remove();
  }
  onFilterResultChanged(fn: () => void): IPublicTypeDisposable {
    this.event.on(EVENT_NAMES.filterResultChanged, fn);
    return () => {
      this.event.off(EVENT_NAMES.filterResultChanged, fn);
    };
  }
  onExpandedChanged(fn: (expanded: boolean) => void): IPublicTypeDisposable {
    this.event.on(EVENT_NAMES.expandedChanged, fn);
    return () => {
      this.event.off(EVENT_NAMES.expandedChanged, fn);
    };
  }
  onHiddenChanged(fn: (hidden: boolean) => void): IPublicTypeDisposable {
    this.event.on(EVENT_NAMES.hiddenChanged, fn);
    return () => {
      this.event.off(EVENT_NAMES.hiddenChanged, fn);
    };
  }
  onLockedChanged(fn: (locked: boolean) => void): IPublicTypeDisposable {
    this.event.on(EVENT_NAMES.lockedChanged, fn);
    return () => {
      this.event.off(EVENT_NAMES.lockedChanged, fn);
    };
  }

  onTitleLabelChanged(fn: (treeNode: TreeNode) => void): IPublicTypeDisposable {
    this.event.on(EVENT_NAMES.titleLabelChanged, fn);

    return () => {
      this.event.off(EVENT_NAMES.titleLabelChanged, fn);
    };
  }

  onConditionChanged(fn: (treeNode: TreeNode) => void): IPublicTypeDisposable {
    this.event.on(EVENT_NAMES.conditionChanged, fn);

    return () => {
      this.event.off(EVENT_NAMES.conditionChanged, fn);
    };
  }

  onExpandableChanged(fn: (expandable: boolean) => void): IPublicTypeDisposable {
    this.event.on(EVENT_NAMES.expandableChanged, fn);
    return () => {
      this.event.off(EVENT_NAMES.expandableChanged, fn);
    };
  }

  /**
   * Trigger the onExpandableChanged callback
   */
  notifyExpandableChanged(): void {
    this.event.emit(EVENT_NAMES.expandableChanged, this.expandable);
  }

  notifyTitleLabelChanged(): void {
    this.event.emit(EVENT_NAMES.titleLabelChanged, this.title);
  }

  notifyConditionChanged(): void {
    this.event.emit(EVENT_NAMES.conditionChanged, this.condition);
  }

  setHidden(flag: boolean) {
    if (this.node.conditionGroup) {
      return;
    }
    if (this.node.visible !== !flag) {
      this.node.visible = !flag;
    }
    this.event.emit(EVENT_NAMES.hiddenChanged, flag);
  }

  isFocusingNode(): boolean {
    const loc = this.pluginContext.project.getCurrentDocument()?.dropLocation;
    if (!loc) {
      return false;
    }
    return (
      isLocationChildrenDetail(loc.detail) && loc.detail.focus?.type === 'node' && loc.detail?.focus?.node.id === this.nodeId
    );
  }

  setExpanded(value: boolean) {
    this._expanded = value;
    this.event.emit(EVENT_NAMES.expandedChanged, value);
  }

  isRoot(includeOriginalRoot = false) {
    const rootNode = this.pluginContext.project.getCurrentDocument()?.root;
    return this.tree.root === this || (includeOriginalRoot && rootNode === this.node);
  }

  /**
   * Whether this is a drop-response zone
   */
  isResponseDropping(): boolean {
    const loc = this.pluginContext.project.getCurrentDocument()?.dropLocation;
    if (!loc) {
      return false;
    }
    return loc.target?.id === this.nodeId;
  }

  setTitleLabel(label: string) {
    const origLabel = this.titleLabel;
    if (label === origLabel) {
      return;
    }
    if (label === '') {
      this.node.getExtraProp('title', false)?.remove();
    } else {
      this.node.getExtraProp('title', true)?.setValue(label);
    }
    this.event.emit(EVENT_NAMES.titleLabelChanged, this);
  }

  /**
   * Whether this is a container that allows children to be dropped in
   */
  isContainer(): boolean {
    return this.node.isContainerNode;
  }

  /**
   * Whether the node has "slots"
   */
  hasSlots(): boolean {
    return this.node.hasSlots();
  }

  hasChildren(): boolean {
    return !!(this.isContainer() && this.node.children?.notEmptyNode);
  }

  select(isMulti: boolean) {
    const { node } = this;

    const selection = this.pluginContext.project.getCurrentDocument()?.selection;
    if (isMulti) {
      selection?.add(node.id);
    } else {
      selection?.select(node.id);
    }
  }

  /**
   * Expand the node, optionally expanding parents in order
   */
  expand(tryExpandParents = false) {
    // Do not rely on expanded alone; also check whether the node can expand
    // Using only expanded would miss non-expandable cases and still trigger expand
    if (this.expandable && !this._expanded) {
      this.setExpanded(true);
    }
    if (tryExpandParents) {
      this.expandParents();
    }
  }

  expandParents() {
    let p = this.node.parent;
    while (p) {
      this.tree.getTreeNode(p).setExpanded(true);
      p = p.parent;
    }
  }

  setNode(node: IPublicModelNode) {
    if (this._node !== node) {
      this._node = node;
    }
  }

  get filterReult(): FilterResult {
    return this._filterResult;
  }

  setFilterReult(val: FilterResult) {
    this._filterResult = val;
    this.event.emit(EVENT_NAMES.filterResultChanged);
  }
}
