import { CLASS_DEFINE_CHUNK_NAME } from '../../../const/generator';
import {
  BuilderComponentPlugin,
  BuilderComponentPluginFactory,
  ChunkType,
  FileType,
  ICodeStruct,
} from '../../../types';
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

    const { inStrictMode } = next.contextData;
    if (!inStrictMode) {
      // In non-strict mode, context is itself
      next.chunks.push({
        type: ChunkType.STRING,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `
          _context = this;
        `,
        linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start],
      });
    } else {
      // In strict mode, context only keeps what the protocol specifies
      next.chunks.push({
        type: ChunkType.STRING,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsVar,
        content: `
          _context = this._createContext();
        `,
        linkAfter: [CLASS_DEFINE_CHUNK_NAME.Start],
      });

      next.chunks.push({
        type: ChunkType.STRING,
        fileType: cfg.fileType,
        name: CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod,
        content: `
          _createContext() {
            const self = this;
            const context = {
              get state() { return self.state; },
              setState(newState, callback) { self.setState(newState, callback); },
              get dataSourceMap() { return self._dataSourceEngine.dataSourceMap || {}; },
              async reloadDataSource() { await self._dataSourceEngine.reloadDataSource(); },
              get utils() { return self.utils; },
              get page() { return context; },
              get component() { return context; },
              get props() { return self.props; },
              get constants() { return self.constants; },
              get $() { return self.$ },
              get $$() { return self.$$ },
              ...this._methods,
            };
  
            return context;
          }
        `,
        linkAfter: DEFAULT_LINK_AFTER[CLASS_DEFINE_CHUNK_NAME.InsPrivateMethod],
      });
    }

    return next;
  };
  return plugin;
};

export default pluginFactory;
