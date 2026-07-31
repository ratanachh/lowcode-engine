import { COMMON_CHUNK_NAME } from '../../../const/generator';

import {
  BuilderComponentPlugin,
  BuilderComponentPluginFactory,
  ChunkType,
  FileType,
  ICodeStruct,
} from '../../../types';

const pluginFactory: BuilderComponentPluginFactory<unknown> = () => {
  const plugin: BuilderComponentPlugin = async (pre: ICodeStruct) => {
    const next: ICodeStruct = {
      ...pre,
    };

    next.chunks.push({
      type: ChunkType.STRING,
      fileType: FileType.JSX,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: `
// Note: temporary variables injected by the code generator start with "__$$"; do not access them directly in designer code.
// Exception: react framework export names and component names.
import React from \'react\';`,
      linkAfter: [],
    });

    return next;
  };
  return plugin;
};

export default pluginFactory;
