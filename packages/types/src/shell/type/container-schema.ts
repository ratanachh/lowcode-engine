import { InterpretDataSource as DataSource } from '@rchh/lowcode-datasource-types';
import {
  IPublicTypeJSExpression,
  IPublicTypeJSFunction,
  IPublicTypeCompositeObject,
  IPublicTypeCompositeValue,
  IPublicTypeNodeSchema,
} from './';

/**
 * Container structure description
 */
export interface IPublicTypeContainerSchema extends IPublicTypeNodeSchema {

  /**
   * 'Block' | 'Page' | 'Component';
   */
  componentName: string;

  /**
   * File name
   */
  fileName: string;

  /**
   * @todo documentation TBD
   */
  meta?: Record<string, unknown>;

  /**
   * Container initial data
   */
  state?: {
    [key: string]: IPublicTypeCompositeValue;
  };

  /**
   * Custom method settings
   */
  methods?: {
    [key: string]: IPublicTypeJSExpression | IPublicTypeJSFunction;
  };

  /**
   * Lifecycle object
   */
  lifeCycles?: {
    // @todo lifecycle object should preferably be a closed set
    [key: string]: IPublicTypeJSExpression | IPublicTypeJSFunction;
  };

  /**
   * Style file
   */
  css?: string;

  /**
   * Async data source configuration
   */
  dataSource?: DataSource;

  /**
   * Default props for low-code business components
   */
  defaultProps?: IPublicTypeCompositeObject;
}
