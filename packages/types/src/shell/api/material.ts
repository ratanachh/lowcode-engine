import { IPublicTypeAssetsJson, IPublicTypeMetadataTransducer, IPublicTypeComponentAction, IPublicTypeNpmInfo, IPublicTypeDisposable, IPublicTypeContextMenuAction, IPublicTypeContextMenuItem } from '../type';
import { IPublicModelComponentMeta } from '../model';
import { ComponentType } from 'react';

export interface IPublicApiMaterial {

  /**
   * Get component map structure
   * get map of components
   */
  get componentsMap(): { [key: string]: IPublicTypeNpmInfo | ComponentType<any> | object } ;

  /**
   * Set up the "asset package" structure
   * set data for Assets
   * @returns void
   */
  setAssets(assets: IPublicTypeAssetsJson): Promise<void>;

  /**
   * Get the "asset package" structure
   * get AssetsJson data
   * @returns IPublicTypeAssetsJson
   */
  getAssets(): IPublicTypeAssetsJson | undefined;

  /**
   * Load the incremental "asset package" structure, which will be merged with the original one
   * load Assets incrementally, and will merge this with exiting assets
   * @param incrementalAssets
   * @returns
   */
  loadIncrementalAssets(incrementalAssets: IPublicTypeAssetsJson): void;

  /**
   * Register the material metadata pipeline function and execute it when the material information is initialized.
   * register transducer to process component meta, which will be
   * excuted during component meta`s initialization
   * @param transducer
   * @param level
   * @param id
   */
  registerMetadataTransducer(
    transducer: IPublicTypeMetadataTransducer,
    level?: number,
    id?: string | undefined
  ): void;

  /**
   * Get all material metadata pipeline function
   * get all registered metadata transducers
   * @returns {IPublicTypeMetadataTransducer[]}
   */
  getRegisteredMetadataTransducers(): IPublicTypeMetadataTransducer[];

  /**
   * Get the material metadata of the specified name
   * get component meta by component name
   * @param componentName
   * @returns
   */
  getComponentMeta(componentName: string): IPublicModelComponentMeta | null;

  /**
   * test if the given object is a ComponentMeta instance or not
   * @param obj
   * @experiemental unstable API, pay extra caution when trying to use it
   */
  isComponentMeta(obj: any): boolean;

  /**
   * Get all registered material metadata
   * get map of all component metas
   */
  getComponentMetasMap(): Map<string, IPublicModelComponentMeta>;

  /**
   * Add an extension action to the designer auxiliary layer
   *
   * add an action button in canvas context menu area
   * @param action
   * @example
   * ```ts
   * import { plugins } from '@rchh/lowcode-engine';
   * import { IPublicModelPluginContext } from '@rchh/lowcode-types';
   *
   * const removeCopyAction = (ctx: IPublicModelPluginContext) => {
   *   return {
   *     async init() {
   *       const { removeBuiltinComponentAction } = ctx.material;
   *       removeBuiltinComponentAction('copy');
   *     }
   *   }
   * };
   * removeCopyAction.pluginName = 'removeCopyAction';
   * await plugins.register(removeCopyAction);
   * ```
   */
  addBuiltinComponentAction(action: IPublicTypeComponentAction): void;

  /**
   * Remove a specified action from the designer helper layer
   * remove a builtin action button from canvas context menu area
   * @param name
   */
  removeBuiltinComponentAction(name: string): void;

  /**
   * Modify an existing action on the designer helper layer
   * modify a builtin action button in canvas context menu area
   * @param actionName
   * @param handle
   */
  modifyBuiltinComponentAction(
      actionName: string,
      handle: (action: IPublicTypeComponentAction) => void,
    ): void;

  /**
   * Listen for assets change events
   * add callback for assets changed event
   * @param fn
   */
  onChangeAssets(fn: () => void): IPublicTypeDisposable;

  /**
   * Refresh componentMetasMap; may trigger component rebuild in the simulator
   * @since v1.1.7
   */
  refreshComponentMetasMap(): void;

  /**
   * Add a context-menu item
   * @param action
   */
  addContextMenuOption(action: IPublicTypeContextMenuAction): void;

  /**
   * Remove a specific context-menu item
   * @param name
   */
  removeContextMenuOption(name: string): void;

  /**
   * Adjust context-menu item layout
   * @param actions
   */
  adjustContextMenuLayout(fn: (actions: IPublicTypeContextMenuItem[]) => IPublicTypeContextMenuItem[]): void;
}
