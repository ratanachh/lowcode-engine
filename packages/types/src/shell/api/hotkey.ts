import { IPublicTypeDisposable, IPublicTypeHotkeyCallback, IPublicTypeHotkeyCallbacks } from '../type';

export interface IPublicApiHotkey {

  /**
   * Get the current shortcut key configuration
   *
   * @experimental
   * @since v1.1.0
   */
  get callbacks(): IPublicTypeHotkeyCallbacks;

  /**
   * Bind shortcut keys
   * bind hotkey/hotkeys,
   * @param combos shortcut keys, formats such as: ['command + s'], ['ctrl + shift + s'], etc.
   * @param callback callback function
   * @param action
   */
  bind(
      combos: string[] | string,
      callback: IPublicTypeHotkeyCallback,
      action?: string,
    ): IPublicTypeDisposable;
}
