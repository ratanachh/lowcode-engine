/**
 * Low-code engine code generation module: converts schemas produced by the designer into executable code.
 * Note: to keep the API stable, all exported APIs must use explicit named exports
 *     (i.e. use `export { xxx } from 'xx'`, do not use `export * from 'xxx'`)
 *      and all exported APIs must have unit tests under tests/public
 */
import './polyfills/buffer';
import { createProjectBuilder } from './generator/ProjectBuilder';
import { createModuleBuilder } from './generator/ModuleBuilder';
import { createZipPublisher } from './publisher/zip';
import createIceJsProjectBuilder, { plugins as icejsPlugins } from './solutions/icejs';
import createIceJs3ProjectBuilder, { plugins as icejs3Plugins } from './solutions/icejs3';
import createRaxAppProjectBuilder, { plugins as raxPlugins } from './solutions/rax-app';

// Import related constants
import { REACT_CHUNK_NAME } from './plugins/component/react/const';
import { COMMON_CHUNK_NAME, CLASS_DEFINE_CHUNK_NAME, DEFAULT_LINK_AFTER } from './const/generator';

// Import common plugin groups
import esmodule from './plugins/common/esmodule';
import requireUtils from './plugins/common/requireUtils';
import styleImport from './plugins/common/styleImport';

import css from './plugins/component/style/css';
import constants from './plugins/project/constants';
import i18n from './plugins/project/i18n';
import utils from './plugins/project/utils';
import prettier from './postprocessor/prettier';

// Import common global utilities
import * as globalUtils from './utils';

import * as CONSTANTS from './const';

// Import built-in solution modules
import icejs from './plugins/project/framework/icejs';
import icejs3 from './plugins/project/framework/icejs3';
import rax from './plugins/project/framework/rax';

export default {
  createProjectBuilder,
  createModuleBuilder,
  solutions: {
    icejs: createIceJsProjectBuilder,
    icejs3: createIceJs3ProjectBuilder,
    rax: createRaxAppProjectBuilder,
  },
  solutionParts: {
    icejs,
    icejs3,
    rax,
  },
  publishers: {
    zip: createZipPublisher,
  },
  plugins: {
    common: {

      /**
       * Handle ES Module
       * @deprecated please use esModule
       */
      esmodule,
      esModule: esmodule,
      requireUtils,
      styleImport,
    },
    style: {
      css,
    },
    project: {
      constants,
      i18n,
      utils,
    },
    icejs: {
      ...icejsPlugins,
    },
    icejs3: {
      ...icejs3Plugins,
    },
    rax: {
      ...raxPlugins,
    },

    /**
     * @deprecated please use icejs
     */
    react: {
      ...icejsPlugins,
    },
  },
  postprocessor: {
    prettier,
  },
  utils: globalUtils,
  chunkNames: {
    COMMON_CHUNK_NAME,
    CLASS_DEFINE_CHUNK_NAME,
    REACT_CHUNK_NAME,
  },
  defaultLinkAfter: {
    COMMON_DEFAULT_LINK_AFTER: DEFAULT_LINK_AFTER,
  },
  constants: CONSTANTS,
};

// Some type definitions
export * from './types';

// Some constant definitions
export * from './const';

// Some utility functions
export * from './analyzer/componentAnalyzer';
export * from './parser/SchemaParser';
export * from './generator/ChunkBuilder';
export * from './generator/CodeBuilder';
export * from './generator/ModuleBuilder';
export * from './generator/ProjectBuilder';
