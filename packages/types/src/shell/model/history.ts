import { IPublicTypeDisposable } from '../type';

export interface IPublicModelHistory {

  /**
   * Jump history to a specified position
   * go to a specific history
   * @param cursor
   */
  go(cursor: number): void;

  /**
   * Go back in history
   * go backward in history
   */
  back(): void;

  /**
   * Go forward in history
   * go forward in history
   */
  forward(): void;

  /**
   * Save the current state
   * do save current change as a record in history
   */
  savePoint(): void;

  /**
   * Whether the current point is a save point (has unsaved changes)
   * check if there is unsaved change for history
   */
  isSavePoint(): boolean;

  /**
   * Get state flags for whether undo/redo are available
   * get flags in number which indicat current change state
   *
   *  |    1     |     1    |    1     |
   *  | -------- | -------- | -------- |
   *  | modified | redoable | undoable |
   * eg.
   *  7 means : modified && redoable && undoable
   *  5 means : modified && undoable
   */
  getState(): number;

  /**
   * Listen for state change events
   * monitor on stateChange event
   * @param func
   */
  onChangeState(func: () => any): IPublicTypeDisposable;

  /**
   * Listen for history cursor position change events
   * monitor on cursorChange event
   * @param func
   */
  onChangeCursor(func: () => any): IPublicTypeDisposable;
}
