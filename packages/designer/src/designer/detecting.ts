import { makeObservable, obx, IEventBus, createModuleEventBus } from '@rchh/lowcode-editor-core';
import { IPublicModelDetecting } from '@rchh/lowcode-types';
import type { IDocumentModel } from '../document/document-model';
import type { INode } from '../document/node/node';

const DETECTING_CHANGE_EVENT = 'detectingChange';
export interface IDetecting extends Omit<IPublicModelDetecting<INode>,
  'capture' |
  'release' |
  'leave'
> {
  capture(node: INode | null): void;

  release(node: INode | null): void;

  leave(document: IDocumentModel | undefined): void;

  get current(): INode | null;
}

export class Detecting implements IDetecting {
  @obx.ref private _enable = true;

  /**
   * Control whether outline-tree hover shows hover effect
   * TODO: extract this logic from the designer
   */
  get enable() {
    return this._enable;
  }

  set enable(flag: boolean) {
    this._enable = flag;
    if (!flag) {
      this._current = null;
    }
  }

  @obx.ref xRayMode = false;

  @obx.ref private _current: INode | null = null;

  private emitter: IEventBus = createModuleEventBus('Detecting');

  constructor() {
    makeObservable(this);
  }

  get current() {
    return this._current;
  }

  capture(node: INode | null) {
    if (this._current !== node) {
      this._current = node;
      this.emitter.emit(DETECTING_CHANGE_EVENT, this.current);
    }
  }

  release(node: INode | null) {
    if (this._current === node) {
      this._current = null;
      this.emitter.emit(DETECTING_CHANGE_EVENT, this.current);
    }
  }

  leave(document: IDocumentModel | undefined) {
    if (this.current && this.current.document === document) {
      this._current = null;
    }
  }

  onDetectingChange(fn: (node: INode) => void) {
    this.emitter.on(DETECTING_CHANGE_EVENT, fn);
    return () => {
      this.emitter.off(DETECTING_CHANGE_EVENT, fn);
    };
  }
}
