import { EitherOr } from '../../utils';

/**
 * Resource reference info; upgraded version of Npm,
 */
export type IPublicTypeReference = EitherOr<{

  /**
   * Referenced resource id
   */
  id: string;

  /**
   * Referenced resource package name
   */
  package: string;

  /**
   * Property name on the referenced resource's export object
   */
  exportName: string;

  /**
   * Sub-object on exportName
   */
  subName: string;

  /**
   * Main entry of the referenced resource
   */
  main?: string;

  /**
   * Whether to get the property value from the referenced resource's export object
   */
  destructuring?: boolean;

  /**
   * Resource version
   */
  version: string;
}, 'package', 'id'>;
