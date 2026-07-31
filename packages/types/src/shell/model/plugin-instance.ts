import { IPublicTypePluginMeta } from '../type/plugin-meta';

export interface IPublicModelPluginInstance {

  /**
   * Whether disabled
   * current plugin instance is disabled or not
   */
  disabled: boolean;

  /**
   * Plugin name
   * plugin name
   */
  get pluginName(): string;

  /**
   * Dependency info; other plugins this depends on
   * depenency info
   */
  get dep(): string[];

  /**
   * Plugin configuration metadata
   * meta info of this plugin
   */
  get meta(): IPublicTypePluginMeta;
}
