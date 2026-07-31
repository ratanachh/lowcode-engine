import { IPublicModelSkeletonItem } from '../model';
import { IPublicTypeConfigTransducer, IPublicTypeDisposable, IPublicTypeSkeletonConfig, IPublicTypeWidgetConfigArea } from '../type';

export interface IPublicApiSkeleton {

  /**
   * Add a panel instance
   * add a new panel
   * @param config
   * @param extraConfig
   * @returns
   */
  add(config: IPublicTypeSkeletonConfig, extraConfig?: Record<string, any>): IPublicModelSkeletonItem | undefined;

  /**
   * Remove a panel instance
   * remove a panel
   * @param config
   * @returns
   */
  remove(config: IPublicTypeSkeletonConfig): number | undefined;

  /**
   * Get all panel instances under a certain area
   * @param areaName IPublicTypeWidgetConfigArea
   */
  getAreaItems(areaName: IPublicTypeWidgetConfigArea): IPublicModelSkeletonItem[] | undefined;

  /**
   * Get panel instance
   * @param name panel name
   * @since v1.1.10
   */
  getPanel(name: string): IPublicModelSkeletonItem | undefined;

  /**
   * Display the specified Panel instance
   * show panel by name
   * @param name
   */
  showPanel(name: string): void;

  /**
   * Hide panel
   * hide panel by name
   * @param name
   */
  hidePanel(name: string): void;

  /**
   * Display the specified Widget instance
   * show widget by name
   * @param name
   */
  showWidget(name: string): void;

  /**
   * Enable the widget
   * enable widget by name
   * @param name
   */
  enableWidget(name: string): void;

  /**
   * Hide the specified widget instance
   * hide widget by name
   * @param name
   */
  hideWidget(name: string): void;

  /**
   * Disable the widget. After disabling it, all mouse events will be disabled.
   * disable widget，and make it not responding any click event.
   * @param name
   */
  disableWidget(name: string): void;

  /**
   * Show an Area
   * show area
   * @param areaName name of area
   */
  showArea(areaName: string): void;

  /**
   * Hide an Area
   * hide area
   * @param areaName name of area
   */
  hideArea(areaName: string): void;

  /**
   * Listen for Panel show events
   * set callback for panel shown event
   * @param listener
   * @returns
   */
  onShowPanel(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;

  /**
   * Listen for Panel hide events
   * set callback for panel hidden event
   * @param listener
   * @returns
   */
  onHidePanel(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;

  /**
   * Listen for Widget disable events
   * @param listener
   */
  onDisableWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;

  /**
   * Listen for Widget enable events
   * @param listener
   */
  onEnableWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;

  /**
   * Listen for Widget show events
   * set callback for widget shown event
   * @param listener
   * @returns
   */
  onShowWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;

  /**
   * Listen for Widget hide events
   * set callback for widget hidden event
   * @param listener
   * @returns
   */
  onHideWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;

  /**
   * Register a panel config transducer.
   * Registers a configuration transducer for a panel.
   * @param {IPublicTypeConfigTransducer} transducer
   *   - The transducer function to register. Accepts a config object (IPublicTypeSkeletonConfig) and returns the modified config.
   *   - The transducer function to be registered. This function takes a configuration object (of type IPublicTypeSkeletonConfig) as input and returns a modified configuration object.
   *
   * @param {number} level
   *   - Transducer priority. Higher priority transducers run first.
   *   - The priority level of the transducer. Transducers with higher priority levels are executed first.
   *
   * @param {string} [id]
   *   - (Optional) Unique transducer id, used to reference or operate on a specific transducer.
   *   - (Optional) A unique identifier for the transducer. Used for referencing or manipulating a specific transducer when needed.
   */
  registerConfigTransducer(transducer: IPublicTypeConfigTransducer, level: number, id?: string): void;
}
