import { IPublicModelNode } from './';
import { IPublicTypeDisposable } from '../type';

export interface IPublicModelSelection<
  Node = IPublicModelNode
> {

  /**
   * Returns the selected node id
   * get ids of selected nodes
   */
  get selected(): string[];

  /**
   * Return the selected node (if there are multiple nodes, only the first one is returned)
   * return selected Node instance，return the first one if multiple nodes are selected
   * @since v1.1.0
   */
  get node(): Node | null;

  /**
   * Select the specified node (overwrite mode)
   * select node with id, this will override current selection
   * @param id
   */
  select(id: string): void;

  /**
   * Select specified nodes in batches
   * select node with ids, this will override current selection
   *
   * @param ids
   */
  selectAll(ids: string[]): void;

  /**
   * Remove selected specified node
   * remove node from selection with node id
   * @param id
   */
  remove(id: string): void;

  /**
   * Clear all selected nodes
   * clear current selection
   */
  clear(): void;

  /**
   * Determine whether the specified node is selected
   * check if node with specific id is selected
   * @param id
   */
  has(id: string): boolean;

  /**
   * Select the specified node (incremental mode)
   * add node with specific id to selection
   * @param id
   */
  add(id: string): void;

  /**
   * Get the selected node instance
   * get selected nodes
   */
  getNodes(): Node[];

  /**
   * Get the top node of the selection
   * get seleted top nodes
   * for example:
   *  getNodes() returns [A, subA, B], then
   *  getTopNodes() will return [A, B], subA will be removed
   * @since v1.0.16
   */
  getTopNodes(includeRoot?: boolean): Node[];

  /**
   * Register selection change event callback
   * set callback which will be called when selection is changed
   * @since v1.1.0
   */
  onSelectionChange(fn: (ids: string[]) => void): IPublicTypeDisposable;
}
