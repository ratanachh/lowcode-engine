import { ReactElement } from 'react';
import { IPublicTypeNodeSchema, IPublicTypeIconType, IPublicTypeI18nData, IPublicTypeCompositeValue, IPublicTypePropsMap, IPublicTypePropsList } from '../type';
import { IPublicEnumTransformStage } from '../enum';
import { IPublicModelNodeChildren, IPublicModelComponentMeta, IPublicModelProp, IPublicModelProps, IPublicModelSettingTopEntry, IPublicModelDocumentModel, IPublicModelExclusiveGroup } from './';

export interface IBaseModelNode<
  Document = IPublicModelDocumentModel,
  Node = IPublicModelNode,
  NodeChildren = IPublicModelNodeChildren,
  ComponentMeta = IPublicModelComponentMeta,
  SettingTopEntry = IPublicModelSettingTopEntry,
  Props = IPublicModelProps,
  Prop = IPublicModelProp,
  ExclusiveGroup = IPublicModelExclusiveGroup
> {

  /**
   * Node id
   * node id
   */
  id: string;

  /**
   * Node title
   * title of node
   */
  get title(): string | IPublicTypeI18nData | ReactElement;

  /**
   * @deprecated please use isContainerNode
   */
  get isContainer(): boolean;

  /**
   * Whether this is a container node
   * check if node is a container type node
   * @since v1.1.0
   */
  get isContainerNode(): boolean;

  /**
   * @deprecated please use isRootNode
   */
  get isRoot(): boolean;

  /**
   * Whether this is the root node
   * check if node is root in the tree
   * @since v1.1.0
   */
  get isRootNode(): boolean;

  /**
   * @deprecated please use isEmptyNode
   */
  get isEmpty(): boolean;

  /**
   * Whether this is an empty node (no children or children is empty)
   * check if current node is empty, which means no children or children is empty
   * @since v1.1.0
   */
  get isEmptyNode(): boolean;

  /**
   * @deprecated please use isPageNode
   * Whether this is a Page node
   */
  get isPage(): boolean;

  /**
   * Whether this is a Page node
   * check if node is Page
   * @since v1.1.0
   */
  get isPageNode(): boolean;

  /**
   * @deprecated please use isComponentNode
   */
  get isComponent(): boolean;

  /**
   * Whether this is a Component node
   * check if node is Component
   * @since v1.1.0
   */
  get isComponentNode(): boolean;

  /**
   * @deprecated please use isModalNode
   */
  get isModal(): boolean;

  /**
   * Whether this is a modal node
   * check if node is Modal
   * @since v1.1.0
   */
  get isModalNode(): boolean;

  /**
   * @deprecated please use isSlotNode
   */
  get isSlot(): boolean;

  /**
   * Whether this is a slot node
   * check if node is a Slot
   * @since v1.1.0
   */
  get isSlotNode(): boolean;

  /**
   * @deprecated please use isParentalNode
   */
  get isParental(): boolean;

  /**
   * Whether this is a parent/branch node
   * check if node a parental node
   * @since v1.1.0
   */
  get isParentalNode(): boolean;

  /**
   * @deprecated please use isLeafNode
   */
  get isLeaf(): boolean;

  /**
   * Whether this is a leaf node
   * check if node is a leaf node in tree
   * @since v1.1.0
   */
  get isLeafNode(): boolean;

  /**
   * Get the lock state of the current node
   * check if current node is locked
   * @since v1.0.16
   */
  get isLocked(): boolean;

  /**
   * @deprecated please use isRGLContainerNode
   */
  set isRGLContainer(flag: boolean);

  /**
   * @deprecated please use isRGLContainerNode
   * @returns Boolean
   */
  get isRGLContainer();

  /**
   * Set as a magnet-layout node
   * @since v1.1.0
   */
  set isRGLContainerNode(flag: boolean);

  /**
   * Get the magnet-layout node setting state
   * @returns Boolean
   * @since v1.1.0
   */
  get isRGLContainerNode();

  /**
   * Index
   * index
   */
  get index(): number | undefined;

  /**
   * Icon
   * get icon of this node
   */
  get icon(): IPublicTypeIconType;

  /**
   * Depth of the node in the tree; root depth is 0
   * depth level of this node, value of root node is 0
   */
  get zLevel(): number;

  /**
   * Node componentName
   * componentName
   */
  get componentName(): string;

  /**
   * Material metadata of the node
   * get component meta of this node
   */
  get componentMeta(): ComponentMeta | null;

  /**
   * Get the document model that owns this node
   * get documentModel of this node
   */
  get document(): Document | null;

  /**
   * Get the previous sibling of the current node
   * get previous sibling of this node
   */
  get prevSibling(): Node | null | undefined;

  /**
   * Get the next sibling of the current node
   * get next sibling of this node
   */
  get nextSibling(): Node | null | undefined;

  /**
   * Get the parent of the current node
   * get parent of this node
   */
  get parent(): Node | null;

  /**
   * Get the children model of the current node
   * get children of this node
   */
  get children(): NodeChildren | null;

  /**
   * Slot nodes mounted on this node
   * get slots of this node
   */
  get slots(): Node[];

  /**
   * When this is a slot node, return the corresponding prop instance
   * return coresponding prop when this node is a slot node
   */
  get slotFor(): Prop | null | undefined;

  /**
   * Return the node's props set
   * get props
   */
  get props(): Props | null;

  /**
   * Return the node's props set
   * get props data
   */
  get propsData(): IPublicTypePropsMap | IPublicTypePropsList | null;

  /**
   * get conditionGroup
   */
  get conditionGroup(): ExclusiveGroup | null;

  /**
   * Get the node schema structure conforming to the builder protocol
   * get schema of this node
   * @since v1.1.0
   */
  get schema(): IPublicTypeNodeSchema;

  /**
   * Get the corresponding setting entry
   * get setting entry of this node
   * @since v1.1.0
   */
  get settingEntry(): SettingTopEntry;

  /**
   * Return the node's size and position info
   * get rect information for this node
   */
  getRect(): DOMRect | null;

  /**
   * Whether slot nodes are mounted
   * check if current node has slots
   */
  hasSlots(): boolean;

  /**
   * Whether a render condition is set
   * check if current node has condition value set
   */
  hasCondition(): boolean;

  /**
   * Whether loop data is set
   * check if loop is set for this node
   */
  hasLoop(): boolean;

  /**
   * Get the prop model instance at a specified path
   * get prop by path
   * @param path prop path; supports formats like a / a.b / a.0
   * @param createIfNone whether to create if missing; default true
   */
  getProp(path: string | number, createIfNone?: boolean): Prop | null;

  /**
   * Get the value of the prop model instance at a specified path
   * get prop value by path
   * @param path prop path; supports formats like a / a.b / a.0
   */
  getPropValue(path: string): any;

  /**
   * Get the prop model instance at a specified path;
   *  Note: on export, unlike normal props, this prop is not under props but at the same level as props
   *
   * get extra prop by path, an extra prop means a prop not exists in the `props`
   * but as siblint of the `props`
   * @param path prop path; supports formats like a / a.b / a.0
   * @param createIfNone whether to create a prop when none exists
   */
  getExtraProp(path: string, createIfNone?: boolean): Prop | null;

  /**
   * Get the prop model instance at a specified path;
   *  Note: on export, unlike normal props, this prop is not under props but at the same level as props
   *
   * get extra prop value by path, an extra prop means a prop not exists in the `props`
   * but as siblint of the `props`
   * @param path prop path; supports formats like a / a.b / a.0
   * @returns
   */
  getExtraPropValue(path: string): any;

  /**
   * Set the value of the prop model instance at a specified path
   * set value for prop with path
   * @param path prop path; supports formats like a / a.b / a.0
   * @param value value
   */
  setPropValue(path: string | number, value: IPublicTypeCompositeValue): void;

  /**
   * Set the value of the prop model instance at a specified path
   * set value for extra prop with path
   * @param path prop path; supports formats like a / a.b / a.0
   * @param value value
   */
  setExtraPropValue(path: string, value: IPublicTypeCompositeValue): void;

  /**
   * Import node data
   * import node schema
   * @param data
   */
  importSchema(data: IPublicTypeNodeSchema): void;

  /**
   * Export node data
   * export schema from this node
   * @param stage
   * @param options
   */
  exportSchema(stage: IPublicEnumTransformStage, options?: any): IPublicTypeNodeSchema;

  /**
   * Insert a node before the specified position
   * insert a node befor current node
   * @param node
   * @param ref
   * @param useMutator
   */
  insertBefore(
      node: Node,
      ref?: Node | undefined,
      useMutator?: boolean,
    ): void;

  /**
   * Insert a node after the specified position
   * insert a node after this node
   * @param node
   * @param ref
   * @param useMutator
   */
  insertAfter(
      node: Node,
      ref?: Node | undefined,
      useMutator?: boolean,
    ): void;

  /**
   * Replace a specified node
   * replace a child node with data provided
   * @param node child node to replace
   * @param data replacement node object or node description
   * @returns
   */
  replaceChild(node: Node, data: any): Node | null;

  /**
   * Replace the current node with the specified node description
   * replace current node with a new node schema
   * @param schema
   */
  replaceWith(schema: IPublicTypeNodeSchema): any;

  /**
   * Select the current node instance
   * select current node
   */
  select(): void;

  /**
   * Set hover state
   * set hover value for current node
   * @param flag
   */
  hover(flag: boolean): void;

  /**
   * Set the node lock state
   * set lock value for current node
   * @param flag
   * @since v1.0.16
   */
  lock(flag?: boolean): void;

  /**
   * Remove the current node instance
   * remove current node
   */
  remove(): void;

  /**
   * Perform add, remove, sort, and similar operations
   * excute remove/add/sort operations on node`s children
   *
   * @since v1.1.0
   */
  mergeChildren(
    remover: (node: Node, idx: number) => boolean,
    adder: (children: Node[]) => any,
    sorter: (firstNode: Node, secondNode: Node) => number
  ): any;

  /**
   * Whether the current node contains a given child
   * check if current node contains another node as a child
   * @param node
   * @since v1.1.0
   */
  contains(node: Node): boolean;

  /**
   * Whether a given action can be performed
   * check if current node can perform certain aciton with actionName
   * @param actionName action name
   * @since v1.1.0
   */
  canPerformAction(actionName: string): boolean;

  /**
   * Whether the current node is visible
   * check if current node is visible
   * @since v1.1.0
   */
  get visible(): boolean;

  /**
   * Set whether the current node is visible
   * set visible value for current node
   * @since v1.1.0
   */
  set visible(value: boolean);

  /**
   * Get the node's ConditionalVisible value
   * check if current node ConditionalVisible
   * @since v1.1.0
   */
  isConditionalVisible(): boolean | undefined;

  /**
   * Set the node's ConditionalVisible to true
   * make this node as conditionalVisible === true
   * @since v1.1.0
   */
  setConditionalVisible(): void;

  /**
   * Get the DOM node corresponding to the node instance
   */
  getDOMNode(): HTMLElement;

  /**
   * Get magnet-related info
   */
  getRGL(): {
    isContainerNode: boolean;
    isEmptyNode: boolean;
    isRGLContainerNode: boolean;
    isRGLNode: boolean;
    isRGL: boolean;
    rglNode: Node | null;
  };
}

export interface IPublicModelNode extends IBaseModelNode<IPublicModelDocumentModel, IPublicModelNode> {}