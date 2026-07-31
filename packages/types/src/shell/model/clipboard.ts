
export interface IPublicModelClipboard {

  /**
   * Write a value to the clipboard
   * set data to clipboard
   *
   * @param {*} data
   * @since v1.1.0
   */
  setData(data: any): void;

  /**
   * Set the callback for clipboard data assignment
   * set callback for clipboard provide paste data
   *
   * @param {KeyboardEvent} keyboardEvent
   * @param {(data: any, clipboardEvent: ClipboardEvent) => void} cb
   * @since v1.1.0
   */
  waitPasteData(
      keyboardEvent: KeyboardEvent,
      cb: (data: any, clipboardEvent: ClipboardEvent) => void,
    ): void;
}
