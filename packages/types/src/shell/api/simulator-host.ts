import { IPublicModelNode, IPublicModelSimulatorRender } from '../model';

export interface IPublicApiSimulatorHost {

  /**
   * Get contentWindow
   * @experimental unstable api, pay extra caution when trying to use it
   */
  get contentWindow(): Window | undefined;

  /**
   * Get contentDocument
   * @experimental unstable api, pay extra caution when trying to use it
   */
  get contentDocument(): Document | undefined;

  /**
   * @experimental unstable api, pay extra caution when trying to use it
   */
  get renderer(): IPublicModelSimulatorRender | undefined;

  /**
   * Set several variables for canvas rendering, such as canvas size, locale, etc.
   * set config for simulator host, eg. device locale and so on.
   * @param key
   * @param value
   */
  set(key: string, value: any): void;

  /**
   * Get the variables set in the simulator, such as canvas size, locale, etc.
   * set config value by key
   * @param key
   * @returns
   */
  get(key: string): any;

  /**
   * Scroll to specified node
   * scroll to specific node
   * @param node
   * @since v1.1.0
   */
  scrollToNode(node: IPublicModelNode): void;

  /**
   * Refresh the render canvas
   * make simulator render again
   */
  rerender(): void;
}
