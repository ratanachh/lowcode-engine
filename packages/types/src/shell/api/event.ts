import { IPublicTypeDisposable } from '../type';

export interface IPublicApiEvent {

  /**
   * Listen for events
   * add monitor to a event
   * @param event event name
   * @param listener event callback
   */
  on(event: string, listener: (...args: any[]) => void): IPublicTypeDisposable;

  /**
   * Listening for events will be executed before other callback functions
   * add monitor to a event
   * @param event event name
   * @param listener event callback
   */
  prependListener(event: string, listener: (...args: any[]) => void): IPublicTypeDisposable;

  /**
   * Cancel listening events
   * cancel a monitor from a event
   * @param event event name
   * @param listener event callback
   */
  off(event: string, listener: (...args: any[]) => void): void;

  /**
   * trigger event
   * emit a message for a event
   * @param event event name
   * @param args event parameters
   * @returns
   */
  emit(event: string, ...args: any[]): void;
}
