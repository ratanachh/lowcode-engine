import { Node as ShellNode } from './node';
import {
  Detecting as InnerDetecting,
  IDocumentModel as InnerDocumentModel,
  INode as InnerNode,
} from '@rchh/lowcode-designer';
import { documentSymbol, detectingSymbol } from '../symbols';
import { IPublicModelDetecting, IPublicModelNode, IPublicTypeDisposable } from '@rchh/lowcode-types';

export class Detecting implements IPublicModelDetecting {
  private readonly [documentSymbol]: InnerDocumentModel;
  private readonly [detectingSymbol]: InnerDetecting;

  constructor(document: InnerDocumentModel) {
    this[documentSymbol] = document;
    this[detectingSymbol] = document.designer?.detecting;
  }

  /**
   * Control whether outline-tree hover shows a hover effect
   */
  get enable(): boolean {
    return this[detectingSymbol].enable;
  }

  /**
   * Currently hovered node
   */
  get current() {
    return ShellNode.create(this[detectingSymbol].current);
  }

  /**
   * Hover the given node
   * @param id Node id
   */
  capture(id: string) {
    this[detectingSymbol].capture(this[documentSymbol].getNode(id));
  }

  /**
   * Leave hover on the given node
   * @param id Node id
   */
  release(id: string) {
    this[detectingSymbol].release(this[documentSymbol].getNode(id));
  }

  /**
   * Clear hover state
   */
  leave() {
    this[detectingSymbol].leave(this[documentSymbol]);
  }

  onDetectingChange(fn: (node: IPublicModelNode | null) => void): IPublicTypeDisposable {
    const innerFn = (innerNode: InnerNode) => {
      const shellNode = ShellNode.create(innerNode);
      fn(shellNode);
    };
    return this[detectingSymbol].onDetectingChange(innerFn);
  }
}