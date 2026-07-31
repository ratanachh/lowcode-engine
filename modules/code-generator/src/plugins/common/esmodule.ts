import { flatMap, camelCase, get } from 'lodash';
import { COMMON_CHUNK_NAME } from '../../const/generator';

import {
  BuilderComponentPlugin,
  BuilderComponentPluginFactory,
  ChunkType,
  CodeGeneratorError,
  DependencyType,
  FileType,
  ICodeChunk,
  ICodeStruct,
  IDependency,
  IExternalDependency,
  IInternalDependency,
  IWithDependency,
} from '../../types';

import { isValidIdentifier } from '../../utils/validate';

// TODO: How should main be used — do external packages not need it?
const DEP_MAIN_BLOCKLIST = ['lib', 'lib/index', 'es', 'es/index', 'main'];
const DEFAULT_EXPORT_NAME = '__default__';

function groupDepsByPack(deps: IDependency[]): Record<string, IDependency[]> {
  const depMap: Record<string, IDependency[]> = {};

  const addDep = (pkg: string, dep: IDependency) => {
    if (!depMap[pkg]) {
      depMap[pkg] = [];
    }
    depMap[pkg].push(dep);
  };

  deps.forEach((dep) => {
    if (dep.dependencyType === DependencyType.Internal) {
      addDep(`${(dep as IInternalDependency).moduleName}${dep.main ? `/${dep.main}` : ''}`, dep);
    } else {
      let depMain = '';
      // TODO: For some types, main is temporarily considered unused
      if (dep.main && DEP_MAIN_BLOCKLIST.indexOf(dep.main) < 0) {
        depMain = dep.main;
      }
      if (depMain.substring(0, 1) === '/') {
        depMain = depMain.substring(1);
      }
      addDep(`${(dep as IExternalDependency).package}${depMain ? `/${depMain}` : ''}`, dep);
    }
  });

  return depMap;
}

interface IDependencyItem {
  exportName: string;
  aliasName?: string;
  isDefault?: boolean;
  subName?: string;
  nodeIdentifier?: string; // Mapping to usage sites; theoretically immutable — provide extra info if it must change
  source: IDependency;
}

interface IExportItem {
  exportName: string;
  aliasNames: string[];
  isDefault?: boolean;
  needOriginExport: boolean;
}

function getDependencyIdentifier(info: IDependencyItem): string {
  return info.aliasName || info.exportName;
}

function getExportNameOfDep(dep: IDependency): string {
  if (dep.destructuring) {
    return (
      dep.exportName ||
      dep.componentName ||
      throwNewError('destructuring dependency must have exportName or componentName')
    );
  }

  if (!dep.subName) {
    return (
      dep.componentName ||
      dep.exportName ||
      throwNewError('dependency item must have componentName or exportName')
    );
  }

  return (
    dep.exportName ||
    `__$${camelCase(
      get(dep, 'moduleName') ||
        get(dep, 'package') ||
        throwNewError('dep.moduleName or dep.package is undefined'),
    )}_default`
  );
}

function throwNewError(msg: string): never {
  throw new Error(msg);
}

function buildPackageImport(
  pkg: string,
  deps: IDependency[],
  targetFileType: string,
  useAliasName: boolean,
): ICodeChunk[] {
  // If there is no package at all, do not generate an import (it would be meaningless)
  if (!pkg || pkg === 'undefined' || pkg === 'null') {
    // TODO: Should we add a warning?
    return [];
  }

  const chunks: ICodeChunk[] = [];

  const exportItems: Record<string, IExportItem> = {};
  const defaultExportNames: string[] = [];

  const depsInfo: IDependencyItem[] = deps.map((dep) => {
    const info: IDependencyItem = {
      exportName: getExportNameOfDep(dep),
      isDefault: !dep.destructuring,
      subName: dep.subName || undefined,
      nodeIdentifier: dep.componentName || undefined,
      source: dep,
    };

    // The next 5 steps clean redundant info and normalize the data structure
    if (info.isDefault) {
      if (defaultExportNames.indexOf(info.exportName) < 0) {
        defaultExportNames.push(info.exportName);
      }
    }

    if (!info.subName) {
      if (info.nodeIdentifier === info.exportName) {
        info.nodeIdentifier = undefined;
      }

      if (info.isDefault) {
        info.aliasName = info.nodeIdentifier || info.exportName;
        info.exportName = DEFAULT_EXPORT_NAME;
      }

      if (info.nodeIdentifier) {
        info.aliasName = info.nodeIdentifier;
        info.nodeIdentifier = undefined;
      }
    } else {
      if (info.isDefault) {
        info.aliasName = info.exportName;
        info.exportName = DEFAULT_EXPORT_NAME;
      }

      if (info.nodeIdentifier === `${info.exportName}.${info.subName}`) {
        info.nodeIdentifier = undefined;
      }
    }

    return info;
  });

  // Build the export item list
  depsInfo.forEach((info) => {
    if (!exportItems[info.exportName]) {
      exportItems[info.exportName] = {
        exportName: info.exportName,
        isDefault: info.isDefault,
        aliasNames: [],
        needOriginExport: false,
      };
    }

    if (!info.nodeIdentifier && !info.aliasName) {
      exportItems[info.exportName].needOriginExport = true;
    }
  });

  // Build the alias dictionary
  depsInfo.forEach((info) => {
    if (info.aliasName) {
      const { aliasNames } = exportItems[info.exportName];
      if (aliasNames.indexOf(info.aliasName) < 0) {
        aliasNames.push(info.aliasName);
      }
    }
  });

  // fix: Parent ImportAliasDefine conflicts with parent imported by a child component
  depsInfo.forEach((info) => {
    if (info.nodeIdentifier) {
      const exportItem = exportItems[info.exportName];
      if (!exportItem.needOriginExport && exportItem.aliasNames.length > 0) {
        // eslint-disable-next-line no-param-reassign
        info.aliasName = exportItem.aliasNames[0];
      }
    }
  });

  // Detect conflicts between nodeIdentifier and exportName or aliasName
  const nodeIdentifiers = depsInfo.map((info) => info.nodeIdentifier).filter(Boolean);
  const conflictInfos = flatMap(Object.keys(exportItems), (exportName) => {
    const exportItem = exportItems[exportName];
    const usedNames = [
      ...exportItem.aliasNames,
      ...(exportItem.needOriginExport || exportItem.aliasNames.length <= 0 ? [exportName] : []),
    ];
    const conflictNames = usedNames.filter((n) => nodeIdentifiers.indexOf(n) >= 0);
    if (conflictNames.length > 0) {
      return [
        ...(conflictNames.indexOf(exportName) >= 0 ? [[exportName, true, exportItem]] : []),
        ...conflictNames.filter((n) => n !== exportName).map((n) => [n, false, exportItem]),
      ];
    }
    return [];
  });

  const conflictExports = conflictInfos.filter((c) => c[1]).map((c) => c[0] as string);
  const conflictAlias = conflictInfos.filter((c) => !c[1]).map((c) => c[0] as string);

  const solutions: Record<string, string> = {};

  depsInfo.forEach((info) => {
    if (info.aliasName && conflictAlias.indexOf(info.aliasName) >= 0) {
      // find solution
      let solution = solutions[info.aliasName];
      if (!solution) {
        solution = `${info.aliasName}Alias`;
        const conflictItem = (conflictInfos.find((c) => c[0] === info.aliasName) ||
          [])[2] as IExportItem;
        conflictItem.aliasNames = conflictItem.aliasNames.filter((a) => a !== info.aliasName);
        conflictItem.aliasNames.push(solution);
        solutions[info.aliasName] = solution;
      }
      // eslint-disable-next-line no-param-reassign
      info.aliasName = solution;
    }

    if (conflictExports.indexOf(info.exportName) >= 0) {
      // find solution
      let solution = solutions[info.exportName];
      if (!solution) {
        solution = `${info.exportName}Export`;
        const conflictItem = (conflictInfos.find((c) => c[0] === info.exportName) ||
          [])[2] as IExportItem;
        conflictItem.aliasNames.push(solution);
        conflictItem.needOriginExport = false;
        solutions[info.exportName] = solution;
      }
      // eslint-disable-next-line no-param-reassign
      info.aliasName = solution;
    }
  });

  // Check whether all dependencies have a valid Identifier
  depsInfo.forEach((info) => {
    const name = info.aliasName || info.exportName;
    if (!isValidIdentifier(name)) {
      throw new CodeGeneratorError(`Invalid Identifier [${name}]`);
    }
    if (info.nodeIdentifier && !isValidIdentifier(info.nodeIdentifier)) {
      throw new CodeGeneratorError(`Invalid Identifier [${info.nodeIdentifier}]`);
    }
  });

  const aliasDefineStatements: Record<string, string> = {};
  if (useAliasName) {
    Object.keys(exportItems).forEach((exportName) => {
      const aliasList = exportItems[exportName]?.aliasNames || [];
      if (aliasList.length > 0) {
        const srcName = exportItems[exportName].needOriginExport ? exportName : aliasList[0];
        const aliasNameList = exportItems[exportName].needOriginExport
          ? aliasList
          : aliasList.slice(1);
        aliasNameList.forEach((a) => {
          if (!aliasDefineStatements[a]) {
            aliasDefineStatements[a] = `const ${a} = ${srcName};`;
          }
        });
      }
    });
  }

  function getDefaultExportName(info: IDependencyItem): string {
    if (info.isDefault) {
      return defaultExportNames[0];
    }
    return info.exportName;
  }

  depsInfo.forEach((info) => {
    // If it is a sub-component, export the parent and decide whether an identifier is needed per naming rules
    if (info.nodeIdentifier) {
      // Prerequisite: if nodeIdentifier exists, subName must exist; otherwise it was optimized away earlier
      const ownerName = getDependencyIdentifier(info);

      chunks.push({
        type: ChunkType.STRING,
        fileType: targetFileType,
        name: COMMON_CHUNK_NAME.ImportAliasDefine,
        content: useAliasName ? `const ${info.nodeIdentifier} = ${ownerName}.${info.subName};` : '',
        linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport, COMMON_CHUNK_NAME.InternalDepsImport],
        ext: {
          originalName: `${getDefaultExportName(info)}.${info.subName}`,
          aliasName: info.nodeIdentifier,
          dependency: info.source,
        },
      });
    } else if (info.aliasName) {
      // default imports generate a separate import statement; no assignment needed
      if (info.isDefault && defaultExportNames.find((n) => n === info.aliasName)) {
        delete aliasDefineStatements[info.aliasName];
        return;
      }

      let contentStatement = '';
      if (aliasDefineStatements[info.aliasName]) {
        contentStatement = aliasDefineStatements[info.aliasName];
        delete aliasDefineStatements[info.aliasName];
      }

      chunks.push({
        type: ChunkType.STRING,
        fileType: targetFileType,
        name: COMMON_CHUNK_NAME.ImportAliasDefine,
        content: contentStatement,
        linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport, COMMON_CHUNK_NAME.InternalDepsImport],
        ext: {
          originalName: getDefaultExportName(info),
          aliasName: info.aliasName,
          dependency: info.source,
        },
      });
    }
  });

  // Some definitions that need a second transform may remain
  Object.keys(aliasDefineStatements).forEach((a) => {
    chunks.push({
      type: ChunkType.STRING,
      fileType: targetFileType,
      name: COMMON_CHUNK_NAME.ImportAliasDefine,
      content: aliasDefineStatements[a],
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport, COMMON_CHUNK_NAME.InternalDepsImport],
    });
  });

  const exportItemList = Object.keys(exportItems).map((k) => exportItems[k]);
  const defaultExport = exportItemList.filter((item) => item.isDefault);
  const otherExports = exportItemList.filter((item) => !item.isDefault);

  const statementL = ['import'];
  if (defaultExport.length > 0) {
    if (useAliasName) {
      statementL.push(defaultExportNames[0]);
    } else {
      statementL.push(defaultExport[0].aliasNames[0]);
    }
    if (otherExports.length > 0) {
      statementL.push(', ');
    }
  }
  if (otherExports.length > 0) {
    const items = otherExports.map((item) => {
      return !useAliasName || item.needOriginExport || item.aliasNames.length <= 0
        ? item.exportName
        : `${item.exportName} as ${item.aliasNames[0]}`;
    });
    statementL.push(`{ ${items.join(', ')} }`);
  }
  statementL.push('from');

  const getInternalDependencyModuleId = () => `@/${(deps[0] as IInternalDependency).type}/${pkg}`;

  if (deps[0].dependencyType === DependencyType.Internal) {
    // TODO: Internal Deps path use project slot setting
    statementL.push(`'${getInternalDependencyModuleId()}';`);
    chunks.push({
      type: ChunkType.STRING,
      fileType: targetFileType,
      name: COMMON_CHUNK_NAME.InternalDepsImport,
      content: statementL.join(' '),
      linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport],
    });
  } else {
    statementL.push(`'${pkg}';`);
    chunks.push({
      type: ChunkType.STRING,
      fileType: targetFileType,
      name: COMMON_CHUNK_NAME.ExternalDepsImport,
      content: statementL.join(' '),
      linkAfter: [],
    });
  }

  // Handle some extra default imports
  if (defaultExportNames.length > 1) {
    if (deps[0].dependencyType === DependencyType.Internal) {
      defaultExportNames.slice(1).forEach((exportName) => {
        chunks.push({
          type: ChunkType.STRING,
          fileType: targetFileType,
          name: COMMON_CHUNK_NAME.InternalDepsImport,
          content: `import ${exportName} from '${getInternalDependencyModuleId()}';`,
          linkAfter: [COMMON_CHUNK_NAME.ExternalDepsImport],
        });
      });
    } else {
      defaultExportNames.slice(1).forEach((exportName) => {
        chunks.push({
          type: ChunkType.STRING,
          fileType: targetFileType,
          name: COMMON_CHUNK_NAME.ExternalDepsImport,
          content: `import ${exportName} from '${pkg}';`,
          linkAfter: [],
        });

        chunks.push({
          type: ChunkType.STRING,
          fileType: targetFileType,
          name: COMMON_CHUNK_NAME.ImportAliasDefine,
          content: '',
          linkAfter: [],
          ext: {
            aliasName: exportName,
            originalName: exportName,
            dependency: {
              package: pkg,
              componentName: exportName,
            },
          },
        });
      });
    }
  }

  return chunks;
}

export interface PluginConfig {
  fileType?: string; // Exported file type
  useAliasName?: boolean; // Whether to rename the component identifier with componentName
  filter?: (deps: IDependency[]) => IDependency[]; // Supports filtering
}

const pluginFactory: BuilderComponentPluginFactory<PluginConfig> = (config?: PluginConfig) => {
  const cfg = {
    fileType: FileType.JS,
    useAliasName: true,
    ...(config || {}),
  };

  const plugin: BuilderComponentPlugin = async (pre: ICodeStruct) => {
    const next: ICodeStruct = {
      ...pre,
    };

    const ir = next.ir as IWithDependency;

    if (ir && ir.deps && ir.deps.length > 0) {
      const deps = cfg.filter ? cfg.filter(ir.deps) : ir.deps;
      const packs = groupDepsByPack(deps);

      Object.keys(packs).forEach((pkg) => {
        const chunks = buildPackageImport(pkg, packs[pkg], cfg.fileType, cfg.useAliasName);
        next.chunks.push(...chunks);
      });
    }

    return next;
  };

  return plugin;
};

export default pluginFactory;
