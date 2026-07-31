import { IPublicModelNode } from './';
import { IPublicTypeDisposable } from '../type';

export interface IPublicModelDetecting<Node = IPublicModelNode> {

  /**
   * Whether to enable
   * check if current detecting is enabled
   * @since v1.1.0
   */
  get enable(): boolean;

  /**
   * The currently hovered node
   * get current hovering node
   * @since v1.0.16
   */
  get current(): Node | null;

  /**
   * hover specified node
   * capture node with nodeId
   * @param id node id
   */
  capture(id: string): void;

  /**
   * hover leaves the specified node
   * release node with nodeId
   * @param id node id
   */
  release(id: string): void;

  /**
   * Clear hover state
   * clear all hover state
   */
  leave(): void;

  /**
   * hover node change event
   * set callback which will be called when hovering object changed.
   * @since v1.1.0
   */
  onDetectingChange(fn: (node: Node | null) => void): IPublicTypeDisposable;
}
