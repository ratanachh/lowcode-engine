import { IPublicTypePropType } from './';

/**
 * Component prop information
 */
export interface IPublicTypePropConfig {

  /**
   * Prop name
   */
  name: string;

  /**
   * Prop type
   */
  propType: IPublicTypePropType;

  /**
   * Prop description
   */
  description?: string;

  /**
   * Prop default value
   */
  defaultValue?: any;

  /**
   * @deprecated
   */
  setter?: any;
}
