import { IPublicTypeNodeSchema, IPublicTypeNodeData } from '../type';
import { IPublicEnumTransformStage } from '../enum';
import { IPublicModelNode } from './';

export interface IPublicModelNodeChildren<
  Node = IPublicModelNode
> {

  /**
   * Return the node instance that owns this children instance
   * get owner node of this nodeChildren
   */
  get owner(): Node | null;

  /**
   * Number of node instances in children
   * get count of child nodes
   */
  get size(): number;

  /**
   * @deprecated please use isEmptyNode
   * Whether empty
   * @returns
   */
  get isEmpty(): boolean;

  /**
   * Whether empty
   *
   * @returns
   */
  get isEmptyNode(): boolean;

  /**
   * @deprecated please use notEmptyNode
   * judge if it is not empty
   */
  get notEmpty(): boolean;

  /**
   * judge if it is not empty
   */
  get notEmptyNode(): boolean;

  /**
   * Remove a specified node
   *
   * delete the node
   * @param node
   */
  delete(node: Node): boolean;

  /**
   * Insert a node
   *
   * insert a node at specific position
   * @param node node to insert
   * @param at insert index
   * @returns
   */
  insert(node: Node, at?: number | null): void;

  /**
   * Return the index of a specified node
   *
   * get index of node in current children
   * @param node
   * @returns
   */
  indexOf(node: Node): number;

  /**
   * Array-like splice operation
   *
   * provide the same function with {Array.prototype.splice}
   * @param start
   * @param deleteCount
   * @param node
   */
  splice(start: number, deleteCount: number, node?: Node): any;

  /**
   * Return the node at a specified index
   *
   * get node with index
   * @param index
   * @returns
   */
  get(index: number): Node | null;

  /**
   * Whether a specified node is included
   *
   * check if node exists in current children
   * @param node
   * @returns
   */
  has(node: Node): boolean;

  /**
   * Array-like forEach
   *
   * provide the same function with {Array.prototype.forEach}
   * @param fn
   */
  forEach(fn: (node: Node, index: number) => void): void;

  /**
   * Array-like reverse
   *
   * provide the same function with {Array.prototype.reverse}
   */
  reverse(): Node[];

  /**
   * Array-like map
   *
   * provide the same function with {Array.prototype.map}
   * @param fn
   */
  map<T = any>(fn: (node: Node, index: number) => T): T[] | null;

  /**
   * Array-like every
   * provide the same function with {Array.prototype.every}
   * @param fn
   */
  every(fn: (node: Node, index: number) => boolean): boolean;

  /**
   * Array-like some
   * provide the same function with {Array.prototype.some}
   * @param fn
   */
  some(fn: (node: Node, index: number) => boolean): boolean;

  /**
   * Array-like filter
   * provide the same function with {Array.prototype.filter}
   * @param fn
   */
  filter(fn: (node: Node, index: number) => boolean): any;

  /**
   * Array-like find
   * provide the same function with {Array.prototype.find}
   * @param fn
   */
  find(fn: (node: Node, index: number) => boolean): Node | null | undefined;

  /**
   * Array-like reduce
   *
   * provide the same function with {Array.prototype.reduce}
   * @param fn
   */
  reduce(fn: (acc: any, cur: Node) => any, initialValue: any): void;

  /**
   * import schema
   *
   * import schema
   * @param data
   */
  importSchema(data?: IPublicTypeNodeData | IPublicTypeNodeData[]): void;

  /**
   * export schema
   *
   * export schema
   * @param stage
   */
  exportSchema(stage: IPublicEnumTransformStage): IPublicTypeNodeSchema;

  /**
   * Perform add, remove, sort, and similar operations
   *
   * excute remove/add/sort operations
   * @param remover
   * @param adder
   * @param sorter
   */
  mergeChildren(
    remover: (node: Node, idx: number) => boolean,
    adder: (children: Node[]) => IPublicTypeNodeData[] | null,
    sorter: (firstNode: Node, secondNode: Node) => number
  ): any;

}
