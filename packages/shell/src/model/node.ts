import {
  IDocumentModel as InnerDocumentModel,
  INode as InnerNode,
} from '@rchh/lowcode-designer';
import {
  IPublicTypeCompositeValue,
  IPublicTypeNodeSchema,
  IPublicEnumTransformStage,
  IPublicModelNode,
  IPublicTypeIconType,
  IPublicTypeI18nData,
  IPublicModelComponentMeta,
  IPublicModelDocumentModel,
  IPublicModelNodeChildren,
  IPublicModelProp,
  IPublicModelProps,
  IPublicTypePropsMap,
  IPublicTypePropsList,
  IPublicModelSettingTopEntry,
  IPublicModelExclusiveGroup,
} from '@rchh/lowcode-types';
import { Prop as ShellProp } from './prop';
import { Props as ShellProps } from './props';
import { DocumentModel as ShellDocumentModel } from './document-model';
import { NodeChildren as ShellNodeChildren } from './node-children';
import { ComponentMeta as ShellComponentMeta } from './component-meta';
import { SettingTopEntry as ShellSettingTopEntry } from './setting-top-entry';
import { documentSymbol, nodeSymbol } from '../symbols';
import { ReactElement } from 'react';
import { ConditionGroup } from './condition-group';

const shellNodeSymbol = Symbol('shellNodeSymbol');

function isShellNode(node: any): node is IPublicModelNode {
  return node[shellNodeSymbol];
}

export class Node implements IPublicModelNode {
  private readonly [documentSymbol]: InnerDocumentModel | null;
  private readonly [nodeSymbol]: InnerNode;

  private _id: string;

  /**
   * Node id
   */
  get id() {
    return this._id;
  }

  /**
   * set id
   */
  set id(id: string) {
    this._id = id;
  }

  /**
   * Node title
   */
  get title(): string | IPublicTypeI18nData | ReactElement {
    return this[nodeSymbol].title;
  }

  /**
   * @deprecated
   * Whether this is a container node
   */
  get isContainer(): boolean {
    return this[nodeSymbol].isContainerNode;
  }

  /**
   * Whether this is a container node
   */
  get isContainerNode(): boolean {
    return this[nodeSymbol].isContainerNode;
  }

  /**
   * @deprecated
   * Whether this is the root node
   */
  get isRoot(): boolean {
    return this[nodeSymbol].isRootNode;
  }

  /**
   * Whether this is the root node
   */
  get isRootNode(): boolean {
    return this[nodeSymbol].isRootNode;
  }

  /**
   * @deprecated
   * Whether this is an empty node (no children or empty children)
   */
  get isEmpty(): boolean {
    return this[nodeSymbol].isEmptyNode;
  }

  /**
   * Whether this is an empty node (no children or empty children)
   */
  get isEmptyNode(): boolean {
    return this[nodeSymbol].isEmptyNode;
  }

  /**
   * @deprecated
   * Whether this is a Page node
   */
  get isPage(): boolean {
    return this[nodeSymbol].isPageNode;
  }

  /**
   * Whether this is a Page node
   */
  get isPageNode(): boolean {
    return this[nodeSymbol].isPageNode;
  }

  /**
   * @deprecated
   * Whether this is a Component node
   */
  get isComponent(): boolean {
    return this[nodeSymbol].isComponentNode;
  }

  /**
   * Whether this is a Component node
   */
  get isComponentNode(): boolean {
    return this[nodeSymbol].isComponentNode;
  }

  /**
   * @deprecated
   * Whether this is a modal node
   */
  get isModal(): boolean {
    return this[nodeSymbol].isModalNode;
  }

  /**
   * Whether this is a modal node
   */
  get isModalNode(): boolean {
    return this[nodeSymbol].isModalNode;
  }

  /**
   * @deprecated
   * Whether this is a slot node
   */
  get isSlot(): boolean {
    return this[nodeSymbol].isSlotNode;
  }

  /**
   * Whether this is a slot node
   */
  get isSlotNode(): boolean {
    return this[nodeSymbol].isSlotNode;
  }

  /**
   * @deprecated
   * Whether this is a parent/branch node
   */
  get isParental(): boolean {
    return this[nodeSymbol].isParentalNode;
  }

  /**
   * Whether this is a parent/branch node
   */
  get isParentalNode(): boolean {
    return this[nodeSymbol].isParentalNode;
  }

  /**
   * @deprecated
   * Whether this is a leaf node
   */
  get isLeaf(): boolean {
    return this[nodeSymbol].isLeafNode;
  }

  /**
   * Whether this is a leaf node
   */
  get isLeafNode(): boolean {
    return this[nodeSymbol].isLeafNode;
  }

  /**
   * judge if it is a node or not
   */
  readonly isNode = true;

  /**
   * Get lock state of current node
   */
  get isLocked(): boolean {
    return this[nodeSymbol].isLocked;
  }

  /**
   * Index
   */
  get index() {
    return this[nodeSymbol].index;
  }

  /**
   * Icon
   */
  get icon(): IPublicTypeIconType {
    return this[nodeSymbol].icon;
  }

  /**
   * Depth in the tree; root depth is 0
   */
  get zLevel(): number {
    return this[nodeSymbol].zLevel;
  }

  /**
   * Node componentName
   */
  get componentName(): string {
    return this[nodeSymbol].componentName;
  }

  /**
   * Node component metadata
   */
  get componentMeta(): IPublicModelComponentMeta | null {
    return ShellComponentMeta.create(this[nodeSymbol].componentMeta);
  }

  /**
   * Get the document model that owns this node
   * @returns
   */
  get document(): IPublicModelDocumentModel | null {
    return ShellDocumentModel.create(this[documentSymbol]);
  }

  /**
   * Get previous sibling
   * @returns
   */
  get prevSibling(): IPublicModelNode | null {
    return Node.create(this[nodeSymbol].prevSibling);
  }

  /**
   * Get next sibling
   * @returns
   */
  get nextSibling(): IPublicModelNode | null {
    return Node.create(this[nodeSymbol].nextSibling);
  }

  /**
   * Get parent node
   * @returns
   */
  get parent(): IPublicModelNode | null {
    return Node.create(this[nodeSymbol].parent);
  }

  /**
   * Get children model
   * @returns
   */
  get children(): IPublicModelNodeChildren | null {
    return ShellNodeChildren.create(this[nodeSymbol].children);
  }

  /**
   * Slot nodes mounted on this node
   */
  get slots(): IPublicModelNode[] {
    return this[nodeSymbol].slots.map((node: InnerNode) => Node.create(node)!);
  }

  /**
   * When this is a slot node, return the corresponding prop instance
   */
  get slotFor(): IPublicModelProp | null | undefined {
    return ShellProp.create(this[nodeSymbol].slotFor);
  }

  /**
   * Return node props
   */
  get props(): IPublicModelProps | null {
    return ShellProps.create(this[nodeSymbol].props);
  }

  /**
   * Return node props
   */
  get propsData(): IPublicTypePropsMap | IPublicTypePropsList | null {
    return this[nodeSymbol].propsData;
  }

  /**
   * Get node schema conforming to the lowcode protocol
   */
  get schema(): IPublicTypeNodeSchema {
    return this[nodeSymbol].schema;
  }

  get settingEntry(): IPublicModelSettingTopEntry {
    return ShellSettingTopEntry.create(this[nodeSymbol].settingEntry as any);
  }

  constructor(node: InnerNode) {
    this[nodeSymbol] = node;
    this[documentSymbol] = node.document;

    this._id = this[nodeSymbol].id;
  }

  static create(node: InnerNode | IPublicModelNode | null | undefined): IPublicModelNode | null {
    if (!node) {
      return null;
    }
    // @ts-ignore Return the mounted shell node instance directly
    if (isShellNode(node)) {
      return (node as any)[shellNodeSymbol];
    }
    const shellNode = new Node(node);
    // @ts-ignore Mount shell node instance
    // eslint-disable-next-line no-param-reassign
    node[shellNodeSymbol] = shellNode;
    return shellNode;
  }

  /**
   * @deprecated use .children instead
   */
  getChildren() {
    return this.children;
  }

  /**
   * Get DOM element for this node instance
   */
  getDOMNode() {
    return (this[nodeSymbol] as any).getDOMNode();
  }

  /**
   * Perform add / remove / sort operations
   * @param remover
   * @param adder
   * @param sorter
   */
  mergeChildren(
    remover: (node: IPublicModelNode, idx: number) => boolean,
    adder: (children: IPublicModelNode[]) => any,
    sorter: (firstNode: IPublicModelNode, secondNode: IPublicModelNode) => number,
  ): any {
    return this.children?.mergeChildren(remover, adder, sorter);
  }

  /**
   * Return node size and position
   * @returns
   */
  getRect(): DOMRect | null {
    return this[nodeSymbol].getRect();
  }

  /**
   * Whether slot nodes are mounted
   * @returns
   */
  hasSlots(): boolean {
    return this[nodeSymbol].hasSlots();
  }

  /**
   * Whether a render condition is set
   * @returns
   */
  hasCondition(): boolean {
    return this[nodeSymbol].hasCondition();
  }

  /**
   * Whether loop data is set
   * @returns
   */
  hasLoop(): boolean {
    return this[nodeSymbol].hasLoop();
  }

  get visible(): boolean {
    return this[nodeSymbol].getVisible();
  }

  set visible(value: boolean) {
    this[nodeSymbol].setVisible(value);
  }

  getVisible(): boolean {
    return this[nodeSymbol].getVisible();
  }

  setVisible(flag: boolean): void {
    this[nodeSymbol].setVisible(flag);
  }

  isConditionalVisible(): boolean | undefined {
    return this[nodeSymbol].isConditionalVisible();
  }

  /**
   * Set node lock state
   * @param flag
   */
  lock(flag?: boolean): void {
    this[nodeSymbol].lock(flag);
  }

  /**
   * @deprecated use .props instead
   */
  getProps() {
    return this.props;
  }

  contains(node: IPublicModelNode): boolean {
    return this[nodeSymbol].contains((node as any)[nodeSymbol]);
  }

  /**
   * Get prop model instance at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @returns
   */
  getProp(path: string, createIfNone = true): IPublicModelProp | null {
    return ShellProp.create(this[nodeSymbol].getProp(path, createIfNone));
  }

  /**
   * Get prop model value at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @returns
   */
  getPropValue(path: string) {
    return this.getProp(path, false)?.getValue();
  }

  /**
   * Get prop model instance at path;
   *  Note: on export, unlike normal props, this is not under props but sibling to props
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @param createIfNone Whether to create the prop when missing
   * @returns
   */
  getExtraProp(path: string, createIfNone?: boolean): IPublicModelProp | null {
    return ShellProp.create(this[nodeSymbol].getExtraProp(path, createIfNone));
  }

  /**
   * Get prop model instance at path;
   *  Note: on export, unlike normal props, this is not under props but sibling to props
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @returns
   */
  getExtraPropValue(path: string): any {
    return this.getExtraProp(path)?.getValue();
  }

  /**
   * Set prop model value at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @param value Value
   * @returns
   */
  setPropValue(path: string, value: IPublicTypeCompositeValue): void {
    return this.getProp(path)?.setValue(value);
  }

  /**
   * Set prop model value at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @param value Value
   * @returns
   */
  setExtraPropValue(path: string, value: IPublicTypeCompositeValue): void {
    return this.getExtraProp(path)?.setValue(value);
  }

  /**
   * Import node data
   * @param data
   */
  importSchema(data: IPublicTypeNodeSchema): void {
    this[nodeSymbol].import(data);
  }

  /**
   * Export node data
   * @param stage
   * @param options
   * @returns
   */
  exportSchema(
      stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Render,
      options?: any,
    ): IPublicTypeNodeSchema {
    return this[nodeSymbol].export(stage, options);
  }

  /**
   * Insert a node before the given position
   * @param node
   * @param ref
   * @param useMutator
   */
  insertBefore(
      node: IPublicModelNode,
      ref?: IPublicModelNode | undefined,
      useMutator?: boolean,
    ): void {
    this[nodeSymbol].insertBefore(
        (node as any)[nodeSymbol] || node,
        (ref as any)?.[nodeSymbol],
        useMutator,
      );
  }

  /**
   * Insert a node after the given position
   * @param node
   * @param ref
   * @param useMutator
   */
  insertAfter(
      node: IPublicModelNode,
      ref?: IPublicModelNode | undefined,
      useMutator?: boolean,
    ): void {
    this[nodeSymbol].insertAfter(
        (node as any)[nodeSymbol] || node,
        (ref as any)?.[nodeSymbol],
        useMutator,
      );
  }

  /**
   * Replace the given node
   * @param node Child node to replace
   * @param data Replacement node instance or node schema
   * @returns
   */
  replaceChild(node: IPublicModelNode, data: any): IPublicModelNode | null {
    return Node.create(this[nodeSymbol].replaceChild((node as any)[nodeSymbol], data));
  }

  /**
   * Replace current node with the given node schema
   * @param schema
   */
  replaceWith(schema: IPublicTypeNodeSchema): any {
    this[nodeSymbol].replaceWith(schema);
  }

  /**
   * Select current node instance
   */
  select(): void {
    this[nodeSymbol].select();
  }

  /**
   * Set hover state
   * @param flag
   */
  hover(flag = true): void {
    this[nodeSymbol].hover(flag);
  }

  /**
   * Delete current node instance
   */
  remove(): void {
    this[nodeSymbol].remove();
  }

  /**
   * @deprecated
   * Set as RGL / tile layout node
   */
  set isRGLContainer(flag: boolean) {
    this[nodeSymbol].isRGLContainerNode = flag;
  }

  /**
   * @deprecated
   * Get tile layout node setting state
   * @returns Boolean
   */
  get isRGLContainer() {
    return this[nodeSymbol].isRGLContainerNode;
  }

  /**
   * Set as RGL / tile layout node
   */
  set isRGLContainerNode(flag: boolean) {
    this[nodeSymbol].isRGLContainerNode = flag;
  }

  /**
   * Get tile layout node setting state
   * @returns Boolean
   */
  get isRGLContainerNode() {
    return this[nodeSymbol].isRGLContainerNode;
  }

  internalToShellNode() {
    return this;
  }

  canPerformAction(actionName: string): boolean {
    return this[nodeSymbol].canPerformAction(actionName);
  }

  /**
   * get conditionGroup
   * @since v1.1.0
   */
  get conditionGroup(): IPublicModelExclusiveGroup | null {
    return ConditionGroup.create(this[nodeSymbol].conditionGroup);
  }

  /**
   * set value for conditionalVisible
   * @since v1.1.0
   */
  setConditionalVisible(): void {
    this[nodeSymbol].setConditionalVisible();
  }

  getRGL() {
    const {
      isContainerNode,
      isEmptyNode,
      isRGLContainerNode,
      isRGLNode,
      isRGL,
      rglNode,
    } = this[nodeSymbol].getRGL();

    return {
      isContainerNode,
      isEmptyNode,
      isRGLContainerNode,
      isRGLNode,
      isRGL,
      rglNode: Node.create(rglNode),
    };
  }
}
