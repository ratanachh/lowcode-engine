export interface RaxFrameworkOptions {

  /**
   * Default page title
   */
  title?: string;

  /**
   * Target environment (default: web only)
   */
  targets?: Array<'web' | 'miniapp' | string>;

  /**
   * Mini-program engine choice; default is runtime. Set to compile for compile-time engine
   */
  miniAppBuildType?: MiniAppBuildType;

  /**
   * Build configuration
   */
  buildConfig?: {
    [key: string]: unknown;
    inlineStyle?: boolean | { forceEnableCSS: boolean };
    alias?: { [key: string]: string };
    publicPath?: string;
    devPublicPath?: string;
    sourceMap?: boolean | string;
    externals?: { [key: string]: string };
    hash?: boolean | string;
    polyfill?: string | false;
    minify?: boolean;
    outputDir?: string;
    proxy?: { [key: string]: string };
    devServer?: { [key: string]: unknown };
    browserslist?: string | { [key: string]: string };
    compileDependencies?: string[];
    miniapp?: { [key: string]: unknown };
  };

  /**
   * Data source configuration
   */
  datasourceConfig?: {

    /** Data source engine version */
    engineVersion?: string;

    /** Data source engine package name */
    enginePackage?: string;

    /** Data source handlers version */
    handlersVersion?: {
      [key: string]: string;
    };

    /** Data source handlers package name */
    handlersPackages?: {
      [key: string]: string;
    };
  };

  /** Package name */
  packageName?: string;

  /** Version */
  packageVersion?: string;

  /** Global style file type */
  globalStylesFileType?: 'css' | 'scss' | 'less';

  /** App configuration */
  appConfig?: {

    /** Route configuration */
    router?: {
      type?: 'browser' | 'hash' | string;
      basename?: string;
    };
  };

  // TODO: [p1]Support MPA mode?
}

export type MiniAppBuildType = 'compile' | 'runtime';
