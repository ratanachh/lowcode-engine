import {
  makeObservable,
  obx,
  engineConfig,
  action,
  runWithGlobalEventOff,
  wrapWithEventSwitch,
  createModuleEventBus,
  IEventBus,
} from '@rchh/lowcode-editor-core';
import {
  IPublicTypeNodeData,
  IPublicTypeNodeSchema,
  IPublicTypePageSchema,
  IPublicTypeComponentsMap,
  IPublicTypeDragNodeObject,
  IPublicTypeDragNodeDataObject,
  IPublicModelDocumentModel,
  IPublicEnumTransformStage,
  IPublicTypeOnChangeOptions,
  IPublicTypeDisposable,
} from '@rchh/lowcode-types';
import type {
  IPublicTypeRootSchema,
} from '@rchh/lowcode-types';
import type {
  IDropLocation,
} from '@rchh/lowcode-designer';
import {
  uniqueId,
  isPlainObject,
  compatStage,
  isJSExpression,
  isDOMText,
  isNodeSchema,
  isDragNodeObject,
  isDragNodeDataObject,
  isNode,
} from '@rchh/lowcode-utils';
import { IProject } from '../project';
import { ISimulatorHost } from '../simulator';
import type { IComponentMeta } from '../component-meta';
import { IDesigner, IHistory } from '../designer';
import { insertChildren, insertChild, IRootNode } from './node/node';
import type { INode } from './node/node';
import { Selection, ISelection } from './selection';
import { History } from './history';
import { IModalNodesManager, ModalNodesManager, Node } from './node';
import { EDITOR_EVENT } from '../types';

export type GetDataType<T, NodeType> = T extends undefined
  ? NodeType extends {
    schema: infer R;
  }
  ? R
  : any
  : T;

export interface IDocumentModel extends Omit<IPublicModelDocumentModel<
  ISelection,
  IHistory,
  INode,
  IDropLocation,
  IModalNodesManager,
  IProject
>,
  'detecting' |
  'checkNesting' |
  'getNodeById' |
  // The following properties do not exist on the internal document
  'exportSchema' |
  'importSchema' |
  'onAddNode' |
  'onRemoveNode' |
  'onChangeDetecting' |
  'onChangeSelection' |
  'onChangeNodeProp' |
  'onImportSchema' |
  'isDetectingNode' |
  'onFocusNodeChanged' |
  'onDropLocationChanged'
> {

  readonly designer: IDesigner;

  selection: ISelection;

  get rootNode(): INode | null;

  get simulator(): ISimulatorHost | null;

  get active(): boolean;

  get nodesMap(): Map<string, INode>;

  /**
   * Whether in inactive (suspended) state
   */
  get suspensed(): boolean;

  get fileName(): string;

  get currentRoot(): INode | null;

  isBlank(): boolean;

  /**
   * Get node by id
   */
  getNode(id: string): INode | null;

  getRoot(): INode | null;

  getHistory(): IHistory;

  checkNesting(
    dropTarget: INode,
    dragObject: IPublicTypeDragNodeObject | IPublicTypeNodeSchema | INode | IPublicTypeDragNodeDataObject,
  ): boolean;

  getNodeCount(): number;

  nextId(possibleId: string | undefined): string;

  import(schema: IPublicTypeRootSchema, checkId?: boolean): void;

  export(stage: IPublicEnumTransformStage): IPublicTypeRootSchema | undefined;

  onNodeCreate(func: (node: INode) => void): IPublicTypeDisposable;

  onNodeDestroy(func: (node: INode) => void): IPublicTypeDisposable;

  onChangeNodeVisible(fn: (node: INode, visible: boolean) => void): IPublicTypeDisposable;

  addWillPurge(node: INode): void;

  removeWillPurge(node: INode): void;

  getComponentMeta(componentName: string): IComponentMeta;

  insertNodes(parent: INode, thing: INode[] | IPublicTypeNodeData[], at?: number | null, copy?: boolean): INode[];

  open(): IDocumentModel;

  remove(): void;

  suspense(): void;

  close(): void;

  unlinkNode(node: INode): void;

  destroyNode(node: INode): void;
}

export class DocumentModel implements IDocumentModel {
  /**
   * Root node types: Page/Component/Block
   */
  rootNode: IRootNode | null;

  /**
   * Document id
   */
  id: string = uniqueId('doc');

  /**
   * Selection control
   */
  readonly selection: ISelection = new Selection(this);

  /**
   * History / operation record control
   */
  readonly history: IHistory;

  /**
   * Modal node management
   */
  modalNodesManager: IModalNodesManager;

  private _nodesMap = new Map<string, INode>();

  readonly project: IProject;

  readonly designer: IDesigner;

  @obx.shallow private nodes = new Set<INode>();

  private seqId = 0;

  private emitter: IEventBus;

  private rootNodeVisitorMap: { [visitorName: string]: any } = {};

  /**
   * @deprecated
   */
  private _addons: Array<{ name: string; exportData: any }> = [];

  /**
   * Simulator
   */
  get simulator(): ISimulatorHost | null {
    return this.project.simulator;
  }

  get nodesMap(): Map<string, INode> {
    return this._nodesMap;
  }

  get fileName(): string {
    return this.rootNode?.getExtraProp('fileName', false)?.getAsString() || this.id;
  }

  set fileName(fileName: string) {
    this.rootNode?.getExtraProp('fileName', true)?.setValue(fileName);
  }

  get focusNode(): INode | null {
    if (this._drillDownNode) {
      return this._drillDownNode;
    }
    const selector = engineConfig.get('focusNodeSelector');
    if (selector && typeof selector === 'function') {
      return selector(this.rootNode!);
    }
    return this.rootNode;
  }

  @obx.ref private _drillDownNode: INode | null = null;

  private _modalNode?: INode;

  private _blank?: boolean;

  private inited = false;

  @obx.shallow private willPurgeSpace: INode[] = [];

  get modalNode() {
    return this._modalNode;
  }

  get currentRoot() {
    return this.modalNode || this.focusNode;
  }

  @obx.shallow private activeNodes?: INode[];

  @obx.ref private _dropLocation: IDropLocation | null = null;

  set dropLocation(loc: IDropLocation | null) {
    this._dropLocation = loc;
    // pub event
    this.designer.editor.eventBus.emit(
      'document.dropLocation.changed',
      { document: this, location: loc },
    );
  }

  /**
   * Drop insert location marker
   */
  get dropLocation() {
    return this._dropLocation;
  }

  /**
   * Export schema data
   */
  get schema(): IPublicTypeRootSchema {
    return this.rootNode?.schema as any;
  }

  @obx.ref private _opened = false;

  @obx.ref private _suspensed = false;

  /**
   * Whether in inactive (suspended) state
   */
  get suspensed(): boolean {
    return this._suspensed || !this._opened;
  }

  /**
   * Opposite of suspended: whether active; this helper is used more often
   */
  get active(): boolean {
    return !this._suspensed;
  }

  /**
   * @deprecated for compatibility
   */
  get actived(): boolean {
    return this.active;
  }

  /**
   * Whether opened
   */
  get opened() {
    return this._opened;
  }

  get root() {
    return this.rootNode;
  }

  constructor(project: IProject, schema?: IPublicTypeRootSchema) {
    makeObservable(this);
    this.project = project;
    this.designer = this.project?.designer;
    this.emitter = createModuleEventBus('DocumentModel');

    if (!schema) {
      this._blank = true;
    }

    // Compatible with vision
    this.id = project.getSchema()?.id || this.id;

    this.rootNode = this.createNode(
      schema || {
        componentName: 'Page',
        id: 'root',
        fileName: '',
      },
    );

    this.history = new History(
      () => this.export(IPublicEnumTransformStage.Serilize),
      (schema) => {
        this.import(schema as IPublicTypeRootSchema, true);
        this.simulator?.rerender();
      },
      this,
    );

    this.setupListenActiveNodes();
    this.modalNodesManager = new ModalNodesManager(this);
    this.inited = true;
  }

  drillDown(node: INode | null) {
    this._drillDownNode = node;
  }

  onChangeNodeVisible(fn: (node: INode, visible: boolean) => void): IPublicTypeDisposable {
    this.designer.editor?.eventBus.on(EDITOR_EVENT.NODE_VISIBLE_CHANGE, fn);

    return () => {
      this.designer.editor?.eventBus.off(EDITOR_EVENT.NODE_VISIBLE_CHANGE, fn);
    };
  }

  onChangeNodeChildren(fn: (info: IPublicTypeOnChangeOptions<INode>) => void): IPublicTypeDisposable {
    this.designer.editor?.eventBus.on(EDITOR_EVENT.NODE_CHILDREN_CHANGE, fn);

    return () => {
      this.designer.editor?.eventBus.off(EDITOR_EVENT.NODE_CHILDREN_CHANGE, fn);
    };
  }

  addWillPurge(node: INode) {
    this.willPurgeSpace.push(node);
  }

  removeWillPurge(node: INode) {
    const i = this.willPurgeSpace.indexOf(node);
    if (i > -1) {
      this.willPurgeSpace.splice(i, 1);
    }
  }

  isBlank() {
    return !!(this._blank && !this.isModified());
  }

  /**
   * Generate unique id
   */
  nextId(possibleId: string | undefined): string {
    let id = possibleId;
    while (!id || this.nodesMap.get(id)) {
      id = `node_${(String(this.id).slice(-10) + (++this.seqId).toString(36)).toLocaleLowerCase()}`;
    }

    return id;
  }

  /**
   * Get node by id
   */
  getNode(id: string): INode | null {
    return this._nodesMap.get(id) || null;
  }

  /**
   * Get node by id
   */
  getNodeCount(): number {
    return this._nodesMap?.size;
  }

  /**
   * Whether the node exists
   */
  hasNode(id: string): boolean {
    const node = this.getNode(id);
    return node ? !node.isPurged : false;
  }

  onMountNode(fn: (payload: { node: INode }) => void) {
    this.designer.editor.eventBus.on('node.add', fn as any);

    return () => {
      this.designer.editor.eventBus.off('node.add', fn as any);
    };
  }

  /**
   * Create a node from schema
   */
  @action
  createNode<T extends INode = INode, C = undefined>(data: GetDataType<C, T>): T {
    let schema: any;
    if (isDOMText(data) || isJSExpression(data)) {
      schema = {
        componentName: 'Leaf',
        children: data,
      };
    } else {
      schema = data;
    }

    let node: INode | null = null;
    if (this.hasNode(schema?.id)) {
      schema.id = null;
    }
    /* istanbul ignore next */
    if (schema.id) {
      node = this.getNode(schema.id);
      // TODO: the following branches seem unreachable
      if (node && node.componentName === schema.componentName) {
        if (node.parent) {
          node.internalSetParent(null, false);
          // will move to another position
          // todo: this.activeNodes?.push(node);
        }
        node.import(schema, true);
      } else if (node) {
        node = null;
      }
    }
    if (!node) {
      node = new Node(this, schema);
      // will add
      // todo: this.activeNodes?.push(node);
    }

    this._nodesMap.set(node.id, node);
    this.nodes.add(node);

    this.emitter.emit('nodecreate', node);
    return node as any;
  }

  public destroyNode(node: INode) {
    this.emitter.emit('nodedestroy', node);
  }

  /**
   * Insert a node
   */
  insertNode(parent: INode, thing: INode | IPublicTypeNodeData, at?: number | null, copy?: boolean): INode | null {
    return insertChild(parent, thing, at, copy);
  }

  /**
   * Insert multiple nodes
   */
  insertNodes(parent: INode, thing: INode[] | IPublicTypeNodeData[], at?: number | null, copy?: boolean) {
    return insertChildren(parent, thing, at, copy);
  }

  /**
   * Remove a node
   */
  removeNode(idOrNode: string | INode) {
    let id: string;
    let node: INode | null = null;
    if (typeof idOrNode === 'string') {
      id = idOrNode;
      node = this.getNode(id);
    } else if (idOrNode.id) {
      id = idOrNode.id;
      node = this.getNode(id);
    }
    if (!node) {
      return;
    }
    this.internalRemoveAndPurgeNode(node, true);
  }

  /**
   * Internal method; do not call
   */
  internalRemoveAndPurgeNode(node: INode, useMutator = false) {
    if (!this.nodes.has(node)) {
      return;
    }
    node.remove(useMutator);
  }

  unlinkNode(node: INode) {
    this.nodes.delete(node);
    this._nodesMap.delete(node.id);
  }

  /**
   * Wrap nodes in the current selection
   */
  wrapWith(schema: IPublicTypeNodeSchema): INode | null {
    const nodes = this.selection.getTopNodes();
    if (nodes.length < 1) {
      return null;
    }
    const wrapper = this.createNode(schema);
    if (wrapper.isParental()) {
      const first = nodes[0];
      // TODO: check nesting rules x 2
      insertChild(first.parent!, wrapper, first.index);
      insertChildren(wrapper, nodes);
      this.selection.select(wrapper.id);
      return wrapper;
    }

    this.removeNode(wrapper);
    return null;
  }

  @action
  import(schema: IPublicTypeRootSchema, checkId = false) {
    const drillDownNodeId = this._drillDownNode?.id;
    runWithGlobalEventOff(() => {
      // TODO: use saturate delete for now; Slot is not a tree node so recursion fails
      this.nodes.forEach(node => {
        if (node.isRoot()) return;
        this.internalRemoveAndPurgeNode(node, true);
      });
      this.rootNode?.import(schema as any, checkId);
      this.modalNodesManager = new ModalNodesManager(this);
      // todo: select added and active track added
      if (drillDownNodeId) {
        this.drillDown(this.getNode(drillDownNodeId));
      }
    });
  }

  export(stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Serilize): IPublicTypeRootSchema | undefined {
    stage = compatStage(stage);
    // Bring-to-front only applies to Page first-level children; nested not needed yet; may move to node-children export later
    const currentSchema = this.rootNode?.export<IPublicTypeRootSchema>(stage);
    if (Array.isArray(currentSchema?.children) && currentSchema?.children?.length && currentSchema?.children?.length > 0) {
      const FixedTopNodeIndex = currentSchema?.children
        .filter(i => isPlainObject(i))
        .findIndex((i => (i as IPublicTypeNodeSchema).props?.__isTopFixed__));
      if (FixedTopNodeIndex > 0) {
        const FixedTopNode = currentSchema?.children.splice(FixedTopNodeIndex, 1);
        currentSchema?.children.unshift(FixedTopNode[0]);
      }
    }
    return currentSchema;
  }

  /**
   * Export node data
   */
  getNodeSchema(id: string): IPublicTypeNodeData | null {
    const node = this.getNode(id);
    if (node) {
      return node.schema;
    }
    return null;
  }

  /**
   * Whether modified
   */
  isModified(): boolean {
    return this.history.isSavePoint();
  }

  // FIXME: does needed?
  getComponent(componentName: string): any {
    return this.simulator!.getComponent(componentName);
  }

  getComponentMeta(componentName: string): IComponentMeta {
    return this.designer.getComponentMeta(
      componentName,
      () => this.simulator?.generateComponentMetadata(componentName) || null,
    );
  }

  /**
   * Toggle activation; only opened documents can be activated.
   * Deactivation happens when switching away after open, e.g. switching tabs.
   */
  private setSuspense(flag: boolean) {
    if (!this._opened && !flag) {
      return;
    }
    this._suspensed = flag;
    this.simulator?.setSuspense(flag);
    if (!flag) {
      this.project.checkExclusive(this);
    }
  }

  suspense() {
    this.setSuspense(true);
  }

  activate() {
    this.setSuspense(false);
  }

  /**
   * Open (loaded); opened by default on create unless closed manually
   */
  open(): DocumentModel {
    const originState = this._opened;
    this._opened = true;
    if (originState === false) {
      this.designer.postEvent('document-open', this);
    }
    if (this._suspensed) {
      this.setSuspense(false);
    } else {
      this.project.checkExclusive(this);
    }
    return this;
  }

  /**
   * Close (sleep): still cached, stops responding; unsaved changes still need persisting
   */
  close(): void {
    this.setSuspense(true);
    this._opened = false;
  }

  /**
   * Remove from project
   */
  remove() {
    this.designer.postEvent('document.remove', { id: this.id });
    this.purge();
    this.project.removeDocument(this);
  }

  purge() {
    this.rootNode?.purge();
    this.nodes.clear();
    this._nodesMap.clear();
    this.rootNode = null;
  }

  checkNesting(
    dropTarget: INode,
    dragObject: IPublicTypeDragNodeObject | IPublicTypeNodeSchema | INode | IPublicTypeDragNodeDataObject,
  ): boolean {
    let items: Array<INode | IPublicTypeNodeSchema>;
    if (isDragNodeDataObject(dragObject)) {
      items = Array.isArray(dragObject.data) ? dragObject.data : [dragObject.data];
    } else if (isDragNodeObject<INode>(dragObject)) {
      items = dragObject.nodes;
    } else if (isNode<INode>(dragObject) || isNodeSchema(dragObject)) {
      items = [dragObject];
    } else {
      console.warn('the dragObject is not in the correct type, dragObject:', dragObject);
      return true;
    }
    return items.every((item) => this.checkNestingDown(dropTarget, item) && this.checkNestingUp(dropTarget, item));
  }

  /**
   * @deprecated since version 1.0.16.
   * Will be deleted in version 2.0.0.
   * Use checkNesting method instead.
   */
  checkDropTarget(dropTarget: INode, dragObject: IPublicTypeDragNodeObject | IPublicTypeDragNodeDataObject): boolean {
    let items: Array<INode | IPublicTypeNodeSchema>;
    if (isDragNodeDataObject(dragObject)) {
      items = Array.isArray(dragObject.data) ? dragObject.data : [dragObject.data];
    } else if (isDragNodeObject<INode>(dragObject)) {
      items = dragObject.nodes;
    } else {
      return false;
    }
    return items.every((item) => this.checkNestingUp(dropTarget, item));
  }

  /**
   * Check parent requirements for the object; involves parentWhitelist
   */
  checkNestingUp(parent: INode, obj: IPublicTypeNodeSchema | INode): boolean {
    if (isNode(obj) || isNodeSchema(obj)) {
      const config = isNode(obj) ? obj.componentMeta : this.getComponentMeta(obj.componentName);
      if (config) {
        return config.checkNestingUp(obj, parent);
      }
    }

    return true;
  }

  /**
   * Check child requirements at drop location; involves childWhitelist
   */
  checkNestingDown(parent: INode, obj: IPublicTypeNodeSchema | INode): boolean {
    const config = parent.componentMeta;
    return config.checkNestingDown(parent, obj);
  }

  // ======= compatibles for vision
  getRoot() {
    return this.rootNode;
  }

  // add toData
  toData(extraComps?: string[]) {
    const node = this.export(IPublicEnumTransformStage.Save);
    const data = {
      componentsMap: this.getComponentsMap(extraComps),
      utils: this.getUtilsMap(),
      componentsTree: [node],
    };
    return data;
  }

  getHistory(): IHistory {
    return this.history;
  }

  /**
   * @deprecated
   */
  /* istanbul ignore next */
  getAddonData(name: string) {
    const addon = this._addons.find((item) => item.name === name);
    if (addon) {
      return addon.exportData();
    }
  }

  /**
   * @deprecated
  */
  /* istanbul ignore next */
  exportAddonData() {
    const addons: {
      [key: string]: any;
    } = {};
    this._addons.forEach((addon) => {
      const data = addon.exportData();
      if (data === null) {
        delete addons[addon.name];
      } else {
        addons[addon.name] = data;
      }
    });
    return addons;
  }

  /**
   * @deprecated
   */
  /* istanbul ignore next */
  registerAddon(name: string, exportData: any) {
    if (['id', 'params', 'layout'].indexOf(name) > -1) {
      throw new Error('addon name cannot be id, params, layout');
    }
    const i = this._addons.findIndex((item) => item.name === name);
    if (i > -1) {
      this._addons.splice(i, 1);
    }
    this._addons.push({
      exportData,
      name,
    });
  }

  /* istanbul ignore next */
  acceptRootNodeVisitor(
    visitorName = 'default',
    visitorFn: (node: IRootNode) => any,
  ) {
    let visitorResult = {};
    if (!visitorName) {
      /* eslint-disable-next-line no-console */
      console.warn('Invalid or empty RootNodeVisitor name.');
    }
    try {
      if (this.rootNode) {
        visitorResult = visitorFn.call(this, this.rootNode);
        this.rootNodeVisitorMap[visitorName] = visitorResult;
      }
    } catch (e) {
      console.error('RootNodeVisitor is not valid.');
      console.error(e);
    }
    return visitorResult;
  }

  /* istanbul ignore next */
  getRootNodeVisitor(name: string) {
    return this.rootNodeVisitorMap[name];
  }

  getComponentsMap(extraComps?: string[]) {
    const componentsMap: IPublicTypeComponentsMap = [];
    // Deduplicate components
    const exsitingMap: { [componentName: string]: boolean } = {};
    for (const node of this._nodesMap.values()) {
      const { componentName } = node || {};
      if (componentName === 'Slot') continue;
      if (!exsitingMap[componentName]) {
        exsitingMap[componentName] = true;
        if (node.componentMeta?.npm?.package) {
          componentsMap.push({
            ...node.componentMeta.npm,
            componentName,
          });
        } else {
          componentsMap.push({
            devMode: 'lowCode',
            componentName,
          });
        }
      }
    }
    // Merge externally provided custom render components
    if (Array.isArray(extraComps)) {
      extraComps.forEach((componentName) => {
        if (componentName && !exsitingMap[componentName]) {
          const meta = this.getComponentMeta(componentName);
          if (meta?.npm?.package) {
            componentsMap.push({
              ...meta?.npm,
              componentName,
            });
          } else {
            componentsMap.push({
              devMode: 'lowCode',
              componentName,
            });
          }
        }
      });
    }
    return componentsMap;
  }

  /**
   * Get utils from schema; this version returns all utils from the asset pack
   * without checking which ones the page uses
   * @returns
   */
  getUtilsMap() {
    return this.designer?.editor?.get('assets')?.utils?.map((item: any) => ({
      name: item.name,
      type: item.type || 'npm',
      // TODO only npm type for now; content set to item.npm; handle function type later
      content: item.npm,
    }));
  }

  onNodeCreate(func: (node: INode) => void) {
    const wrappedFunc = wrapWithEventSwitch(func);
    this.emitter.on('nodecreate', wrappedFunc);
    return () => {
      this.emitter.removeListener('nodecreate', wrappedFunc);
    };
  }

  onNodeDestroy(func: (node: INode) => void) {
    const wrappedFunc = wrapWithEventSwitch(func);
    this.emitter.on('nodedestroy', wrappedFunc);
    return () => {
      this.emitter.removeListener('nodedestroy', wrappedFunc);
    };
  }

  /**
   * @deprecated
   */
  refresh() {
    console.warn('refresh method is deprecated');
  }

  /**
   * @deprecated
   */
  onRefresh(/* func: () => void */) {
    console.warn('onRefresh method is deprecated');
  }

  onReady(fn: (...args: any[]) => void) {
    this.designer.editor.eventBus.on('document-open', fn);
    return () => {
      this.designer.editor.eventBus.off('document-open', fn);
    };
  }

  private setupListenActiveNodes() {
    // todo:
  }
}

export function isDocumentModel(obj: any): obj is IDocumentModel {
  return obj && obj.rootNode;
}

export function isPageSchema(obj: any): obj is IPublicTypePageSchema {
  return obj?.componentName === 'Page';
}
