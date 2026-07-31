import {
  IPublicTypeCompositeArray,
  IPublicTypeCompositeObject, IPublicTypeJSExpression,
  IPublicTypeJSFunction, IPublicTypeJSONArray,
  IPublicTypeJSONObject, IPublicTypeJSSlot, IPublicTypeNodeDataType,
  IPublicTypeProjectSchema, ResultDir,
  ResultFile,
} from '@rchh/lowcode-types';

import type { ProjectBuilderInitOptions } from '../generator/ProjectBuilder';
import { IScopeBindings } from '../utils/ScopeBindings';
import { IParseResult } from './intermediate';

export enum FileType {
  CSS = 'css',
  SCSS = 'scss',
  LESS = 'less',
  HTML = 'html',
  JS = 'js',
  MJS = 'mjs',
  JSX = 'jsx',
  TS = 'ts',
  MTS = 'mts',
  TSX = 'tsx',
  JSON = 'json',
  MD = 'md',
}

export enum ChunkType {
  AST = 'ast',
  STRING = 'string',
  JSON = 'json',
}

export enum PluginType {
  COMPONENT = 'component',
  UTILS = 'utils',
  I18N = 'i18n',
}

export type ChunkContent = string | any;
export type CodeGeneratorFunction<T> = (content: T) => string;

export interface ICodeChunk {
  type: ChunkType;
  fileType: string;
  name: string;
  subModule?: string;
  content: ChunkContent;
  linkAfter: string[];
  ext?: Record<string, unknown>;
}

export interface IBaseCodeStruct {
  chunks: ICodeChunk[];
  depNames: string[];
}

export interface ICodeStruct extends IBaseCodeStruct {
  ir: any;
  contextData: IContextData;
}

/** Context data shared among plugins */
export interface IContextData extends IProjectBuilderOptions {

  /**
   * Other custom data
   * (third-party plugins may also store data here; use a long name prefixed with your plugin name to avoid conflicts)
   */
  [key: string]: any;

  /**
   * Whether the Ref API (this.$/this.$$) is used
   * */
  useRefApi?: boolean;
}

export type BuilderComponentPlugin = (initStruct: ICodeStruct) => Promise<ICodeStruct>;

export type BuilderComponentPluginFactory<T> = (config?: T) => BuilderComponentPlugin;

export interface IChunkBuilder {
  run: (ir: any, initialStructure?: ICodeStruct) => Promise<{ chunks: ICodeChunk[][] }>;
  getPlugins: () => BuilderComponentPlugin[];
  addPlugin: (plugin: BuilderComponentPlugin) => void;
}

export interface ICodeBuilder {
  link: (chunkDefinitions: ICodeChunk[]) => string;
  generateByType: (type: string, content: unknown) => string;
}

export interface ICompiledModule {
  files: ResultFile[];
}

export interface IModuleBuilder {
  generateModule: (input: unknown) => Promise<ICompiledModule>;
  generateModuleCode: (schema: IPublicTypeProjectSchema | string) => Promise<ResultDir>;
  linkCodeChunks: (chunks: Record<string, ICodeChunk[]>, fileName: string) => ResultFile[];
  addPlugin: (plugin: BuilderComponentPlugin) => void;
}

/**
 * Engine public interface
 *
 * @export
 * @interface ICodeGenerator
 */
export interface ICodeGenerator {

  /**
   * Code generation API: convert Schema into a code file system description
   *
   * @param {(IPublicTypeProjectSchema)} schema Input schema
   * @returns {ResultDir}
   * @memberof ICodeGenerator
   */
  toCode: (schema: IPublicTypeProjectSchema) => Promise<ResultDir>;
}

export interface ISchemaParser {
  validate: (schema: IPublicTypeProjectSchema) => boolean;
  parse: (schema: IPublicTypeProjectSchema | string) => IParseResult;
}

export interface IProjectTemplate {
  slots: Record<string, IProjectSlot>;
  generateTemplate: (data: IParseResult) => ResultDir | Promise<ResultDir>;
}

export interface IProjectSlot {
  path: string[];
  fileName?: string;
}

export interface IProjectPlugins {
  [slotName: string]: BuilderComponentPlugin[];
}

export interface IProjectBuilderOptions {

  /** Whether in strict mode (default: no) */
  inStrictMode?: boolean;

  /**
   * Whether to tolerate exceptions when evaluating JSExpression
   * Default: true
   * Note: if exceptions are tolerated, evaluation is wrapped in a try-catch block;
   *     when caught, a CustomEvent is thrown containing the error and the expression
   */
  tolerateEvalErrors?: boolean;

  /**
   * Error handling statement block when tolerating exceptions
   * Default: none
   * You can set it to a statement block, for example:
   *  window.dispatchEvent(new CustomEvent('lowcode-eval-error', { error, expr }))
   *
   * Typically combined with monitoring to track evaluation exceptions
   *
   * Where:
   * - error: exception info
   * - expr: expression being evaluated
   */
  evalErrorsHandler?: string;

  /**
   * Hook which is used to customize original options, we can reorder/add/remove plugins/processors
   * of the existing solution.
   */
  customizeBuilderOptions?(originalOptions: ProjectBuilderInitOptions): ProjectBuilderInitOptions;
}

export interface IProjectBuilder {
  generateProject: (schema: IPublicTypeProjectSchema | string) => Promise<ResultDir>;
}

/** Project-level pre-processors */
export type ProjectPreProcessor = (schema: IPublicTypeProjectSchema) =>
  Promise<IPublicTypeProjectSchema> | IPublicTypeProjectSchema;

export interface ProjectPostProcessorOptions {
  parseResult?: IParseResult;
  template?: IProjectTemplate;
}

/** Project-level post-processors */
export type ProjectPostProcessor = (
  result: ResultDir,
  schema: IPublicTypeProjectSchema,
  originalSchema: IPublicTypeProjectSchema | string,
  options: ProjectPostProcessorOptions,
) => Promise<ResultDir> | ResultDir;

/** Factory for module-level post-processors */
export type PostProcessorFactory<T> = (config?: T) => PostProcessor;

/** Module-level post-processors */
export type PostProcessor = (content: string, fileType: string, name?: string) => string;

// TODO: temp interface, need modify
export interface IPluginOptions {
  fileDirDepth: number;
}

export type BaseGenerator<I, T, C> = (
  input: I,
  scope: IScope,
  config?: C,
  next?: BaseGenerator<I, T, C>,
) => T;
type CompositeTypeGenerator<I, T> =
  | BaseGenerator<I, T, CompositeValueGeneratorOptions>
  | Array<BaseGenerator<I, T, CompositeValueGeneratorOptions>>;

export type NodeGenerator<T> = (nodeItem: IPublicTypeNodeDataType, scope: IScope) => T;

// FIXME: In the new implementation, the first parameter this: CustomHandlerSet was added as context. Essentially
// scopeBindings?: IScopeBindings;
// This set is only for IPublicTypeCompositeValue; do not put other types here
export interface HandlerSet<T> {
  string?: CompositeTypeGenerator<string, T>;
  boolean?: CompositeTypeGenerator<boolean, T>;
  number?: CompositeTypeGenerator<number, T>;
  expression?: CompositeTypeGenerator<IPublicTypeJSExpression, T>;
  function?: CompositeTypeGenerator<IPublicTypeJSFunction, T>;
  slot?: CompositeTypeGenerator<IPublicTypeJSSlot, T>;
  array?: CompositeTypeGenerator<IPublicTypeJSONArray | IPublicTypeCompositeArray, T>;
  object?: CompositeTypeGenerator<IPublicTypeJSONObject | IPublicTypeCompositeObject, T>;
}

export interface CompositeValueGeneratorOptions {
  handlers?: HandlerSet<string>;
  nodeGenerator?: NodeGenerator<string>;
  tolerateEvalErrors?: boolean;
}

/**
 * Scope definition: maintains in-scope bindings and supports scope-chain lookup
 */
export interface IScope {
  // Parent scope (null if root)
  readonly parent: IScope | null;

  // Bindings defined in this scope (variables/functions, etc.)
  readonly bindings?: IScopeBindings;

  // TODO: Is context info needed? What should it describe?
  createSubScope: (ownIndentifiers: string[]) => IScope;
}
