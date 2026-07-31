import { IPublicTypeComponentSort, IPublicTypePackage, IPublicTypeRemoteComponentDescription, IPublicTypeComponentDescription } from './';

/**
 * Assets package protocol
 */

export interface IPublicTypeAssetsJson {

  /**
   * Assets package protocol version
   */
  version: string;

  /**
   * Package list; external and package concepts are similar and merged
   */
  packages?: IPublicTypePackage[];

  /**
   * List of all component description protocols / all components
   */
  components: Array<IPublicTypeComponentDescription | IPublicTypeRemoteComponentDescription>;

  /**
   * Component category list used to describe the materials panel
   * @deprecated No longer needed by the latest materials panel
   */
  componentList?: any[];

  /**
   * Business component category list used to describe the materials panel
   * @deprecated No longer needed by the latest materials panel
   */
  bizComponentList?: any[];

  /**
   * Describe tabs and categories in the component panel
   */
  sort?: IPublicTypeComponentSort;
}
