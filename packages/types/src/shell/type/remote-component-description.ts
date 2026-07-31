import { Asset } from '../../assets';
import { IPublicTypeComponentMetadata, IPublicTypeReference } from './';

/**
 * Remote material description
 */
export interface IPublicTypeRemoteComponentDescription extends IPublicTypeComponentMetadata {

  /**
   * Component description export name; access via window[exportName]
   */
  exportName?: string;

  /**
   * Resource URL of the component description;
   */
  url?: Asset;

  /**
   * npm info of the component (library);
   */
  package?: {
    npm?: string;
  };

  /**
   * Upgraded replacement for the npm field
   */
  reference?: IPublicTypeReference;
}
