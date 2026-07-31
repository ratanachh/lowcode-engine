import { IPublicTypeComponentConfigure, ConfigureSupport, IPublicTypeFieldConfig, IPublicTypeAdvanced } from './';

/**
 * Editing experience configuration
 */
export interface IPublicTypeConfigure {

  /**
   * Property panel configuration
   */
  props?: IPublicTypeFieldConfig[];

  /**
   * Component capability configuration
   */
  component?: IPublicTypeComponentConfigure;

  /**
   * Common extension panel support configuration
   */
  supports?: ConfigureSupport;

  /**
   * Advanced feature configuration
   */
  advanced?: IPublicTypeAdvanced;
}
