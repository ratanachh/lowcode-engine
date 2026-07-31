/**
 * Export content structure, folders
 *
 * @export
 * @interface ResultDir
 */
export interface ResultDir {

  /**
   * Folder name, Root name defaults to .
   *
   * @type {string}
   * @memberof ResultDir
   */
  name: string;

  /**
   * subdirectory
   *
   * @type {ResultDir[]}
   * @memberof ResultDir
   */
  dirs: ResultDir[];

  /**
   * Files in folder
   *
   * @type {ResultFile[]}
   * @memberof ResultDir
   */
  files: ResultFile[];
}

/**
 * Export content, description of the file
 *
 * @export
 * @interface ResultFile
 */
export interface ResultFile {

  /**
   * file name
   *
   * @type {string}
   * @memberof ResultFile
   */
  name: string;

  /**
   * File type extension, such as .js .less
   *
   * @type {string}
   * @memberof ResultFile
   */
  ext: string;

  /**
   * File content
   *
   * @type {string}
   * @memberof ResultFile
   */
  content: string;
}
