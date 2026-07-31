/**
 * Flat file info (hierarchy is implied by pathName)
 */
export interface FlattenFile {

  /**
   * File path
   */
  pathName: string;

  /**
   * File content
   */
  content: string | Buffer;
}
