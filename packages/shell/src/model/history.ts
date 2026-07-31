import type { IDocumentModel as InnerDocumentModel, IHistory as InnerHistory } from '@rchh/lowcode-designer';
import { historySymbol, documentSymbol } from '../symbols';
import { IPublicModelHistory, IPublicTypeDisposable } from '@rchh/lowcode-types';

export class History implements IPublicModelHistory {
  private readonly [documentSymbol]: InnerDocumentModel;

  private get [historySymbol](): InnerHistory {
    return this[documentSymbol].getHistory();
  }

  constructor(document: InnerDocumentModel) {
    this[documentSymbol] = document;
  }

  /**
   * Jump history to a specific position
   * @param cursor
   */
  go(cursor: number): void {
    this[historySymbol].go(cursor);
  }

  /**
   * History back
   */
  back(): void {
    this[historySymbol].back();
  }

  /**
   * History forward
   */
  forward(): void {
    this[historySymbol].forward();
  }

  /**
   * Save current state
   */
  savePoint(): void {
    this[historySymbol].savePoint();
  }

  /**
   * Whether current is a save point (has unsaved changes)
   * @returns
   */
  isSavePoint(): boolean {
    return this[historySymbol].isSavePoint();
  }

  /**
   * Get state flags for whether back/forward are available
   * @returns
   */
  getState(): number {
    return this[historySymbol].getState();
  }

  /**
   * Listen for state change events
   * @param func
   * @returns
   */
  onChangeState(func: () => any): IPublicTypeDisposable {
    return this[historySymbol].onChangeState(func);
  }

  /**
   * Listen for history cursor position change events
   * @param func
   * @returns
   */
  onChangeCursor(func: () => any): IPublicTypeDisposable {
    return this[historySymbol].onChangeCursor(func);
  }
}
