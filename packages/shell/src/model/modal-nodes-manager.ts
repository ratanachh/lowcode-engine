import {
  IModalNodesManager as InnerModalNodesManager,
  INode as InnerNode,
} from '@rchh/lowcode-designer';
import { IPublicModelModalNodesManager, IPublicModelNode } from '@rchh/lowcode-types';
import { Node as ShellNode } from './node';
import { nodeSymbol, modalNodesManagerSymbol } from '../symbols';

export class ModalNodesManager implements IPublicModelModalNodesManager {
  private readonly [modalNodesManagerSymbol]: InnerModalNodesManager;

  constructor(modalNodesManager: InnerModalNodesManager) {
    this[modalNodesManagerSymbol] = modalNodesManager;
  }

  static create(
    modalNodesManager: InnerModalNodesManager | null,
  ): IPublicModelModalNodesManager | null {
    if (!modalNodesManager) {
      return null;
    }
    return new ModalNodesManager(modalNodesManager);
  }

  /**
   * Set modal node(s); triggers internal events
   */
  setNodes(): void {
    this[modalNodesManagerSymbol].setNodes();
  }

  /**
   * Get modal node(s)
   */
  getModalNodes(): IPublicModelNode[] {
    const innerNodes = this[modalNodesManagerSymbol].getModalNodes();
    const shellNodes: IPublicModelNode[] = [];
    innerNodes?.forEach((node: InnerNode) => {
      const shellNode = ShellNode.create(node);
      if (shellNode) {
        shellNodes.push(shellNode);
      }
    });
    return shellNodes;
  }

  /**
   * Get currently visible modal node
   */
  getVisibleModalNode(): IPublicModelNode | null {
    return ShellNode.create(this[modalNodesManagerSymbol].getVisibleModalNode());
  }

  /**
   * Hide modal node(s)
   */
  hideModalNodes(): void {
    this[modalNodesManagerSymbol].hideModalNodes();
  }

  /**
   * Set the given node visible
   * @param node Node
   */
  setVisible(node: IPublicModelNode): void {
    this[modalNodesManagerSymbol].setVisible((node as any)[nodeSymbol]);
  }

  /**
   * Set the given node invisible
   * @param node Node
   */
   setInvisible(node: IPublicModelNode): void {
    this[modalNodesManagerSymbol].setInvisible((node as any)[nodeSymbol]);
  }
}