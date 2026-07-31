import { InterpretDataSource as DataSource } from '@rchh/lowcode-datasource-types';
import { IPublicTypeJSONObject, IPublicTypeRootSchema, IPublicTypeI18nMap, IPublicTypeAppConfig, IPublicTypeComponentsMap, IPublicTypeJSExpression, IPublicTypeJSFunction, IPublicTypeNpmInfo } from './';

export interface IPublicTypeInternalUtils {
  name: string;
  type: 'function';
  content: IPublicTypeJSFunction | IPublicTypeJSExpression;
}

export interface IPublicTypeExternalUtils {
  name: string;
  type: 'npm' | 'tnpm';
  content: IPublicTypeNpmInfo;
}

export type IPublicTypeUtilItem = IPublicTypeInternalUtils | IPublicTypeExternalUtils;
export type IPublicTypeUtilsMap = IPublicTypeUtilItem[];

/**
 * Application description
 */

export interface IPublicTypeProjectSchema<T = IPublicTypeRootSchema> {
  id?: string;

  /**
   * Current application protocol version
   */
  version: string;

  /**
   * Component map for the current application
   */
  componentsMap: IPublicTypeComponentsMap;

  /**
   * Component trees for all pages and low-code components in the app
   * Low-code business component tree description
   * Fixed-length array of 1; contains only the root container description (low-code business component container)
   */
  componentsTree: T[];

  /**
   * i18n locale messages
   */
  i18n?: IPublicTypeI18nMap;

  /**
   * App-scoped global custom functions or third-party utility extensions
   */
  utils?: IPublicTypeUtilsMap;

  /**
   * App-scoped global constants
   */
  constants?: IPublicTypeJSONObject;

  /**
   * App-scoped global styles
   */
  css?: string;

  /**
   * Shared data sources of the current application
   */
  dataSource?: DataSource;

  /**
   * Current application configuration
   *
   * TODO: remove `Record<string, unknown>` type signature in a later version
   */
  config?: IPublicTypeAppConfig & Record<string, unknown>;

  /**
   * Current application metadata
   */
  meta?: Record<string, any>;
}
