import { IPublicTypeComponentMetadata, IPublicTypeReference } from './';

/**
 * Local material description
 */

export interface IPublicTypeComponentDescription extends IPublicTypeComponentMetadata {

  /**
   * @todo documentation pending @jinchan
   */
  keywords: string[];

  /**
   * Upgraded replacement for the npm field
   */
  reference?: IPublicTypeReference;
}
