import { Expand } from './Basic';
import { DSLType } from './DSLType';

/**
 * Common materialization options
 * @interface IMaterializeCommonOptions
 */
export interface IMaterializeCommonOptions {

  /**
   * When accesser=online, configure the npm client to use, e.g. tnpm, cnpm, yarn, npm
   */
  npmClient?: string;

  /**
   * Current DSL type; optional values include 'react' | 'rax'
   */
  dslType?: DSLType;
}

/**
 * Local materialization options
 * @interface IMaterializeOnlineOptions
 */
export interface IMaterializeLocalOptions extends IMaterializeCommonOptions {

  /**
   * Access channel
   * (local: local material workbench; online: online npm package)
   * @type {('local' | 'online')}
   * @memberof IMaterializeOptions
   */
  accesser: 'local';

  /**
   * Component file/folder path or package name
   * Examples:
   *  Local path: /usr/project/src/container/DemoMaterial
   *  Package name: @ali/demo-material@0.0.1
   */
  entry: string;

  /**
   * Component root directory; when entry is a file path, use root to specify the root; when entry is a folder, root defaults to entry
   * Examples:
   *  Relative path: ./
   *  Absolute path: /usr/project/src/container/DemoMaterial
   */
  root?: string;
}

/**
 * Online materialization options
 * @interface IMaterializeOnlineOptions
 */
export interface IMaterializeOnlineCommonOptions {

  /**
   * Access channel
   * (local: local material workbench; online: online npm package)
   * @type {('local' | 'online')}
   * @memberof IMaterializeOptions
   */
  accesser: 'online';

  /**
   * Temporary working directory for downloaded npm packages; absolute or relative path
   */
  tempDir?: string;
}

/**
 * Specify package name & version via entry only; no internal path needed
 */
export interface IMaterializeOnlineEntryOptions {

  /**
   * npm package name & version; no internal path needed; parsed automatically from package.json
   * Examples:
   *   Package name & version: @ali/demo-material@0.0.1
   */
  entry: string;
}

export interface IMaterializeOnlinePackageAndVersionOptions {

  /**
   * Relative path inside the npm package
   * Examples:
   *   Relative path: lib/index.js
   */
  entry?: string;

  /**
   * npm package name
   * Examples:
   *   react-color
   */
  name: string;

  /**
   * npm package version
   * Examples:
   *   latest/1.0.0/1.x.0
   * @default latest
   */
  version?: string;
}

export type IMaterializeOnlineOptions = Expand<
  IMaterializeCommonOptions &
    IMaterializeOnlineCommonOptions &
    (IMaterializeOnlineEntryOptions | IMaterializeOnlinePackageAndVersionOptions)
>;

/**
 * Materialization options
 * @interface IMaterializeOptions
 */
export type IMaterializeOptions = Expand<IMaterializeLocalOptions | IMaterializeOnlineOptions>;

export type IInternalMaterializeOptions = Expand<
  IMaterializeOptions & {
    root: string;
  }
>;
