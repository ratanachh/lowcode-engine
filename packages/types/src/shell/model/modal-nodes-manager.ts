import { IPublicModelNode } from './';

export interface IPublicModelModalNodesManager<Node = IPublicModelNode> {

  /**
   * Set modal nodes and fire internal events
   * set modal nodes, trigger internal events
   */
  setNodes(): void;

  /**
   * Get modal node(s)
   * get modal nodes
   */
  getModalNodes(): Node[];

  /**
   * Get the currently visible modal node
   * get current visible modal node
   */
  getVisibleModalNode(): Node | null;

  /**
   * Hide modal node(s)
   * hide modal nodes
   */
  hideModalNodes(): void;

  /**
   * Set a specified node as visible
   * set specfic model node as visible
   * @param node Node
   */
  setVisible(node: Node): void;

  /**
   * Set a specified node as hidden
   * set specfic model node as invisible
   * @param node Node
   */
  setInvisible(node: Node): void;
}
