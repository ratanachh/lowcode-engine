/**
 * Output of the scan stage
 */
export interface IMaterialScanModel {

  /** Current package name */
  pkgName: string;

  /** Current package version */
  pkgVersion: string;

  /** In TS scenarios, use entry */
  useEntry?: boolean;

  /** Relative path of the main file */
  mainFilePath: string;

  /** Relative path of the module file */
  moduleFilePath?: string;

  /** Relative path of the typings file */
  typingsFilePath?: string;

  /** Absolute path of the main file */
  mainFileAbsolutePath: string;

  /** Absolute path of the module file */
  moduleFileAbsolutePath?: string;

  /** Absolute path of the typings file */
  typingsFileAbsolutePath?: string;
}
