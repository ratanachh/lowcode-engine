import { PackageJSON } from '@rchh/lowcode-types';

import { COMMON_CHUNK_NAME } from '../../../../../const/generator';

import {
  BuilderComponentPlugin,
  BuilderComponentPluginFactory,
  ChunkType,
  FileType,
  ICodeStruct,
  IProjectInfo,
} from '../../../../../types';
import { buildDataSourceDependencies } from '../../../../../utils/dataSource';

interface IIceJsPackageJSON extends PackageJSON {
  ideMode: {
    name: string;
  };
  iceworks: {
    type: string;
    adapter: string;
  };
  originTemplate: string;
}

export interface IceJsPackageJsonPluginConfig {

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
}

const pluginFactory: BuilderComponentPluginFactory<IceJsPackageJsonPluginConfig> = (cfg) => {
  const plugin: BuilderComponentPlugin = async (pre: ICodeStruct) => {
    const next: ICodeStruct = {
      ...pre,
    };

    const ir = next.ir as IProjectInfo;

    const packageJson: IIceJsPackageJSON = {
      name: cfg?.packageName || 'icejs-demo-app',
      version: cfg?.packageVersion || '0.1.5',
      description: '轻量级模板，使用 JavaScript，仅包含基础的 Layout。',
      dependencies: {
        moment: '^2.24.0',
        react: '^16.4.1',
        'react-dom': '^16.4.1',
        'react-router': '^5.2.1',
        '@alifd/theme-design-pro': '^0.x',
        'intl-messageformat': '^9.3.6',
        '@ice/store': '^1.4.3',
        '@loadable/component': '^5.15.2',

        // Data source related dependencies:
        ...buildDataSourceDependencies(ir, cfg?.datasourceConfig),
      },
      devDependencies: {
        '@ice/spec': '^1.0.0',
        'build-plugin-fusion': '^0.1.0',
        'build-plugin-moment-locales': '^0.1.0',
        eslint: '^6.0.1',
        'ice.js': '^1.0.0',
        stylelint: '^13.2.0',
      },
      scripts: {
        start: 'icejs start',
        build: 'icejs build',
        lint: 'npm run eslint && npm run stylelint',
        eslint: 'eslint --cache --ext .js,.jsx ./',
        stylelint: 'stylelint ./**/*.scss',
      },
      ideMode: {
        name: 'ice-react',
      },
      iceworks: {
        type: 'react',
        adapter: 'adapter-react-v3',
      },
      engines: {
        node: '>=8.0.0',
      },
      repository: {
        type: 'git',
        url: 'http://gitlab.xxx.com/msd/leak-scan/tree/master',
      },
      private: true,
      originTemplate: '@alifd/scaffold-lite-js',
    };

    ir.packages.forEach((packageInfo) => {
      packageJson.dependencies[packageInfo.package] = packageInfo.version;
    });

    next.chunks.push({
      type: ChunkType.JSON,
      fileType: FileType.JSON,
      name: COMMON_CHUNK_NAME.FileMainContent,
      content: packageJson,
      linkAfter: [],
    });

    return next;
  };
  return plugin;
};

export default pluginFactory;
