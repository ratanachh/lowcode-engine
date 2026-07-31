/* eslint-disable @typescript-eslint/indent */
import { CLASS_DEFINE_CHUNK_NAME, COMMON_CHUNK_NAME } from '../../../const/generator';

import {
  BuilderComponentPlugin,
  BuilderComponentPluginFactory,
  ChunkType,
  FileType,
  ICodeStruct,
  IContainerInfo,
} from '../../../types';
import { RAX_CHUNK_NAME } from './const';
import { DEFAULT_LINK_AFTER } from '../../../const';

export interface PluginConfig {
  fileType: string;
}

const pluginFactory: BuilderComponentPluginFactory<PluginConfig> = (config?) => {
  const cfg: PluginConfig = {
    fileType: FileType.JSX,
    ...config,
  };

  const plugin: BuilderComponentPlugin = async (pre: ICodeStruct) => {
    const next: ICodeStruct = {
      ...pre,
    };

    const ir = next.ir as IContainerInfo;
    const useRef = !!ir.analyzeResult?.isUsingRef;

    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: "import __$$constants from '../../constants';",
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport],
    });

    // TODO: i18n is optional; what if there is no i18n file? How to detect?
    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: "import * as __$$i18n from '../../i18n';",
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport],
    });

    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.ConstructorContent,
      content: `
        __$$i18n._inject2(this);
      `,
      linkAfter: [...DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.ConstructorContent]],
    });

    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsVar,
      content: `
        _context = this._createContext();
      `,
      linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start],
    });

    // TODO: With the current design, pluggability is too weak; some changes are needed.
    //   Step 1: add a front-end analyzer
    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
      content: `
        _createContext() {
          const self = this;
          const context = {
            get state() {
              return self.state;
            },
            setState(newState, callback) {
              self.setState(newState, callback);
            },
            get dataSourceMap() {
              return self._dataSourceEngine.dataSourceMap || {};
            },
            async reloadDataSource() {
              await self._dataSourceEngine.reloadDataSource();
            },
            get utils() {
              return self._utils;
            },
            get page() {
              return context;
            },
            get component() {
              return context;
            },
            get props() {
              return self.props;
            },
            get constants() {
              return __$$constants;
            },
            i18n: __$$i18n.i18n,
            i18nFormat: __$$i18n.i18nFormat,
            getLocale: __$$i18n.getLocale,
            setLocale(locale) {
              __$$i18n.setLocale(locale);
              self.forceUpdate();
            },${
              useRef
                ? `
                  $(refName) {
                    return self._refsManager.get(refName);
                  },
                  $$(refName) {
                    return self._refsManager.getAll(refName);
                  },
                  get _refsManager() {
                    if (!self._refsManager) {
                      self._refsManager = new RefsManager();
                    }
                    return self._refsManager;
                  },
                `
                : ''
            }
            ...this._methods,
          };

          return context;
        }
      `,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderEnd],
    });

    return next;
  };
  return plugin;
};

export default pluginFactory;
