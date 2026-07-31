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
        // Exception: rax framework export names and component names.
        import { createElement, Component } from 'rax';
        import { getSearchParams as __$$getSearchParams } from 'rax-app';
      `,
      linkAfter: [],
    });

    return next;
  };
  return plugin;
};

export default pluginFactory;
