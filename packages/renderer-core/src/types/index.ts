import type { ComponentLifecycle, CSSProperties } from 'react';
import { BuiltinSimulatorHost, BuiltinSimulatorRenderer } from '@rchh/lowcode-designer';
import { RequestHandler, IPublicTypeNodeSchema, IPublicTypeRootSchema, IPublicTypeJSONObject } from '@rchh/lowcode-types';

export type ISchema = IPublicTypeNodeSchema | IPublicTypeRootSchema;

/*
 ** Duck typed component type supporting both react and rax
 */
interface IGeneralComponent<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> {
  readonly props: Readonly<P> & Readonly<{ children?: any | undefined }>;
  state: Readonly<S>;
  refs: Record<string, any>;
  context: any;
  setState<K extends keyof S>(
    state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
    callback?: () => void
  ): void;
  forceUpdate(callback?: () => void): void;
  render(): any;
}

export type IGeneralConstructor<
  T = {
    [key: string]: any;
  }, S = {
    [key: string]: any;
  }, D = any
> = new <TT = T, SS = S, DD = D>(props: TT, context: any) => IGeneralComponent<TT, SS, DD>;

/**
 * duck-typed History
 *
 * @see https://github.com/ReactTraining/history/tree/master/docs/api-reference.md
 */
interface IHistoryLike {
  readonly action: any;
  readonly location: ILocationLike;
  createHref: (to: any) => string;
  push: (to: any, state?: any) => void;
  replace: (to: any, state?: any) => void;
  go: (delta: any) => void;
  back: () => void;
  forward: () => void;
  listen: (listener: any) => () => void;
  block: (blocker: any) => () => void;
}

/**
 * duck-typed History.Location
 *
 * @see https://github.com/remix-run/history/blob/dev/docs/api-reference.md#location
 */
export interface ILocationLike {
  pathname: any;
  search: any;
  state: any;
  hash: any;
  key?: any;
}

export type IRendererAppHelper = Partial<{

  /** Global shared utilities */
  utils: Record<string, any>;

  /** Global constants */
  constants: Record<string, any>;

  /** react-router location instance */
  location: ILocationLike;

  /** react-router history instance */
  history: IHistoryLike;

  /** @deprecated no longer used by any business */
  match: any;

  /** @experimental internal use */
  logParams: Record<string, any>;

  /** @experimental internal use */
  addons: Record<string, any>;

  /** @experimental internal use */
  requestHandlersMap: Record<string, RequestHandler<{
    data: unknown;
  }>>;
}>;

/**
 * Public renderer configuration
 *
 * @see @todo @ChengHu
 */
export interface IRendererProps {

  /** Data conforming to the low-code builder protocol */
  schema: IPublicTypeRootSchema | IPublicTypeNodeSchema;

  /** Component dependency instances */
  components: Record<string, IGeneralComponent>;

  /** CSS class name */
  className?: string;

  /** style */
  style?: CSSProperties;

  /** id */
  id?: string | number;

  /** Locale */
  locale?: string;

  /**
   * i18n messages
   * See the Low-Code Component Description Protocol at https://lowcode-engine.cn/lowcode section 2.6 Internationalization
   * */
  messages?: Record<string, any>;

  /** Used to set the renderer's global context; defined members can be accessed in low-code via this, e.g. this.utils */
  appHelper?: IRendererAppHelper;

  /**
   * See the Low-Code Component Description Protocol at https://lowcode-engine.cn/lowcode
   * Primarily used in the builder to improve the authoring experience.
   *
   * > Not required in production
   */
  componentsMap?: { [key: string]: any };

  /** Design mode; optional values: live, design */
  designMode?: string;

  /** Whether the renderer is suspended; when true, the outermost container's shouldComponentUpdate always returns false. Used in drill-down editing or multi-engine rendering scenarios. */
  suspended?: boolean;

  /** Hook fired when the component receives a ref */
  onCompGetRef?: (schema: IPublicTypeNodeSchema, ref: any) => void;

  /** Callback when component ctx updates */
  onCompGetCtx?: (schema: IPublicTypeNodeSchema, ref: any) => void;

  /** Whether the incoming schema has changed */
  getSchemaChangedSymbol?: () => boolean;

  /** Set whether the schema has changed */
  setSchemaChangedSymbol?: (symbol: boolean) => void;

  /** Custom hook for creating elements */
  customCreateElement?: (Component: any, props: any, children: any) => any;

  /** Render type identifying how the current module is rendered */
  rendererName?: 'LowCodeRenderer' | 'PageRenderer' | string;

  /** Component shown when a component cannot be found */
  notFoundComponent?: IGeneralComponent;

  /** Component shown when rendering throws */
  faultComponent?: IGeneralComponent;

  /**  */
  faultComponentMap?: {
    [prop: string]: IGeneralComponent;
  };

  /** Device info */
  device?: string;

  /**
   * @default true
   * Whether JSExpression only supports accessing context variables via this
   */
  thisRequiredInJSE?: boolean;

  /**
   * @default false
   * When component-not-found strict mode is enabled, the renderer will not fall back to a default container component
   */
  enableStrictNotFoundMode?: boolean;
}

export interface IRendererState {
  engineRenderError?: boolean;
  error?: Error;
}

/**
 * Internal renderer configuration
 */
export interface IBaseRendererProps {
  locale?: string;
  messages: Record<string, any>;
  __appHelper: IRendererAppHelper;
  __components: Record<string, any>;
  __ctx: Record<string, any>;
  __schema: IPublicTypeRootSchema;
  __host?: BuiltinSimulatorHost;
  __container?: BuiltinSimulatorRenderer;
  config?: Record<string, any>;
  designMode?: 'design';
  className?: string;
  style?: CSSProperties;
  id?: string | number;
  getSchemaChangedSymbol?: () => boolean;
  setSchemaChangedSymbol?: (symbol: boolean) => void;
  thisRequiredInJSE?: boolean;
  documentId?: string;
  getNode?: any;

  /**
   * Device type, default: 'default'
   */
  device?: 'default' | 'mobile' | string;
  componentName?: string;
}

export interface INodeInfo {
  schema?: IPublicTypeNodeSchema;
  Comp: any;
  componentInfo?: any;
  componentChildren?: any;
}

export interface JSExpression {
  type: string;
  value: string;
}

export interface DataSourceItem {
  id: string;
  isInit?: boolean | JSExpression;
  type?: string;
  options?: {
    uri: string | JSExpression;
    params?: IPublicTypeJSONObject | JSExpression;
    method?: string | JSExpression;
    shouldFetch?: string;
    willFetch?: string;
    fit?: string;
    didFetch?: string;
  };
  dataHandler?: JSExpression;
}

export interface DataSource {
  list?: DataSourceItem[];
  dataHandler?: JSExpression;
}

export interface IRuntime {
  [key: string]: any;
  Component: IGeneralConstructor;
  PureComponent: IGeneralConstructor;
  createElement: (...args: any) => any;
  createContext: (...args: any) => any;
  forwardRef: (...args: any) => any;
  findDOMNode: (...args: any) => any;
}

export interface IRendererModules {
  BaseRenderer?: IBaseRenderComponent;
  PageRenderer: IBaseRenderComponent;
  ComponentRenderer: IBaseRenderComponent;
  BlockRenderer?: IBaseRenderComponent;
  AddonRenderer?: IBaseRenderComponent;
  TempRenderer?: IBaseRenderComponent;
  DivRenderer?: IBaseRenderComponent;
}

export interface IBaseRendererContext {
  appHelper: IRendererAppHelper;
  components: Record<string, IGeneralComponent>;
  engine: IRuntime;
  pageContext?: IBaseRenderComponent;
  compContext?: IBaseRenderComponent;
}

export type IBaseRendererInstance = IGeneralComponent<
  IBaseRendererProps,
  Record<string, any>,
  any
>
  & {
    reloadDataSource(): Promise<any>;
    __beforeInit(props: IBaseRendererProps): void;
    __init(props: IBaseRendererProps): void;
    __afterInit(props: IBaseRendererProps): void;
    __executeLifeCycleMethod(method: string, args?: any[]): void;
    __bindCustomMethods(props: IBaseRendererProps): void;
    __generateCtx(ctx: Record<string, any>): void;
    __parseData(data: any, ctx?: any): any;
    __initDataSource(props: IBaseRendererProps): void;
    __render(): void;
    __getRef(ref: any): void;
    __getSchemaChildrenVirtualDom(
      schema: IPublicTypeNodeSchema | undefined,
      Comp: any,
      nodeChildrenMap?: any
    ): any;
    __getComponentProps(schema: IPublicTypeNodeSchema | undefined, scope: any, Comp: any, componentInfo?: any): any;
    __createDom(): any;
    __createVirtualDom(schema: any, self: any, parentInfo: INodeInfo, idx: string | number): any;
    __createLoopVirtualDom(schema: any, self: any, parentInfo: INodeInfo, idx: number | string): any;
    __parseProps(props: any, self: any, path: string, info: INodeInfo): any;
    __initDebug?(): void;
    __debug(...args: any[]): void;
    __renderContextProvider(customProps?: object, children?: any): any;
    __renderContextConsumer(children: any): any;
    __renderContent(children: any): any;
    __checkSchema(schema: IPublicTypeNodeSchema | undefined, extraComponents?: string | string[]): any;
    __renderComp(Comp: any, ctxProps: object): any;
    $(filedId: string, instance?: any): any;
  };

export interface IBaseRenderComponent {
  new(
    props: IBaseRendererProps,
    context: any
  ): IBaseRendererInstance;
}

export interface IRenderComponent {
  displayName: string;
  defaultProps: IRendererProps;
  findDOMNode: (...args: any) => any;

  new(props: IRendererProps, context: any): IGeneralComponent<IRendererProps, IRendererState> & {
    [x: string]: any;
    __getRef: (ref: any) => void;
    componentDidMount(): Promise<void> | void;
    componentDidUpdate(): Promise<void> | void;
    componentWillUnmount(): Promise<void> | void;
    componentDidCatch(e: any): Promise<void> | void;
    shouldComponentUpdate(nextProps: IRendererProps): boolean;
    isValidComponent(SetComponent: any): any;
    createElement(SetComponent: any, props: any, children?: any): any;
    getNotFoundComponent(): any;
    getFaultComponent(): any;
  };
}
