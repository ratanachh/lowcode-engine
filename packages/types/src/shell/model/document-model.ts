import { IPublicTypeRootSchema, IPublicTypeDragNodeDataObject, IPublicTypeDragNodeObject, IPublicTypePropChangeOptions, IPublicTypeDisposable } from '../type';
import { IPublicEnumTransformStage } from '../enum';
import { IPublicApiProject } from '../api';
import { IPublicModelDropLocation, IPublicModelDetecting, IPublicModelNode, IPublicModelSelection, IPublicModelHistory, IPublicModelModalNodesManager } from './';
import { IPublicTypeNodeData, IPublicTypeNodeSchema, IPublicTypeOnChangeOptions } from '@rchh/lowcode-types';

export interface IPublicModelDocumentModel<
  Selection = IPublicModelSelection,
  History = IPublicModelHistory,
  Node = IPublicModelNode,
  DropLocation = IPublicModelDropLocation,
  ModalNodesManager = IPublicModelModalNodesManager,
  Project = IPublicApiProject
> {

  /**
     * Node selected area model example
     * instance of selection
     */
  selection: Selection;

  /**
   * Canvas node hover area model instance
   * instance of detecting
   */
  detecting: IPublicModelDetecting;

  /**
   * Operation history model example
   * instance of history
   */
  history: History;

  /**
   * id
   */
  get id(): string;

  set id(id);

  /**
   * Get the project to which the current document belongs
   * get project which this documentModel belongs to
   * @returns
   */
  get project(): Project;

  /**
   * Get the root node of the document
   * root node of this documentModel
   * @returns
   */
  get root(): Node | null;

  get focusNode(): Node | null;

  set focusNode(node: Node | null);

  /**
   * Get all nodes under the document
   * @returns
   */
  get nodesMap(): Map<string, Node>;

  /**
   * Modal node management
   * get instance of modalNodesManager
   */
  get modalNodesManager(): ModalNodesManager | null;

  /**
   * Return Node instance based on nodeId
   * get node by nodeId
   * @param nodeId
   * @returns
   */
  getNodeById(nodeId: string): Node | null;

  /**
   * import schema
   * import schema data
   * @param schema
   */
  importSchema(schema: IPublicTypeRootSchema): void;

  /**
   * export schema
   * export schema
   * @param stage
   * @returns
   */
  exportSchema(stage: IPublicEnumTransformStage): IPublicTypeRootSchema | undefined;

  /**
   * Insert node
   * insert a node
   */
  insertNode(
    parent: Node,
    thing: Node | IPublicTypeNodeData,
    at?: number | null | undefined,
    copy?: boolean | undefined
  ): Node | null;

  /**
   * Create a node
   * create a node
   * @param data
   * @returns
   */
  createNode<T = Node>(data: IPublicTypeNodeSchema): T | null;

  /**
   * Remove the specified node/node id
   * remove a node by node instance or nodeId
   * @param idOrNode
   */
  removeNode(idOrNode: string | Node): void;

  /**
   * componentsMap of documentModel
   * @param extraComps
   * @returns
   */
  getComponentsMap(extraComps?: string[]): any;

  /**
   * Check whether the target node of drag and drop can place the drag object
   * check if dragOjbect can be put in this dragTarget
   * @param dropTarget The target node for dragging and dropping
   * @param dragObject the dragged object
   * @returns boolean whether it can be placed
   * @since v1.0.16
   */
  checkNesting(
    dropTarget: Node,
    dragObject: IPublicTypeDragNodeObject | IPublicTypeDragNodeDataObject
  ): boolean;

  /**
   * New node event in current document
   * set callback for event on node is created for a document
   */
  onAddNode(fn: (node: Node) => void): IPublicTypeDisposable;

  /**
   * A new node event is added to the current document. At this time, the node has been mounted on the document.
   * set callback for event on node is mounted to canvas
   */
  onMountNode(fn: (payload: { node: Node }) => void): IPublicTypeDisposable;

  /**
   * Current document delete node event
   * set callback for event on node is removed
   */
  onRemoveNode(fn: (node: Node) => void): IPublicTypeDisposable;

  /**
   * The hover change event of the current document
   *
   * set callback for event on detecting changed
   */
  onChangeDetecting(fn: (node: Node) => void): IPublicTypeDisposable;

  /**
   * The selection change event of the current document
   * set callback for event on selection changed
   */
  onChangeSelection(fn: (ids: string[]) => void): IPublicTypeDisposable;

  /**
   * The node visible and hidden status change event of the current document
   * set callback for event on visibility changed for certain node
   * @param fn
   */
  onChangeNodeVisible(fn: (node: Node, visible: boolean) => void): IPublicTypeDisposable;

  /**
   * The node children change event of the current document
   * @param fn
   */
  onChangeNodeChildren(fn: (info: IPublicTypeOnChangeOptions<Node>) => void): IPublicTypeDisposable;

  /**
   * Current document node attribute modification event
   * @param fn
   */
  onChangeNodeProp(fn: (info: IPublicTypePropChangeOptions<Node>) => void): IPublicTypeDisposable;

  /**
   * import schema event
   * @param fn
   * @since v1.0.15
   */
  onImportSchema(fn: (schema: IPublicTypeRootSchema) => void): IPublicTypeDisposable;

  /**
   * Determine whether the current node is in the detected state
   * check is node being detected
   * @param node
   * @since v1.1.0
   */
  isDetectingNode(node: Node): boolean;

  /**
   * Get current DropLocation information
   * get current drop location
   * @since v1.1.0
   */
  get dropLocation(): DropLocation | null;

  /**
   * Set current DropLocation information
   * set current drop location
   * @since v1.1.0
   */
  set dropLocation(loc: DropLocation | null);

  /**
   * Set callbacks for changes in the focus node
   * triggered focused node is set mannually from plugin
   * @param fn
   * @since v1.1.0
   */
  onFocusNodeChanged(
    fn: (doc: IPublicModelDocumentModel, focusNode: Node) => void,
  ): IPublicTypeDisposable;

  /**
   * Set the callback for DropLocation changes
   * triggered when drop location changed
   * @param fn
   * @since v1.1.0
   */
  onDropLocationChanged(fn: (doc: IPublicModelDocumentModel) => void): IPublicTypeDisposable;
}
