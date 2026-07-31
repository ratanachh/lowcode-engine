import {
  IDocumentModel as InnerDocumentModel,
  INode as InnerNode,
  ISelection,
} from '@rchh/lowcode-designer';
import { Node as ShellNode } from './node';
import { selectionSymbol } from '../symbols';
import { IPublicModelSelection, IPublicModelNode, IPublicTypeDisposable } from '@rchh/lowcode-types';

export class Selection implements IPublicModelSelection {
  private readonly [selectionSymbol]: ISelection;

  constructor(document: InnerDocumentModel) {
    this[selectionSymbol] = document.selection;
  }

  /**
   * Return selected node id(s)
   */
  get selected(): string[] {
    return this[selectionSymbol].selected;
  }

  /**
   * return selected Node instance
   */
  get node(): IPublicModelNode | null {
    const nodes = this.getNodes();
    return nodes && nodes.length > 0 ? nodes[0] : null;
  }

  /**
   * Select node(s) (replace selection)
   * @param id
   */
  select(id: string): void {
    this[selectionSymbol].select(id);
  }

  /**
   * Select multiple nodes in batch
   * @param ids
   */
  selectAll(ids: string[]): void {
    this[selectionSymbol].selectAll(ids);
  }

  /**
   * Remove a node from selection
   * @param id
   */
  remove(id: string): void {
    this[selectionSymbol].remove(id);
  }

  /**
   * Clear all selected nodes
   */
  clear(): void {
    this[selectionSymbol].clear();
  }

  /**
   * Whether the given node is selected
   * @param id
   * @returns
   */
  has(id: string): boolean {
    return this[selectionSymbol].has(id);
  }

  /**
   * Select a node (additive)
   * @param id
   */
  add(id: string): void {
    this[selectionSymbol].add(id);
  }

  /**
   * Get selected node instance(s)
   * @returns
   */
  getNodes(): IPublicModelNode[] {
    const innerNodes = this[selectionSymbol].getNodes();
    const nodes: IPublicModelNode[] = [];
    innerNodes.forEach((node: InnerNode) => {
      const shellNode = ShellNode.create(node);
      if (shellNode) {
        nodes.push(shellNode);
      }
    });
    return nodes;
  }

  /**
   * Get top-level nodes of the selection
   * for example:
   *  getNodes() returns [A, subA, B], then
   *  getTopNodes() will return [A, B], subA will be removed
   * @returns
   */
  getTopNodes(includeRoot: boolean = false): IPublicModelNode[] {
    const innerNodes = this[selectionSymbol].getTopNodes(includeRoot);
    const nodes: IPublicModelNode[] = [];
    innerNodes.forEach((node: InnerNode) => {
      const shellNode = ShellNode.create(node);
      if (shellNode) {
        nodes.push(shellNode);
      }
    });
    return nodes;
  }

  onSelectionChange(fn: (ids: string[]) => void): IPublicTypeDisposable {
    return this[selectionSymbol].onSelectionChange(fn);
  }
}
