import { IPublicModelPluginInstance, IPublicTypePlugin } from '../model';
import { IPublicTypePreferenceValueType } from '../type';
import { IPublicTypePluginRegisterOptions } from '../type/plugin-register-options';

export interface IPluginPreferenceMananger {
  // eslint-disable-next-line max-len
  getPreferenceValue: (
    key: string,
    defaultValue?: IPublicTypePreferenceValueType,
  ) => IPublicTypePreferenceValueType | undefined;
}

export type PluginOptionsType = string | number | boolean | object;

export interface IPublicApiPlugins {

  /**
   * Get exports from other plugins via the plugin API
   */
  [key: string]: any;

  register(
    pluginModel: IPublicTypePlugin,
    options?: Record<string, PluginOptionsType>,
    registerOptions?: IPublicTypePluginRegisterOptions,
  ): Promise<void>;

  /**
   * Global config can be provided to plugins at engine init; use this to get this plugin's config
   *
   * use this to get preference config for this plugin when engine.init() called
   */
  getPluginPreference(
      pluginName: string,
    ): Record<string, IPublicTypePreferenceValueType> | null | undefined;

  /**
   * Get the specified plug-in
   *
   * get plugin instance by name
   */
  get(pluginName: string): IPublicModelPluginInstance | null;

  /**
   * Get all plugin instances
   *
   * get all plugin instances
   */
  getAll(): IPublicModelPluginInstance[];

  /**
   * Determine whether there is a specified plug-in
   *
   * check if plugin with certain name exists
   */
  has(pluginName: string): boolean;

  /**
   * Delete specified plug-in
   *
   * delete plugin instance by name
   */
  delete(pluginName: string): void;
}
