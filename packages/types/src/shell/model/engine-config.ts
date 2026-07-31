import { IPublicTypeDisposable } from '../type';
import { IPublicModelPreference } from './';

export interface IPublicModelEngineConfig {

  /**
   * Check whether a specified key has a value
   * check if config has certain key configed
   * @param key
   * @returns
   */
  has(key: string): boolean;

  /**
   * Get the value of a specified key
   * get value by key
   * @param key
   * @param defaultValue
   * @returns
   */
  get(key: string, defaultValue?: any): any;

  /**
   * Set the value of a specified key
   * set value for certain key
   * @param key
   * @param value
   */
  set(key: string, value: any): void;

  /**
   * Batch set values; object form of set
   * set multiple config key-values
   * @param config
   */
  setConfig(config: { [key: string]: any }): void;

  /**
   * Get the value of a key; wait if not yet set, otherwise return immediately
   *  Note: returns a Promise that fulfills only once
   * wait until value of certain key is set, will only be
   * triggered once.
   * @param key
   * @returns
   */
  onceGot(key: string): Promise<any>;

  /**
   * Get the value of a key in callback mode; called again on each assignment
   * set callback for event of value set for some key
   * this will be called each time the value is set
   * @param key
   * @param fn
   * @returns
   */
  onGot(key: string, fn: (data: any) => void): IPublicTypeDisposable;

  /**
   * Get global Preference for browser-side user preferences, e.g. whether a Panel is pinned
   * get global user preference manager, which can be use to store
   * user`s preference in user localstorage, such as a panel is pinned or not.
   * @returns {IPublicModelPreference}
   * @since v1.1.0
   */
  getPreference(): IPublicModelPreference;
}
