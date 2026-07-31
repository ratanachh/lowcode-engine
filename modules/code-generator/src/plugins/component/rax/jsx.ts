import {
  IPublicTypeNodeSchema,
  IPublicTypeJSExpression,
  IPublicTypeNpmInfo,
  IPublicTypeCompositeValue,
  isJSExpression,
} from '@rchh/lowcode-types';

import _ from 'lodash';
import changeCase from 'change-case';
import {
  BuilderComponentPlugin,
  BuilderComponentPluginFactory,
  ChunkType,
  CodePiece,
  FileType,
  ICodeChunk,
  ICodeStruct,
  IContainerInfo,
  PIECE_TYPE,
  HandlerSet,
  IScope,
  NodeGeneratorConfig,
  NodePlugin,
  AttrPlugin,
} from '../../../types';

import { RAX_CHUNK_NAME } from './const';
import { COMMON_CHUNK_NAME } from '../../../const/generator';

import { generateExpression } from '../../../utils/jsExpression';
import {
  createNodeGenerator,
  generateConditionReactCtrl,
  generateReactExprInJS,
} from '../../../utils/nodeToJSX';
import { generateCompositeType } from '../../../utils/compositeType';
import { Scope } from '../../../utils/Scope';
import { parseExpressionGetGlobalVariables } from '../../../utils/expressionParser';
import { transformThis2Context } from '../../../core/jsx/handlers/transformThis2Context';
import { transformJsExpr } from '../../../core/jsx/handlers/transformJsExpression';

export interface PluginConfig {
  fileType: string;

  /** Whether to ignore mini-programs */
  ignoreMiniApp?: boolean;
}

// TODO: What if componentName does not start with an uppercase letter, or is not a valid JS identifier??
// FIXME: This should be done in the parse stage: validate all componentNames as identifiers and replace invalid ones uniformly.
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
    const rootScope = Scope.createRootScope();
    const { tolerateEvalErrors = true, evalErrorsHandler = '' } = next.contextData;

    // When Rax builds for mini-programs, components cannot be aliased and must be referenced directly; replace all aliases here
    // First collect all alias mappings
    const componentsNameAliasMap = new Map<string, string>();
    next.chunks.forEach((chunk) => {
      if (isImportAliasDefineChunk(chunk)) {
        componentsNameAliasMap.set(chunk.ext.aliasName, chunk.ext.originalName);
      }
    });

    // Note: this assumes schema componentName is a valid JS identifier starting with an uppercase letter
    // FIXME: Temporary quick-fix logic; should be replaced with pre-processing.
    const mapComponentNameToAliasOrKeepIt = (componentName: string) => componentsNameAliasMap.get(componentName) || componentName;

    // Then filter out all alias chunks
    next.chunks = next.chunks.filter((chunk) => !isImportAliasDefineChunk(chunk));

    // If we emit JSX the same way as React today, there are 3 problems:
    // 1. When generating for mini-programs, loop variables cannot be accessed
    // 2. Mini-program codegen often hits Uncaught TypeError: Cannot read property 'avatar' of undefined (e.g. line 50 below) — direct emission makes Rax evaluate all view variables immediately when building for mini-programs
    // 3. Too much is reachable via this.xxx, and custom methods may accidentally break Rax or mini-program framework fields on page this
    const customHandlers: HandlerSet<string> = {
      expression(input: IPublicTypeJSExpression, scope: IScope) {
        return transformJsExpr(generateExpression(input, scope), scope, {
          dontWrapEval: !tolerateEvalErrors,
        });
      },
      function(input, scope: IScope) {
        return transformThis2Context(input.value || 'null', scope);
      },
    };

    // Create code generator
    const commonNodeGenerator = createNodeGenerator({
      handlers: customHandlers,
      tagMapping: mapComponentNameToAliasOrKeepIt,
      nodePlugins: [generateReactExprInJS, generateConditionReactCtrl, generateRaxLoopCtrl],
      attrPlugins: [generateNodeAttrForRax.bind({ cfg })],
    });

    // Generate JSX code
    const jsxContent = commonNodeGenerator(ir, rootScope);

    if (!cfg.ignoreMiniApp) {
      next.chunks.push({
        type: ChunkType.STRING,
        fileType: cfg.fileType,
        name: COMMON_CHUNK_NAME.ExternalDepsImport,
        content: "import { isMiniApp as __$$isMiniApp } from 'universal-env';",
        linkAfter: [],
      });
    }

    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: RAX_CHUNK_NAME.ClassRenderPre,
      // TODO: setState, dataSourceMap, reloadDataSource, utils, i18n, i18nFormat, getLocale, setLocale cannot be accessed directly in the view under Rax compile mode; convert to this.xxx
      content: `
        const __$$context = this._context;
        const { state, setState, dataSourceMap, reloadDataSource, utils, constants, i18n, i18nFormat, getLocale, setLocale } = __$$context;
      `,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderBegin],
    });

    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: RAX_CHUNK_NAME.ClassRenderJSX,
      content: `return ${jsxContent};`,
      linkAfter: [RAX_CHUNK_NAME.ClassRenderBegin, RAX_CHUNK_NAME.ClassRenderPre],
    });

    next.chunks.push({
      type: ChunkType.STRING,
      fileType: cfg.fileType,
      name: COMMON_CHUNK_NAME.CustomContent,
      content: [
        tolerateEvalErrors &&
          `
        function __$$eval(expr) {
          try {
            return expr();
          } catch (error) {
            ${evalErrorsHandler}
          }
        }

        function __$$evalArray(expr) {
          const res = __$$eval(expr);
          return Array.isArray(res) ? res : [];
        }
        `,
        `
        function __$$createChildContext(oldContext, ext) {
          return Object.assign({}, oldContext, ext);
        }
      `,
      ]
        .filter(Boolean)
        .join('\n'),
      linkAfter: [COMMON_CHUNK_NAME.FileExport],
    });

    return next;

    function generateRaxLoopCtrl(
      nodeItem: IPublicTypeNodeSchema,
      scope: IScope,
      config?: NodeGeneratorConfig,
      next?: NodePlugin,
    ): CodePiece[] {
      if (nodeItem.loop) {
        const loopItemName = nodeItem.loopArgs?.[0] || 'item';
        const loopIndexName = nodeItem.loopArgs?.[1] || 'index';
        const subScope = scope.createSubScope([loopItemName, loopIndexName]);
        const pieces: CodePiece[] = next ? next(nodeItem, subScope, config) : [];

        const loopDataExpr = tolerateEvalErrors
          ? `__$$evalArray(() => (${transformThis2Context(
              generateCompositeType(nodeItem.loop, scope, { handlers: config?.handlers }),
              scope,
            )}))`
          : `(${transformThis2Context(
              generateCompositeType(nodeItem.loop, scope, { handlers: config?.handlers }),
              scope,
            )})`;

        pieces.unshift({
          value: `${loopDataExpr}.map((${loopItemName}, ${loopIndexName}) => ((__$$context) => (`,
          type: PIECE_TYPE.BEFORE,
        });

        pieces.push({
          value: `))(__$$createChildContext(__$$context, { ${loopItemName}, ${loopIndexName} })))`,
          type: PIECE_TYPE.AFTER,
        });

        return pieces;
      }

      return next ? next(nodeItem, scope, config) : [];
    }
  };

  return plugin;
};

export default pluginFactory;

function isImportAliasDefineChunk(chunk: ICodeChunk): chunk is ICodeChunk & {
  ext: {
    aliasName: string;
    originalName: string;
    dependency: IPublicTypeNpmInfo;
  };
} {
  return (
    chunk.name === COMMON_CHUNK_NAME.ImportAliasDefine &&
    !!chunk.ext &&
    typeof chunk.ext.aliasName === 'string' &&
    typeof chunk.ext.originalName === 'string' &&
    !!(chunk.ext.dependency as IPublicTypeNpmInfo | null)?.componentName
  );
}

function generateNodeAttrForRax(
  this: { cfg: PluginConfig },
  attrData: { attrName: string; attrValue: IPublicTypeCompositeValue },
  scope: IScope,
  config?: NodeGeneratorConfig,
  next?: AttrPlugin,
): CodePiece[] {
  if (!this.cfg.ignoreMiniApp && /^on/.test(attrData.attrName)) {
    // else: onXxx handlers need special handling
    return generateEventHandlerAttrForRax(attrData.attrName, attrData.attrValue, scope, config);
  }

  if (attrData.attrName === 'ref') {
    return [
      {
        name: attrData.attrName,
        value: `__$$context._refsManager.linkRef('${attrData.attrValue}')`,
        type: PIECE_TYPE.ATTR,
      },
    ];
  }

  return next ? next(attrData, scope, config) : [];
}

function generateEventHandlerAttrForRax(
  attrName: string,
  attrValue: IPublicTypeCompositeValue,
  scope: IScope,
  config?: NodeGeneratorConfig,
): CodePiece[] {
  // -- convert JSExpression in event handlers to JSFunction to avoid an extra eval wrap that breaks Rax mini-program transform
  const valueExpr = generateCompositeType(
    isJSExpression(attrValue) ? { type: 'JSFunction', value: attrValue.value } : attrValue,
    scope,
    {
      handlers: config?.handlers,
    },
  );

  // Look up variables in the current scope
  const currentScopeVariables = scope.bindings?.getAllBindings() || [];
  if (currentScopeVariables.length <= 0) {
    return [
      {
        type: PIECE_TYPE.ATTR,
        name: attrName,
        value: valueExpr,
      },
    ];
  }

  // Extract all undefined global variables
  const undeclaredVariablesInValueExpr = parseExpressionGetGlobalVariables(valueExpr);
  const referencedLocalVariables = _.intersection(
    undeclaredVariablesInValueExpr,
    currentScopeVariables,
  );
  if (referencedLocalVariables.length <= 0) {
    return [
      {
        type: PIECE_TYPE.ATTR,
        name: attrName,
        value: valueExpr,
      },
    ];
  }

  const wrappedAttrValueExpr = [
    '(...__$$args) => {',
    '  if (__$$isMiniApp) {',
    '    const __$$event = __$$args[0];',
    ...referencedLocalVariables.map(
      (localVar) => `const ${localVar} = __$$event.target.dataset.${localVar};`,
    ),
    `    return (${valueExpr}).apply(this, __$$args);`,
    '  } else {',
    `    return (${valueExpr}).apply(this, __$$args);`,
    '  }',
    '}',
  ].join('\n');

  return [
    ...referencedLocalVariables.map((localVar) => ({
      type: PIECE_TYPE.ATTR,
      name: `data-${changeCase.snake(localVar)}`,
      value: localVar,
    })),
    {
      type: PIECE_TYPE.ATTR,
      name: attrName,
      value: wrappedAttrValueExpr,
    },
  ];
}
