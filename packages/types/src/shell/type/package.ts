import { EitherOr } from '../../utils';
import { IPublicTypeComponentSchema, IPublicTypeProjectSchema } from './';

/**
 * Define component package and external resource info
 * Should be loaded by the editor by default
 */
export type IPublicTypePackage = EitherOr<{

  /**
   * npm package name
   */
  package: string;

  /**
   * Package unique id
   */
  id: string;

  /**
   * Package version
   */
  version: string;

  /**
   * CDN URL list for the runtime view bundle (js and css)
   */
  urls?: string[] | any;

  /**
   * CDN URL list for the edit-time view bundle (js and css)
   */
  editUrls?: string[] | any;

  /**
   * Global variable name when referenced globally; same meaning as webpack output.library
   */
  library: string;

  /**
   * @experimental
   *
   * TODO: proposal needed @ducheng
   */
  async?: boolean;

  /**
   * How the current package is exported from another package
   */
  exportMode?: 'functionCall';

  /**
   * Which window property the current package is exported from
   */
  exportSourceLibrary?: any;

  /**
   * Component description export name; access via window[exportName]
   */
  exportName?: string;

  /**
   * Low-code component schema content
   */
  schema?: IPublicTypeProjectSchema<IPublicTypeComponentSchema>;
}, 'package', 'id'>;
