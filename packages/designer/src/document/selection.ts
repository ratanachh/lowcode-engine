import { obx, makeObservable, IEventBus, createModuleEventBus } from '@rchh/lowcode-editor-core';
import { INode, comparePosition, PositionNO } from './node/node';
import { DocumentModel } from './document-model';
import { IPublicModelSelection } from '@rchh/lowcode-types';

export interface ISelection extends Omit<IPublicModelSelection<INode>, 'node'> {
  containsNode(node: INode, excludeRoot: boolean): boolean;
}

export class Selection implements ISelection {
  private emitter: IEventBus = createModuleEventBus('Selection');

  @obx.shallow private _selected: string[] = [];

  constructor(readonly doc: DocumentModel) {
    makeObservable(this);
  }

  /**
   * Selected node ids
   */
  get selected(): string[] {
    return this._selected;
  }

  /**
   * Select
   */
  select(id: string) {
    if (this._selected.length === 1 && this._selected.indexOf(id) > -1) {
      // avoid cause reaction
      return;
    }

    const node = this.doc.getNode(id);

    if (!node?.canSelect()) {
      return;
    }

    this._selected = [id];
    this.emitter.emit('selectionchange', this._selected);
  }

  /**
   * Batch select
   */
  selectAll(ids: string[]) {
    const selectIds: string[] = [];

    ids.forEach(d => {
      const node = this.doc.getNode(d);

      if (node?.canSelect()) {
        selectIds.push(d);
      }
    });

    this._selected = selectIds;

    this.emitter.emit('selectionchange', this._selected);
  }

  /**
   * Clear selection
   */
  clear() {
    if (this._selected.length < 1) {
      return;
    }
    this._selected = [];
    this.emitter.emit('selectionchange', this._selected);
  }

  /**
   * Normalize selection
   */
  dispose() {
    const l = this._selected.length;
    let i = l;
    while (i-- > 0) {
      const id = this._selected[i];
      if (!this.doc.hasNode(id)) {
        this._selected.splice(i, 1);
      }
    }
    if (this._selected.length !== l) {
      this.emitter.emit('selectionchange', this._selected);
    }
  }

  /**
   * Add to selection
   */
  add(id: string) {
    if (this._selected.indexOf(id) > -1) {
      return;
    }

    this._selected.push(id);
    this.emitter.emit('selectionchange', this._selected);
  }

  /**
   * Whether selected
   */
  has(id: string) {
    return this._selected.indexOf(id) > -1;
  }

  /**
   * Remove from selection
   */
  remove(id: string) {
    const i = this._selected.indexOf(id);
    if (i > -1) {
      this._selected.splice(i, 1);
      this.emitter.emit('selectionchange', this._selected);
    }
  }

  /**
   * Whether selection contains the node
   */
  containsNode(node: INode, excludeRoot = false) {
    for (const id of this._selected) {
      const parent = this.doc.getNode(id);
      if (excludeRoot && parent?.contains(this.doc.focusNode)) {
        continue;
      }
      if (parent?.contains(node)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get selected nodes
   */
  getNodes(): INode[] {
    const nodes: INode[] = [];
    for (const id of this._selected) {
      const node = this.doc.getNode(id);
      if (node) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  /**
   * Get top-level selected nodes; e.g. when dragging, overlay only the topmost
   */
  getTopNodes(includeRoot = false) {
    const nodes = [];
    for (const id of this._selected) {
      const node = this.doc.getNode(id);
      // Exclude root node
      if (!node || (!includeRoot && node.contains(this.doc.focusNode))) {
        continue;
      }
      let i = nodes.length;
      let isTop = true;
      while (i-- > 0) {
        const n = comparePosition(nodes[i], node);
        // nodes[i] contains node
        if (n === PositionNO.Contains || n === PositionNO.TheSame) {
          isTop = false;
          break;
        } else if (n === PositionNO.ContainedBy) {
          // node contains nodes[i], delete nodes[i]
          nodes.splice(i, 1);
        }
      }
      // node is top item, push to nodes
      if (isTop) {
        nodes.push(node);
      }
    }
    return nodes;
  }

  onSelectionChange(fn: (ids: string[]) => void): () => void {
    this.emitter.on('selectionchange', fn);
    return () => {
      this.emitter.removeListener('selectionchange', fn);
    };
  }
}
