/**
 * Full description object for npm source import
 */
export interface IPublicTypeNpmInfo {

  /**
   * Source component name
   */
  componentName?: string;

  /**
   * Source component package name
   */
  package: string;

  /**
   * Source component version
   */
  version?: string;

  /**
   * Whether destructured
   */
  destructuring?: boolean;

  /**
   * Source component name
   */
  exportName?: string;

  /**
   * Sub-component name
   */
  subName?: string;

  /**
   * Component path
   */
  main?: string;
}
