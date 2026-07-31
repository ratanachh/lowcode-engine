import {
  IDocumentModel as InnerDocumentModel,
  INode as InnerNode,
} from '@rchh/lowcode-designer';
import {
  IPublicEnumTransformStage,
  IPublicTypeRootSchema,
  GlobalEvent,
  IPublicModelDocumentModel,
  IPublicTypeOnChangeOptions,
  IPublicTypeDragNodeObject,
  IPublicTypeDragNodeDataObject,
  IPublicModelNode,
  IPublicModelSelection,
  IPublicModelDetecting,
  IPublicModelHistory,
  IPublicApiProject,
  IPublicModelModalNodesManager,
  IPublicTypePropChangeOptions,
  IPublicModelDropLocation,
  IPublicApiCanvas,
  IPublicTypeDisposable,
  IPublicModelEditor,
  IPublicTypeNodeSchema,
} from '@rchh/lowcode-types';
import { isDragNodeObject } from '@rchh/lowcode-utils';
import { Node as ShellNode } from './node';
import { Selection as ShellSelection } from './selection';
import { Detecting as ShellDetecting } from './detecting';
import { History as ShellHistory } from './history';
import { DropLocation as ShellDropLocation } from './drop-location';
import { Project as ShellProject, Canvas as ShellCanvas } from '../api';
import { Prop as ShellProp } from './prop';
import { ModalNodesManager } from './modal-nodes-manager';
import { documentSymbol, editorSymbol, nodeSymbol } from '../symbols';

const shellDocSymbol = Symbol('shellDocSymbol');

export class DocumentModel implements IPublicModelDocumentModel {
  private readonly [documentSymbol]: InnerDocumentModel;
  private readonly [editorSymbol]: IPublicModelEditor;
  private _focusNode: IPublicModelNode | null;
  selection: IPublicModelSelection;
  detecting: IPublicModelDetecting;
  history: IPublicModelHistory;

  /**
   * @deprecated use canvas API instead
   */
  canvas: IPublicApiCanvas;

  constructor(document: InnerDocumentModel) {
    this[documentSymbol] = document;
    this[editorSymbol] = document.designer?.editor as IPublicModelEditor;
    this.selection = new ShellSelection(document);
    this.detecting = new ShellDetecting(document);
    this.history = new ShellHistory(document);
    this.canvas = new ShellCanvas(this[editorSymbol]);

    this._focusNode = ShellNode.create(this[documentSymbol].focusNode);
  }

  static create(document: InnerDocumentModel | undefined | null): IPublicModelDocumentModel | null {
    if (!document) {
      return null;
    }
    // @ts-ignore Return the mounted shell doc instance directly
    if (document[shellDocSymbol]) {
      return (document as any)[shellDocSymbol];
    }
    const shellDoc = new DocumentModel(document);
    // @ts-ignore Return the mounted shell doc instance directly
    document[shellDocSymbol] = shellDoc;
    return shellDoc;
  }

  /**
   * id
   */
  get id(): string {
    return this[documentSymbol].id;
  }

  set id(id) {
    this[documentSymbol].id = id;
  }

  /**
   * Get the project that owns this document
   * @returns
   */
  get project(): IPublicApiProject {
    return ShellProject.create(this[documentSymbol].project, true);
  }

  /**
   * Get the document root node
   * root node of this documentModel
   * @returns
   */
  get root(): IPublicModelNode | null {
    return ShellNode.create(this[documentSymbol].rootNode);
  }

  get focusNode(): IPublicModelNode | null {
    return this._focusNode || this.root;
  }

  set focusNode(node: IPublicModelNode | null) {
    this._focusNode = node;
    this[editorSymbol].eventBus.emit(
      'shell.document.focusNodeChanged',
        { document: this, focusNode: node },
      );
  }

  /**
   * Get all nodes Map under the document, keyed by nodeId
   * get map of all nodes , using node.id as key
   */
  get nodesMap(): Map<string, IPublicModelNode> {
    const map = new Map<string, IPublicModelNode>();
    for (let id of this[documentSymbol].nodesMap.keys()) {
      map.set(id, this.getNodeById(id)!);
    }
    return map;
  }

  /**
   * Modal nodes manager
   */
  get modalNodesManager(): IPublicModelModalNodesManager | null {
    return ModalNodesManager.create(this[documentSymbol].modalNodesManager);
  }

  get dropLocation(): IPublicModelDropLocation | null {
    return ShellDropLocation.create(this[documentSymbol].dropLocation);
  }

  set dropLocation(loc: IPublicModelDropLocation | null) {
    this[documentSymbol].dropLocation = loc;
  }

  /**
   * Return Node instance by nodeId
   * get node instance by nodeId
   * @param {string} nodeId
   */
  getNodeById(nodeId: string): IPublicModelNode | null {
    return ShellNode.create(this[documentSymbol].getNode(nodeId));
  }

  /**
   * Import schema
   * @param schema
   */
  importSchema(schema: IPublicTypeRootSchema): void {
    this[documentSymbol].import(schema);
    this[editorSymbol].eventBus.emit('shell.document.importSchema', schema);
  }

  /**
   * Export schema
   * @param stage
   * @returns
   */
  exportSchema(stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Render): IPublicTypeRootSchema | undefined {
    return this[documentSymbol].export(stage);
  }

  /**
   * Insert a node
   * @param parent
   * @param thing
   * @param at
   * @param copy
   * @returns
   */
  insertNode(
    parent: IPublicModelNode,
    thing: IPublicModelNode,
    at?: number | null | undefined,
    copy?: boolean | undefined,
  ): IPublicModelNode | null {
    const node = this[documentSymbol].insertNode(
      (parent as any)[nodeSymbol] ? (parent as any)[nodeSymbol] : parent,
      (thing as any)?.[nodeSymbol] ? (thing as any)[nodeSymbol] : thing,
      at,
      copy,
    );
    return ShellNode.create(node);
  }

  /**
   * Create a node
   * @param data
   * @returns
   */
  createNode<IPublicModelNode>(data: IPublicTypeNodeSchema): IPublicModelNode | null {
    return ShellNode.create(this[documentSymbol].createNode(data));
  }

  /**
   * Remove node / node id
   * @param idOrNode
   */
  removeNode(idOrNode: string | IPublicModelNode): void {
    this[documentSymbol].removeNode(idOrNode as any);
  }

  /**
   * componentsMap of documentModel
   * @param extraComps
   * @returns
   */
  getComponentsMap(extraComps?: string[]): any {
    return this[documentSymbol].getComponentsMap(extraComps);
  }

  /**
   * Check whether the drop target can accept the drag object
   * @param dropTarget Drop target node
   * @param dragObject Drag object
   * @returns boolean Whether drop is allowed
   */
  checkNesting(
      dropTarget: IPublicModelNode,
      dragObject: IPublicTypeDragNodeObject | IPublicTypeDragNodeDataObject,
    ): boolean {
    let innerDragObject = dragObject;
    if (isDragNodeObject(dragObject)) {
      innerDragObject.nodes = innerDragObject.nodes?.map(
          (node: IPublicModelNode) => ((node as any)[nodeSymbol] || node),
        );
    }
    return this[documentSymbol].checkNesting(
      ((dropTarget as any)[nodeSymbol] || dropTarget) as any,
      innerDragObject as any,
    );
  }

  /**
   * Document node-add event
   */
  onAddNode(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable {
    return this[documentSymbol].onNodeCreate((node: InnerNode) => {
      fn(ShellNode.create(node)!);
    });
  }

  /**
   * Document node-add event; node is already mounted on the document
   */
  onMountNode(fn: (payload: { node: IPublicModelNode }) => void): IPublicTypeDisposable {
    return this[documentSymbol].onMountNode(({
      node,
    }) => {
      fn({ node: ShellNode.create(node)! });
    });
  }

  /**
   * Document node-remove event
   */
  onRemoveNode(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable {
    return this[documentSymbol].onNodeDestroy((node: InnerNode) => {
      fn(ShellNode.create(node)!);
    });
  }

  /**
   * Document hover change event
   */
  onChangeDetecting(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable {
    return this[documentSymbol].designer.detecting.onDetectingChange((node: InnerNode) => {
      fn(ShellNode.create(node)!);
    });
  }

  /**
   * Document selection change event
   */
  onChangeSelection(fn: (ids: string[]) => void): IPublicTypeDisposable {
    return this[documentSymbol].selection.onSelectionChange((ids: string[]) => {
      fn(ids);
    });
  }

  /**
   * Document node visibility change event
   * @param fn
   */
  onChangeNodeVisible(fn: (node: IPublicModelNode, visible: boolean) => void): IPublicTypeDisposable {
    return this[documentSymbol].onChangeNodeVisible((node: InnerNode, visible: boolean) => {
      fn(ShellNode.create(node)!, visible);
    });
  }

  /**
   * Document node children change event
   * @param fn
   */
  onChangeNodeChildren(fn: (info: IPublicTypeOnChangeOptions) => void): IPublicTypeDisposable {
    return this[documentSymbol].onChangeNodeChildren((info?: IPublicTypeOnChangeOptions<InnerNode>) => {
      if (!info) {
        return;
      }
      fn({
        type: info.type,
        node: ShellNode.create(info.node)!,
      });
    });
  }

  /**
   * Document node prop change event
   * @param fn
   */
  onChangeNodeProp(fn: (info: IPublicTypePropChangeOptions) => void): IPublicTypeDisposable {
    const callback = (info: GlobalEvent.Node.Prop.ChangeOptions) => {
      fn({
        key: info.key,
        oldValue: info.oldValue,
        newValue: info.newValue,
        prop: ShellProp.create(info.prop)!,
        node: ShellNode.create(info.node as any)!,
      });
    };
    this[editorSymbol].on(
      GlobalEvent.Node.Prop.InnerChange,
      callback,
    );

    return () => {
      this[editorSymbol].off(
        GlobalEvent.Node.Prop.InnerChange,
        callback,
      );
    };
  }

  /**
   * import schema event
   * @param fn
   */
  onImportSchema(fn: (schema: IPublicTypeRootSchema) => void): IPublicTypeDisposable {
    return this[editorSymbol].eventBus.on('shell.document.importSchema', fn as any);
  }

  isDetectingNode(node: IPublicModelNode): boolean {
    return this.detecting.current === node;
  }

  onFocusNodeChanged(
    fn: (doc: IPublicModelDocumentModel, focusNode: IPublicModelNode) => void,
  ): IPublicTypeDisposable {
    if (!fn) {
      return () => {};
    }
    return this[editorSymbol].eventBus.on(
      'shell.document.focusNodeChanged',
      (payload) => {
        const { document, focusNode } = payload;
        fn(document, focusNode);
      },
    );
  }

  onDropLocationChanged(fn: (doc: IPublicModelDocumentModel) => void): IPublicTypeDisposable {
    if (!fn) {
      return () => {};
    }
    return this[editorSymbol].eventBus.on(
      'document.dropLocation.changed',
      (payload) => {
        const { document } = payload;
        fn(document);
      },
    );
  }
}
