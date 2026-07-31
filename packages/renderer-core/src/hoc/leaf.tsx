import { INode, IPublicTypePropChangeOptions } from '@rchh/lowcode-designer';
import { GlobalEvent, IPublicEnumTransformStage, IPublicTypeNodeSchema, IPublicTypeEngineOptions } from '@rchh/lowcode-types';
import { isReactComponent, cloneEnumerableProperty } from '@rchh/lowcode-utils';
import { debounce } from '../utils/common';
import adapter from '../adapter';
import * as types from '../types/index';
import logger from '../utils/logger';

export interface IComponentHocInfo {
  schema: any;
  baseRenderer: types.IBaseRendererInstance;
  componentInfo: any;
  scope: any;
}

export interface IComponentHocProps {
  __tag: any;
  componentId: any;
  _leaf: any;
  forwardedRef?: any;
}

export interface IComponentHocState {
  childrenInState: boolean;
  nodeChildren: any;
  nodeCacheProps: any;

  /** Controls show/hide */
  visible: boolean;

  /** Controls whether to render */
  condition: boolean;
  nodeProps: any;
}

type DesignMode = Pick<IPublicTypeEngineOptions, 'designMode'>['designMode'];

export interface IComponentHoc {
  designMode: DesignMode | DesignMode[];
  hoc: IComponentConstruct;
}

export type IComponentConstruct = (Comp: types.IBaseRenderComponent, info: IComponentHocInfo) => types.IGeneralConstructor;

interface IProps {
  _leaf: INode | undefined;

  visible: boolean;

  componentId: number;

  children?: INode[];

  __tag: number;

  forwardedRef?: any;
}

enum RerenderType {
  All = 'All',
  ChildChanged = 'ChildChanged',
  PropsChanged = 'PropsChanged',
  VisibleChanged = 'VisibleChanged',
  MinimalRenderUnit = 'MinimalRenderUnit',
}

// Cache Leaf-layer components to avoid remount/rerender issues
class LeafCache {

  /** Component cache */
  component = new Map();

  /**
   * State cache: after props change the component may be destroyed and state emptied, so updated props would not show
   */
  state = new Map();

  /**
   * Cached subscription events that trigger rerender
   */
  event = new Map();

  ref = new Map();

  constructor(public documentId: string, public device: string) {
  }
}

let cache: LeafCache;

/** Fallback for nodes that were not rendered, or when the render path did not wrap with LeafWrapper */
function initRerenderEvent({
  schema,
  __debug,
  container,
  getNode,
}: any) {
  const leaf = getNode?.(schema.id);
  if (!leaf
    || cache.event.get(schema.id)?.clear
    || leaf === cache.event.get(schema.id)
  ) {
    return;
  }
  cache.event.get(schema.id)?.dispose.forEach((disposeFn: any) => disposeFn && disposeFn());
  const debounceRerender = debounce(() => {
    container.rerender();
  }, 20);
  cache.event.set(schema.id, {
    clear: false,
    leaf,
    dispose: [
      leaf?.onPropChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onPropsChange make rerender`);
        debounceRerender();
      }),
      leaf?.onChildrenChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onChildrenChange make rerender`);
        debounceRerender();
      }) as Function,
      leaf?.onVisibleChange?.(() => {
        if (!container.autoRepaintNode) {
          return;
        }
        __debug(`${schema.componentName}[${schema.id}] leaf not render in SimulatorRendererView, leaf onVisibleChange make rerender`);
        debounceRerender();
      }),
    ],
  });
}

/** Clear globally registered events for rendered nodes */
function clearRerenderEvent(id: string): void {
  if (cache.event.get(id)?.clear) {
    return;
  }
  cache.event.get(id)?.dispose?.forEach((disposeFn: any) => disposeFn && disposeFn());
  cache.event.set(id, {
    clear: true,
    dispose: [],
  });
}

// Wrap each component with a Leaf HOC so internal prop changes trigger self-updating renders
export function leafWrapper(Comp: types.IBaseRenderComponent, {
  schema,
  baseRenderer,
  componentInfo,
  scope,
}: IComponentHocInfo) {
  const {
    __debug,
    __getComponentProps: getProps,
    __getSchemaChildrenVirtualDom: getChildren,
    __parseData,
  } = baseRenderer;
  const { engine } = baseRenderer.context;
  const host = baseRenderer.props?.__host;
  const curDocumentId = baseRenderer.props?.documentId ?? '';
  const curDevice = baseRenderer.props?.device ?? '';
  const getNode = baseRenderer.props?.getNode;
  const container = baseRenderer.props?.__container;
  const setSchemaChangedSymbol = baseRenderer.props?.setSchemaChangedSymbol;
  const editor = host?.designer?.editor;
  const runtime = adapter.getRuntime();
  const { forwardRef, createElement } = runtime;
  const Component = runtime.Component as types.IGeneralConstructor<
    IComponentHocProps, IComponentHocState
  >;

  const componentCacheId = schema.id;

  if (!cache || (curDocumentId && curDocumentId !== cache.documentId) || (curDevice && curDevice !== cache.device)) {
    cache?.event.forEach(event => {
      event.dispose?.forEach((disposeFn: any) => disposeFn && disposeFn());
    });
    cache = new LeafCache(curDocumentId, curDevice);
  }

  if (!isReactComponent(Comp)) {
    logger.error(`${schema.componentName} component may be has errors: `, Comp);
  }

  initRerenderEvent({
    schema,
    __debug,
    container,
    getNode,
  });

  if (curDocumentId && cache.component.has(componentCacheId) && (cache.component.get(componentCacheId).Comp === Comp)) {
    return cache.component.get(componentCacheId).LeafWrapper;
  }

  class LeafHoc extends Component {
    recordInfo: {
      startTime?: number | null;
      type?: string;
      node?: INode;
    } = {};

    private curEventLeaf: INode | undefined;

    static displayName = schema.componentName;

    disposeFunctions: Array<((() => void) | Function)> = [];

    __component_tag = 'leafWrapper';

    renderUnitInfo: {
      minimalUnitId?: string;
      minimalUnitName?: string;
      singleRender?: boolean;
    };

    // Debounce minimum render unit updates
    makeUnitRenderDebounced = debounce(() => {
      this.beforeRender(RerenderType.MinimalRenderUnit);
      const schema = this.leaf?.export?.(IPublicEnumTransformStage.Render);
      if (!schema) {
        return;
      }
      const nextProps = getProps(schema, scope, Comp, componentInfo);
      const children = getChildren(schema, scope, Comp);
      const nextState = {
        nodeProps: nextProps,
        nodeChildren: children,
        childrenInState: true,
      };
      if ('children' in nextProps) {
        nextState.nodeChildren = nextProps.children;
      }

      __debug(`${this.leaf?.componentName}(${this.props.componentId}) MinimalRenderUnit Render!`);
      this.setState(nextState);
    }, 20);

    constructor(props: IProps, context: any) {
      super(props, context);
      // Subscribe to the following events and update self on change
      __debug(`${schema.componentName}[${this.props.componentId}] leaf render in SimulatorRendererView`);
      clearRerenderEvent(componentCacheId);
      this.curEventLeaf = this.leaf;

      cache.ref.set(componentCacheId, {
        makeUnitRender: this.makeUnitRender,
      });

      let cacheState = cache.state.get(componentCacheId);
      if (!cacheState || cacheState.__tag !== props.__tag) {
        cacheState = this.getDefaultState(props);
      }

      this.state = cacheState;
    }

    recordTime = () => {
      if (!this.recordInfo.startTime) {
        return;
      }
      const endTime = Date.now();
      const nodeCount = host?.designer?.currentDocument?.getNodeCount?.();
      const componentName = this.recordInfo.node?.componentName || this.leaf?.componentName || 'UnknownComponent';
      editor?.eventBus.emit(GlobalEvent.Node.Rerender, {
        componentName,
        time: endTime - this.recordInfo.startTime,
        type: this.recordInfo.type,
        nodeCount,
      });
      this.recordInfo.startTime = null;
    };

    makeUnitRender = () => {
      this.makeUnitRenderDebounced();
    };

    get autoRepaintNode() {
      return container?.autoRepaintNode;
    }

    componentDidUpdate() {
      this.recordTime();
    }

    componentDidMount() {
      const _leaf = this.leaf;
      this.initOnPropsChangeEvent(_leaf);
      this.initOnChildrenChangeEvent(_leaf);
      this.initOnVisibleChangeEvent(_leaf);
      this.recordTime();
    }

    getDefaultState(nextProps: any) {
      const {
        hidden = false,
        condition = true,
      } = nextProps.__inner__ || this.leaf?.export?.(IPublicEnumTransformStage.Render) || {};
      return {
        nodeChildren: null,
        childrenInState: false,
        visible: !hidden,
        condition: __parseData?.(condition, scope),
        nodeCacheProps: {},
        nodeProps: {},
      };
    }

    setState(state: any) {
      cache.state.set(componentCacheId, {
        ...this.state,
        ...state,
        __tag: this.props.__tag,
      });
      super.setState(state);
    }

    /** Called before render when internal props change */
    beforeRender(type: string, node?: INode): void {
      this.recordInfo.startTime = Date.now();
      this.recordInfo.type = type;
      this.recordInfo.node = node;
      setSchemaChangedSymbol?.(true);
    }

    judgeMiniUnitRender() {
      if (!this.renderUnitInfo) {
        this.getRenderUnitInfo();
      }

      const renderUnitInfo = this.renderUnitInfo || {
        singleRender: true,
      };

      if (renderUnitInfo.singleRender) {
        return;
      }

      const ref = cache.ref.get(renderUnitInfo.minimalUnitId);

      if (!ref) {
        __debug('Cant find minimalRenderUnit ref! This make rerender!');
        container?.rerender();
        return;
      }
      __debug(`${this.leaf?.componentName}(${this.props.componentId}) need render, make its minimalRenderUnit ${renderUnitInfo.minimalUnitName}(${renderUnitInfo.minimalUnitId})`);
      ref.makeUnitRender();
    }

    getRenderUnitInfo(leaf = this.leaf) {
      // Leaf may be mocked inside low-code components; skip minimum render unit checks
      if (!leaf || typeof leaf.isRoot !== 'function') {
        return;
      }

      if (leaf.isRootNode) {
        this.renderUnitInfo = {
          singleRender: true,
          ...(this.renderUnitInfo || {}),
        };
      }
      if (leaf.componentMeta.isMinimalRenderUnit) {
        this.renderUnitInfo = {
          minimalUnitId: leaf.id,
          minimalUnitName: leaf.componentName,
          singleRender: false,
        };
      }
      if (leaf.hasLoop()) {
        // For elements with loop config, the parent is the minimum render unit
        this.renderUnitInfo = {
          minimalUnitId: leaf?.parent?.id,
          minimalUnitName: leaf?.parent?.componentName,
          singleRender: false,
        };
      }
      if (leaf.parent) {
        this.getRenderUnitInfo(leaf.parent);
      }
    }

    componentWillReceiveProps(nextProps: any) {
      let { componentId } = nextProps;
      if (nextProps.__tag === this.props.__tag) {
        return null;
      }

      const _leaf = getNode?.(componentId);
      if (_leaf && this.curEventLeaf && _leaf !== this.curEventLeaf) {
        this.disposeFunctions.forEach((fn) => fn());
        this.disposeFunctions = [];
        this.initOnChildrenChangeEvent(_leaf);
        this.initOnPropsChangeEvent(_leaf);
        this.initOnVisibleChangeEvent(_leaf);
        this.curEventLeaf = _leaf;
      }

      const {
        visible,
        ...resetState
      } = this.getDefaultState(nextProps);
      this.setState(resetState);
    }

    /** Listen for prop changes */
    initOnPropsChangeEvent(leaf = this.leaf): void {
      const handlePropsChange = debounce((propChangeInfo: IPublicTypePropChangeOptions) => {
        const {
          key,
          newValue = null,
        } = propChangeInfo;
        const node = leaf;

        if (key === '___condition___') {
          const { condition = true } = this.leaf?.export(IPublicEnumTransformStage.Render) || {};
          const conditionValue = __parseData?.(condition, scope);
          __debug(`key is ___condition___, change condition value to [${condition}]`);
          // Condition expression changed
          this.setState({
            condition: conditionValue,
          });
          return;
        }

        // If loop conditions change, re-render from the root
        // Multi-level loops cannot yet determine which layer to start from; use a blunt fix for now
        if (key === '___loop___') {
          __debug('key is ___loop___, render a page!');
          container?.rerender();
          // Scope changed; clear cache and use the new scope
          cache.component.delete(componentCacheId);
          return;
        }
        this.beforeRender(RerenderType.PropsChanged);
        const { state } = this;
        const { nodeCacheProps } = state;
        const nodeProps = getProps(node?.export?.(IPublicEnumTransformStage.Render) as IPublicTypeNodeSchema, scope, Comp, componentInfo);
        if (key && !(key in nodeProps) && (key in this.props)) {
          // When key exists on this.props but not in computed values, override this.props with newValue
          nodeCacheProps[key] = newValue;
        }
        __debug(`${leaf?.componentName}[${this.props.componentId}] component trigger onPropsChange!`, nodeProps, nodeCacheProps, key, newValue);
        this.setState('children' in nodeProps ? {
          nodeChildren: nodeProps.children,
          nodeProps,
          childrenInState: true,
          nodeCacheProps,
        } : {
          nodeProps,
          nodeCacheProps,
        });

        this.judgeMiniUnitRender();
      });
      const dispose = leaf?.onPropChange?.((propChangeInfo: IPublicTypePropChangeOptions) => {
        if (!this.autoRepaintNode) {
          return;
        }
        handlePropsChange(propChangeInfo);
      });

      dispose && this.disposeFunctions.push(dispose);
    }

    /**
     * Listen for visibility changes
     */
    initOnVisibleChangeEvent(leaf = this.leaf) {
      const dispose = leaf?.onVisibleChange?.((flag: boolean) => {
        if (!this.autoRepaintNode) {
          return;
        }
        if (this.state.visible === flag) {
          return;
        }

        __debug(`${leaf?.componentName}[${this.props.componentId}] component trigger onVisibleChange(${flag}) event`);
        this.beforeRender(RerenderType.VisibleChanged);
        this.setState({
          visible: flag,
        });
        this.judgeMiniUnitRender();
      });

      dispose && this.disposeFunctions.push(dispose);
    }

    /**
     * Listen for children changes (drag, delete, ...)
     */
    initOnChildrenChangeEvent(leaf = this.leaf) {
      const dispose = leaf?.onChildrenChange?.((param): void => {
        if (!this.autoRepaintNode) {
          return;
        }
        const {
          type,
          node,
        } = param || {};
        this.beforeRender(`${RerenderType.ChildChanged}-${type}`, node);
        // TODO: cache siblings' children.
        // Caching second-level children breaks Next filter components
        // Caching first-level children breaks Next Tab components
        const nextChild = getChildren(leaf?.export?.(IPublicEnumTransformStage.Render) as types.ISchema, scope, Comp);
        __debug(`${schema.componentName}[${this.props.componentId}] component trigger onChildrenChange event`, nextChild);
        this.setState({
          nodeChildren: nextChild,
          childrenInState: true,
        });
        this.judgeMiniUnitRender();
      });
      dispose && this.disposeFunctions.push(dispose);
    }

    componentWillUnmount() {
      this.disposeFunctions.forEach(fn => fn());
    }

    get hasChildren(): boolean {
      if (!this.state.childrenInState) {
        return 'children' in this.props;
      }

      return true;
    }

    get children(): any {
      if (this.state.childrenInState) {
        return this.state.nodeChildren;
      }
      if (this.props.children && !Array.isArray(this.props.children)) {
        return [this.props.children];
      }
      if (this.props.children && this.props.children.length) {
        return this.props.children;
      }
      return this.props.children;
    }

    get leaf(): INode | undefined {
      if (this.props._leaf?.isMock) {
        // Low-code components update as a whole; inner components need not listen to related events
        return undefined;
      }

      return getNode?.(componentCacheId);
    }

    render() {
      if (!this.state.visible || !this.state.condition) {
        return null;
      }

      const {
        forwardedRef,
        ...rest
      } = this.props;

      const compProps = {
        ...rest,
        ...(this.state.nodeCacheProps || {}),
        ...(this.state.nodeProps || {}),
        children: [],
        __id: this.props.componentId,
        ref: forwardedRef,
      };

      delete compProps.__inner__;

      if (this.hasChildren) {
        return engine.createElement(Comp, compProps, this.children);
      }

      return engine.createElement(Comp, compProps);
    }
  }

  let LeafWrapper = forwardRef((props: any, ref: any) => {
    return createElement(LeafHoc, {
      ...props,
      forwardedRef: ref,
    });
  });

  LeafWrapper = cloneEnumerableProperty(LeafWrapper, Comp);

  LeafWrapper.displayName = (Comp as any).displayName;

  cache.component.set(componentCacheId, {
    LeafWrapper,
    Comp,
  });

  return LeafWrapper;
}