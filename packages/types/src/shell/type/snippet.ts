import { IPublicTypeNodeSchema } from './';

/**
 * Available snippets
 *
 * Low-code schemas for different component states (may be multiple); when dragged from the panel into the designer, these snippet schemas are inserted into the page schema
 */
export interface IPublicTypeSnippet {

  /**
   * Component category title
   */
  title?: string;

  /**
   * Snippet screenshot
   */
  screenshot?: string;

  /**
   * Snippet badge/label
   *
   * @deprecated not used yet
   */
  label?: string;

  /**
   * Schema to insert
   */
  schema?: IPublicTypeNodeSchema;
}
