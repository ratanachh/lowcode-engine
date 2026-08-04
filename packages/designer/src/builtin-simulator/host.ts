import {
  obx,
  autorun,
  reaction,
  computed,
  getPublicPath,
  engineConfig,
  globalLocale,
  IReactionPublic,
  IReactionOptions,
  IReactionDisposer,
  makeObservable,
  createModuleEventBus,
  IEventBus,
} from '@rchh/lowcode-editor-core';

import {
  ISimulatorHost,
  Component,
  DropContainer,
} from '../simulator';
import Viewport from './viewport';
import { createSimulator } from './create-simulator';
import { Node, INode, contains, isRootNode, isLowCodeComponent } from '../document';
import ResourceConsumer from './resource-consumer';
import {
  AssetLevel,
  Asset,
  AssetList,
  assetBundle,
  assetItem,
  AssetType,
  isElement,
  isFormEvent,
  hasOwnProperty,
  UtilsMetadata,
  getClosestNode,
  transactionManager,
  isDragAnyObject,
  isDragNodeObject,
  isLocationData,
  Logger,
} from '@rchh/lowcode-utils';
import {
  isShaken,
  ILocateEvent,
  isChildInline,
  isRowContainer,
  getRectTarget,
  CanvasPoint,
  Designer,
  IDesigner,
} from '../designer';
import { parseMetadata } from './utils/parse-metadata';
import { getClosestClickableNode } from './utils/clickable';
import {
  IPublicTypeComponentMetadata,
  IPublicTypePackage,
  IPublicEnumTransitionType,
  IPublicEnumDragObjectType,
  IPublicTypeNodeInstance,
  IPublicTypeComponentInstance,
  IPublicTypeLocationChildrenDetail,
  IPublicTypeLocationDetailType,
  IPublicTypeRect,
  IPublicModelNode,
} from '@rchh/lowcode-types';
import { BuiltinSimulatorRenderer } from './renderer';
import { clipboard } from '../designer/clipboard';
import { LiveEditing } from './live-editing/live-editing';
import { IProject, Project } from '../project';
import { IScroller } from '../designer/scroller';
import { isElementNode, isDOMNodeVisible } from '../utils/misc';
import { debounce } from 'lodash';

const logger = new Logger({ level: 'warn', bizName: 'designer' });

export type LibraryItem = IPublicTypePackage & {
  package: string;
  library: string;
  urls?: Asset;
  editUrls?: Asset;
};

export interface DeviceStyleProps {
  canvas?: object;
  viewport?: object;
}

export interface BuiltinSimulatorProps {
  // Obtain from documentModel
  // suspended?: boolean;
  designMode?: 'live' | 'design' | 'preview' | 'extend' | 'border';
  device?: 'mobile' | 'iphone' | string;
  deviceClassName?: string;
  environment?: Asset;
  // @TODO add types
  /** @property request handler config */
  requestHandlersMap?: any;
  extraEnvironment?: Asset;
  library?: LibraryItem[];
  utilsMetadata?: UtilsMetadata;
  simulatorUrl?: Asset;
  theme?: Asset;
  componentsAsset?: Asset;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  [key: string]: any;
}

const defaultSimulatorUrl = (() => {
  const publicPath = getPublicPath();
  let urls;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, prefix = '', dev] = /^(.+?)(\/js)?\/?$/.exec(publicPath) || [];
  if (dev) {
    urls = [
      `${prefix}/css/react-simulator-renderer.css`,
      `${prefix}/js/react-simulator-renderer.js`,
    ];
  } else if (process.env.NODE_ENV === 'production') {
    urls = [`${prefix}/react-simulator-renderer.css`, `${prefix}/react-simulator-renderer.js`];
  } else {
    urls = [`${prefix}/react-simulator-renderer.css`, `${prefix}/react-simulator-renderer.js`];
  }
  return urls;
})();

const defaultEnvironment = [
  // https://g.alicdn.com/mylib/??react/16.11.0/umd/react.production.min.js,react-dom/16.8.6/umd/react-dom.production.min.js,prop-types/15.7.2/prop-types.min.js
  assetItem(
    AssetType.JSText,
    'window.React=parent.React;window.ReactDOM=parent.ReactDOM;window.__is_simulator_env__=true;',
    undefined,
    'react',
  ),
  assetItem(
    AssetType.JSText,
    'window.PropTypes=parent.PropTypes;React.PropTypes=parent.PropTypes; window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__;',
  ),
  // Simulator renderer UMD externals expect these on the iframe window.
  assetItem(
    AssetType.JSText,
    'window.Next=parent.Next;window.moment=parent.moment;window._=parent._;',
  ),
];

export class BuiltinSimulatorHost implements ISimulatorHost<BuiltinSimulatorProps> {
  readonly isSimulator = true;

  readonly project: IProject;

  readonly designer: IDesigner;

  readonly viewport = new Viewport();

  readonly scroller: IScroller;

  readonly emitter: IEventBus = createModuleEventBus('BuiltinSimulatorHost');

  readonly componentsConsumer: ResourceConsumer;

  readonly injectionConsumer: ResourceConsumer;

  readonly i18nConsumer: ResourceConsumer;

  /**
   * Whether canvas auto-renders
   */
  autoRender = true;

  get currentDocument() {
    return this.project.currentDocument;
  }

  @computed get renderEnv(): string {
    return this.get('renderEnv') || 'default';
  }

  @computed get device(): string {
    return this.get('device') || 'default';
  }

  @computed get locale(): string {
    return this.get('locale') || globalLocale.getLocale();
  }

  @computed get deviceClassName(): string | undefined {
    return this.get('deviceClassName');
  }

  @computed get designMode(): 'live' | 'design' | 'preview' {
    // renderer dependency
    // TODO: switch mouse handling based on design mode
    return this.get('designMode') || 'design';
  }

  @computed get requestHandlersMap(): any {
    // renderer dependency
    // TODO: switch mouse handling based on design mode
    return this.get('requestHandlersMap') || null;
  }

  get thisRequiredInJSE(): boolean {
    return engineConfig.get('thisRequiredInJSE') ?? true;
  }

  get enableStrictNotFoundMode(): any {
    return engineConfig.get('enableStrictNotFoundMode') ?? false;
  }

  get notFoundComponent(): any {
    return engineConfig.get('notFoundComponent') ?? null;
  }

  get faultComponent(): any {
    return engineConfig.get('faultComponent') ?? null;
  }

  get faultComponentMap(): any {
    return engineConfig.get('faultComponentMap') ?? null;
  }

  @computed get componentsAsset(): Asset | undefined {
    return this.get('componentsAsset');
  }

  @computed get theme(): Asset | undefined {
    return this.get('theme');
  }

  @computed get componentsMap() {
    // renderer dependency
    return this.designer.componentsMap;
  }

  @computed get deviceStyle(): DeviceStyleProps | undefined {
    return this.get('deviceStyle');
  }

  @obx.ref _props: BuiltinSimulatorProps = {};

  @obx.ref private _contentWindow?: Window;

  get contentWindow() {
    return this._contentWindow;
  }

  @obx.ref private _contentDocument?: Document;

  @obx.ref private _appHelper?: any;

  get contentDocument() {
    return this._contentDocument;
  }

  private _renderer?: BuiltinSimulatorRenderer;

  get renderer() {
    return this._renderer;
  }

  readonly asyncLibraryMap: { [key: string]: {} } = {};

  readonly libraryMap: { [key: string]: string } = {};

  private _iframe?: HTMLIFrameElement;

  private disableHovering?: () => void;

  private disableDetecting?: () => void;

  readonly liveEditing = new LiveEditing();

  @obx private instancesMap: {
    [docId: string]: Map<string, IPublicTypeComponentInstance[]>;
  } = {};

  private tryScrollAgain: number | null = null;

  private _sensorAvailable = true;

  /**
   * @see IPublicModelSensor
   */
  get sensorAvailable(): boolean {
    return this._sensorAvailable;
  }

  private sensing = false;

  constructor(project: Project, designer: Designer) {
    makeObservable(this);
    this.project = project;
    this.designer = designer;
    this.scroller = this.designer.createScroller(this.viewport);
    this.autoRender = !engineConfig.get('disableAutoRender', false);
    this._appHelper = engineConfig.get('appHelper');
    this.componentsConsumer = new ResourceConsumer<Asset | undefined>(() => this.componentsAsset);
    this.injectionConsumer = new ResourceConsumer(() => {
      return {
        appHelper: this._appHelper,
      };
    });

    engineConfig.onGot('appHelper', (data) => {
      // After appHelper is updated via config.set, trigger injectionConsumer.consume
      this._appHelper = data;
    });

    this.i18nConsumer = new ResourceConsumer(() => this.project.i18n);

    transactionManager.onStartTransaction(() => {
      this.stopAutoRepaintNode();
    }, IPublicEnumTransitionType.REPAINT);
    // Avoid multiple rerenders when transactions are batched
    const rerender = debounce(this.rerender.bind(this), 28);
    transactionManager.onEndTransaction(() => {
      rerender();
      this.enableAutoRepaintNode();
    }, IPublicEnumTransitionType.REPAINT);
  }

  stopAutoRepaintNode() {
    this.renderer?.stopAutoRepaintNode();
  }

  enableAutoRepaintNode() {
    this.renderer?.enableAutoRepaintNode();
  }

  /**
   * @see ISimulator
   */
  setProps(props: BuiltinSimulatorProps) {
    this._props = props;
  }

  set(key: string, value: any) {
    this._props = {
      ...this._props,
      [key]: value,
    };
  }

  get(key: string): any {
    if (key === 'device') {
      return (
        this.designer?.editor?.get('deviceMapper')?.transform?.(this._props.device) ||
        this._props.device
      );
    }
    return this._props[key];
  }

  /**
   * A Renderer process connected; set up sync mechanism
   */
  connect(
    renderer: BuiltinSimulatorRenderer,
    effect: (reaction: IReactionPublic) => void, options?: IReactionOptions,
  ) {
    this._renderer = renderer;
    return autorun(effect, options);
  }

  reaction(expression: (reaction: IReactionPublic) => unknown, effect: (value: unknown, prev: unknown, reaction: IReactionPublic) => void,
    opts?: IReactionOptions | undefined): IReactionDisposer {
    return reaction(expression, effect, opts);
  }

  autorun(effect: (reaction: IReactionPublic) => void, options?: IReactionOptions): IReactionDisposer {
    return autorun(effect, options);
  }

  purge(): void {
    // todo

  }

  mountViewport(viewport: HTMLElement | null) {
    this.viewport.mount(viewport);
  }

  /**
   * {
   *   "title":"BizCharts",
   *   "package":"bizcharts",
   *   "exportName":"bizcharts",
   *   "version":"4.0.14",
   *   "urls":[
   *      "https://g.alicdn.com/code/lib/bizcharts/4.0.14/BizCharts.js"
   *   ],
   *   "library":"BizCharts"
   * }
   * package: String npm package name of the asset
   * exportName: String UMD export name, for materials whose define name differs
   *   (e.g. map BizCharts to bizcharts when materials declare bizcharts via define)
   * version: String version
   * urls: Array CDN URLs; must be UMD (.js or .css)
   * library: String name exported directly by the UMD bundle
   */
  buildLibrary(library?: LibraryItem[]) {
    const _library = library || (this.get('library') as LibraryItem[]);
    const libraryAsset: AssetList = [];
    const libraryExportList: string[] = [];
    const functionCallLibraryExportList: string[] = [];

    if (_library && _library.length) {
      _library.forEach((item) => {
        const { exportMode, exportSourceLibrary } = item;
        this.libraryMap[item.package] = item.library;
        if (item.async) {
          this.asyncLibraryMap[item.package] = item;
        }
        if (item.exportName && item.library) {
          libraryExportList.push(
            `Object.defineProperty(window,'${item.exportName}',{get:()=>window.${item.library}});`,
          );
        }
        if (exportMode === 'functionCall' && exportSourceLibrary) {
          functionCallLibraryExportList.push(
            `window["${item.library}"] = window["${exportSourceLibrary}"]("${item.library}", "${item.package}");`,
          );
        }
        if (item.editUrls) {
          libraryAsset.push(item.editUrls);
        } else if (item.urls) {
          libraryAsset.push(item.urls);
        }
      });
    }
    libraryAsset.unshift(assetItem(AssetType.JSText, libraryExportList.join('')));
    libraryAsset.push(assetItem(AssetType.JSText, functionCallLibraryExportList.join('')));
    return libraryAsset;
  }

  rerender() {
    this.designer.refreshComponentMetasMap();
    this.renderer?.rerender?.();
  }

  async mountContentFrame(iframe: HTMLIFrameElement | null): Promise<void> {
    if (!iframe || this._iframe === iframe) {
      return;
    }
    this._iframe = iframe;

    this._contentWindow = iframe.contentWindow!;
    this._contentDocument = this._contentWindow.document;

    const libraryAsset: AssetList = this.buildLibrary();

    if (this.renderEnv === 'rax') {
      logger.error('After LowcodeEngine v1.3.0, Rax is no longer supported.');
    }

    const vendors = [
      // required & use once
      assetBundle(
        this.get('environment') ||
        defaultEnvironment,
        AssetLevel.Environment,
      ),
      // required & use once
      assetBundle(this.get('extraEnvironment'), AssetLevel.Environment),

      // required & use once
      assetBundle(libraryAsset, AssetLevel.Library),
      // required & TODO: think of update
      assetBundle(this.theme, AssetLevel.Theme),
      // required & use once
      assetBundle(
        this.get('simulatorUrl') ||
        defaultSimulatorUrl,
        AssetLevel.Runtime,
      ),
    ];

    // wait: prepare iframe content and inject dependencies
    const renderer = await createSimulator(this, iframe, vendors);

    // TODO: !!! thinkof reload onloa

    // wait: business components are consumed once, otherwise rendering fails
    await this.componentsConsumer.waitFirstConsume();

    // wait: runtime context
    await this.injectionConsumer.waitFirstConsume();

    if (Object.keys(this.asyncLibraryMap).length > 0) {
      // Load async Library
      await renderer.loadAsyncLibrary(this.asyncLibraryMap);
      Object.keys(this.asyncLibraryMap).forEach((key) => {
        delete this.asyncLibraryMap[key];
      });
    }

    // step 5 ready & render
    renderer.run();

    // init events, overlays
    this.viewport.setScrollTarget(this._contentWindow);
    this.setupEvents();

    // bind hotkey & clipboard
    const hotkey = this.designer.editor.get('innerHotkey');
    hotkey.mount(this._contentWindow);
    const innerSkeleton = this.designer.editor.get('skeleton');
    innerSkeleton.focusTracker.mount(this._contentWindow);
    clipboard.injectCopyPaster(this._contentDocument);

    // TODO: dispose the bindings
  }

  async setupComponents(library: LibraryItem[]) {
    const libraryAsset: AssetList = this.buildLibrary(library);
    await this.renderer?.load(libraryAsset);
    if (Object.keys(this.asyncLibraryMap).length > 0) {
      // Load async Library
      await this.renderer?.loadAsyncLibrary(this.asyncLibraryMap);
      Object.keys(this.asyncLibraryMap).forEach((key) => {
        delete this.asyncLibraryMap[key];
      });
    }
  }

  setupEvents() {
    // TODO: Thinkof move events control to simulator renderer
    //       just listen special callback
    // because iframe maybe reload
    this.setupDragAndClick();
    this.setupDetecting();
    this.setupLiveEditing();
    this.setupContextMenu();
  }

  postEvent(eventName: string, ...data: any[]) {
    this.emitter.emit(eventName, ...data);
  }

  setupDragAndClick() {
    const { designer } = this;
    const doc = this.contentDocument!;

    // TODO: think of lock when edit a node
    // Event routing
    doc.addEventListener(
      'mousedown',
      (downEvent: MouseEvent) => {
        // fix for popups close logic
        document.dispatchEvent(new Event('mousedown'));
        const documentModel = this.project.currentDocument;
        if (this.liveEditing.editing || !documentModel) {
          return;
        }
        const { selection } = documentModel;
        let isMulti = false;
        if (this.designMode === 'design') {
          isMulti = downEvent.metaKey || downEvent.ctrlKey;
        } else if (!downEvent.metaKey) {
          return;
        }
        // FIXME: dirty fix remove label-for fro liveEditing
        downEvent.target?.removeAttribute('for');
        const nodeInst = this.getNodeInstanceFromElement(downEvent.target);
        const { focusNode } = documentModel;
        const node = getClosestClickableNode(nodeInst?.node || focusNode, downEvent);
        // If no clickable node is found, return early
        if (!node) {
          return;
        }
        // Trigger onMouseDownHook
        const onMouseDownHook = node.componentMeta.advanced.callbacks?.onMouseDownHook;
        if (onMouseDownHook) {
          onMouseDownHook(downEvent, node.internalToShellNode());
        }
        const rglNode = node?.getParent();
        const isRGLNode = rglNode?.isRGLContainer;
        if (isRGLNode) {
          // Skip if dragging the magnet block bottom-right resize handle
          if (downEvent.target?.classList.contains('react-resizable-handle')) return;
          // Disable multi-select
          isMulti = false;
          designer.dragon.emitter.emit('rgl.switch', {
            action: 'start',
            rglNode,
          });
        } else {
          // stop response document focus event
          // Disable native drag
          downEvent.stopPropagation();
          downEvent.preventDefault();
        }
        // if (!node?.isValidComponent()) {
        //   // Return early for unregistered components
        //   return;
        // }
        const isLeftButton = downEvent.which === 1 || downEvent.button === 0;
        const checkSelect = (e: MouseEvent) => {
          doc.removeEventListener('mouseup', checkSelect, true);
          // Cancel move;
          designer.dragon.emitter.emit('rgl.switch', {
            action: 'end',
            rglNode,
          });
          // Did the mouse move? - jitter should still allow select; magnet blocks drop shaken check
          if (!isShaken(downEvent, e) || isRGLNode) {
            let { id } = node;
            designer.activeTracker.track({ node, instance: nodeInst?.instance });
            if (isMulti && focusNode && !node.contains(focusNode) && selection.has(id)) {
              selection.remove(id);
            } else {
              // TODO: avoid selecting Page; default to first child; add rule or check Live mode
              if (node.isPage() && node.getChildren()?.notEmpty() && this.designMode === 'live') {
                const firstChildId = node.getChildren()?.get(0)?.getId();
                if (firstChildId) id = firstChildId;
              }
              if (focusNode) {
                selection.select(node.contains(focusNode) ? focusNode.id : id);
              }

              // dirty code should refector
              const editor = this.designer?.editor;
              const npm = node?.componentMeta?.npm;
              const selected =
                [npm?.package, npm?.componentName].filter((item) => !!item).join('-') ||
                node?.componentMeta?.componentName ||
                '';
              editor?.eventBus.emit('designer.builtinSimulator.select', {
                selected,
              });
            }
          }
        };

        if (isLeftButton && focusNode && !node.contains(focusNode)) {
          let nodes: INode[] = [node];
          let ignoreUpSelected = false;
          if (isMulti) {
            // multi select mode, directily add
            if (!selection.has(node.id)) {
              designer.activeTracker.track({ node, instance: nodeInst?.instance });
              selection.add(node.id);
              ignoreUpSelected = true;
            }
            focusNode?.id && selection.remove(focusNode.id);
            // Get top-level nodes
            nodes = selection.getTopNodes();
          } else if (selection.containsNode(node, true)) {
            nodes = selection.getTopNodes();
          } else {
            // will clear current selection & select dragment in dragstart
          }
          designer.dragon.boost(
            {
              type: IPublicEnumDragObjectType.Node,
              nodes,
            },
            downEvent,
            isRGLNode ? rglNode : undefined,
          );
          if (ignoreUpSelected) {
            // multi select mode has add selected, should return
            return;
          }
        }

        doc.addEventListener('mouseup', checkSelect, true);
      },
      true,
    );

    doc.addEventListener(
      'click',
      (e) => {
        // fix for popups close logic
        const x = new Event('click');
        x.initEvent('click', true);
        this._iframe?.dispatchEvent(x);
        const { target } = e;

        const customizeIgnoreSelectors = engineConfig.get('customizeIgnoreSelectors');
        // TODO: need more elegant solution to ignore click events of components in designer
        const defaultIgnoreSelectors: string[] = [
          '.next-input-group',
          '.next-checkbox-group',
          '.next-checkbox-wrapper',
          '.next-date-picker',
          '.next-input',
          '.next-month-picker',
          '.next-number-picker',
          '.next-radio-group',
          '.next-range',
          '.next-range-picker',
          '.next-rating',
          '.next-select',
          '.next-switch',
          '.next-time-picker',
          '.next-upload',
          '.next-year-picker',
          '.next-breadcrumb-item',
          '.next-calendar-header',
          '.next-calendar-table',
          '.editor-container', // Rich text component
        ];
        const ignoreSelectors = customizeIgnoreSelectors?.(defaultIgnoreSelectors, e) || defaultIgnoreSelectors;
        const ignoreSelectorsString = ignoreSelectors.join(',');
        // When customizeIgnoreSelectors is provided, skip isFormEvent() check
        if ((!customizeIgnoreSelectors && isFormEvent(e)) || target?.closest(ignoreSelectorsString)) {
          e.preventDefault();
          e.stopPropagation();
        }
        // stop response document click event
        // todo: catch link redirect
      },
      true,
    );
  }

  /**
   * Set up hover handling
   */
  setupDetecting() {
    const doc = this.contentDocument!;
    const { detecting, dragon } = this.designer;
    const hover = (e: MouseEvent) => {
      if (!detecting.enable || this.designMode !== 'design') {
        return;
      }
      const nodeInst = this.getNodeInstanceFromElement(e.target as Element);
      if (nodeInst?.node) {
        let { node } = nodeInst;
        const focusNode = node.document?.focusNode;
        if (focusNode && node.contains(focusNode)) {
          node = focusNode;
        }
        detecting.capture(node);
      } else {
        detecting.capture(null);
      }
      if (!engineConfig.get('enableMouseEventPropagationInCanvas', false) || dragon.dragging) {
        e.stopPropagation();
      }
    };
    const leave = () => {
      this.project.currentDocument && detecting.leave(this.project.currentDocument);
    };

    doc.addEventListener('mouseover', hover, true);
    doc.addEventListener('mouseleave', leave, false);

    // TODO: refactor this line, contains click, mousedown, mousemove
    doc.addEventListener(
      'mousemove',
      (e: Event) => {
        if (!engineConfig.get('enableMouseEventPropagationInCanvas', false) || dragon.dragging) {
          e.stopPropagation();
        }
      },
      true,
    );

    // this.disableDetecting = () => {
    //   detecting.leave(this.project.currentDocument);
    //   doc.removeEventListener('mouseover', hover, true);
    //   doc.removeEventListener('mouseleave', leave, false);
    //   this.disableDetecting = undefined;
    // };
  }

  setupLiveEditing() {
    const doc = this.contentDocument!;
    // cause edit
    doc.addEventListener(
      'dblclick',
      (e: MouseEvent) => {
        // stop response document dblclick event
        e.stopPropagation();
        e.preventDefault();

        const targetElement = e.target as HTMLElement;
        const nodeInst = this.getNodeInstanceFromElement(targetElement);
        if (!nodeInst) {
          return;
        }
        const focusNode = this.project.currentDocument?.focusNode;
        const node = nodeInst.node || focusNode;
        if (!node || isLowCodeComponent(node)) {
          return;
        }

        const rootElement = this.findDOMNodes(
          nodeInst.instance,
          node.componentMeta.rootSelector,
        )?.find(
          (item) =>
            // May be [null];
            item && item.contains(targetElement),
        ) as HTMLElement;
        if (!rootElement) {
          return;
        }

        this.liveEditing.apply({
          node,
          rootElement,
          event: e,
        });
      },
      true,
    );
  }

  /**
   * @see ISimulator
   */
  setSuspense(/** _suspended: boolean */) {
    return false;
    // if (suspended) {
    //   /*
    //   if (this.disableDetecting) {
    //     this.disableDetecting();
    //   }
    //   */
    //   // sleep some autorun reaction
    // } else {
    //   // weekup some autorun reaction
    //   /*
    //   if (!this.disableDetecting) {
    //     this.setupDetecting();
    //   }
    //   */
    // }
  }

  setupContextMenu() {
    const doc = this.contentDocument!;
    doc.addEventListener('contextmenu', (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      const nodeInst = this.getNodeInstanceFromElement(targetElement);
      const editor = this.designer?.editor;
      if (!nodeInst) {
        editor?.eventBus.emit('designer.builtinSimulator.contextmenu', {
          originalEvent: e,
        });
        return;
      }
      const node = nodeInst.node || this.project.currentDocument?.focusNode;
      if (!node) {
        editor?.eventBus.emit('designer.builtinSimulator.contextmenu', {
          originalEvent: e,
        });
        return;
      }

      // dirty code should refector
      const npm = node?.componentMeta?.npm;
      const selected =
        [npm?.package, npm?.componentName].filter((item) => !!item).join('-') ||
        node?.componentMeta?.componentName ||
        '';
      editor?.eventBus.emit('designer.builtinSimulator.contextmenu', {
        selected,
        ...nodeInst,
        instanceRect: this.computeComponentInstanceRect(nodeInst.instance),
        originalEvent: e,
      });
    });
  }

  /**
   * @see ISimulator
   */
  generateComponentMetadata(componentName: string): IPublicTypeComponentMetadata {
    // if html tags
    if (isHTMLTag(componentName)) {
      return {
        componentName,
        // TODO: read builtins html metadata
      };
    }

    const component = this.getComponent(componentName);

    if (!component) {
      return {
        componentName,
      };
    }

    // TODO:
    // 1. generate builtin div/p/h1/h2
    // 2. read propTypes

    return {
      componentName,
      ...parseMetadata(component),
    };
  }

  /**
   * @see ISimulator
   */
  getComponent(componentName: string): Component | null {
    return this.renderer?.getComponent(componentName) || null;
  }

  createComponent(/** _schema: IPublicTypeComponentSchema */): Component | null {
    return null;
    // return this.renderer?.createComponent(schema) || null;
  }

  setInstance(docId: string, id: string, instances: IPublicTypeComponentInstance[] | null) {
    if (!hasOwnProperty(this.instancesMap, docId)) {
      this.instancesMap[docId] = new Map();
    }
    if (instances == null) {
      this.instancesMap[docId].delete(id);
    } else {
      this.instancesMap[docId].set(id, instances.slice());
    }
  }

  /**
   * @see ISimulator
   */
  getComponentInstances(node: INode, context?: IPublicTypeNodeInstance): IPublicTypeComponentInstance[] | null {
    const docId = node.document?.id;
    if (!docId) {
      return null;
    }

    const instances = this.instancesMap[docId]?.get(node.id) || null;
    if (!instances || !context) {
      return instances;
    }

    // filter with context
    return instances.filter((instance) => {
      return this.getClosestNodeInstance(instance, context?.nodeId)?.instance === context.instance;
    });
  }

  /**
   * @see ISimulator
   */
  getComponentContext(/* node: Node */): any {
    throw new Error('Method not implemented.');
  }

  /**
   * @see ISimulator
   */
  getClosestNodeInstance(
    from: IPublicTypeComponentInstance,
    specId?: string,
  ): IPublicTypeNodeInstance<IPublicTypeComponentInstance> | null {
    return this.renderer?.getClosestNodeInstance(from, specId) || null;
  }

  /**
   * @see ISimulator
   */
  computeRect(node: INode): IPublicTypeRect | null {
    const instances = this.getComponentInstances(node);
    if (!instances) {
      return null;
    }
    return this.computeComponentInstanceRect(instances[0], node.componentMeta.rootSelector);
  }

  /**
   * @see ISimulator
   */
  computeComponentInstanceRect(instance: IPublicTypeComponentInstance, selector?: string): IPublicTypeRect | null {
    const renderer = this.renderer!;
    const elements = this.findDOMNodes(instance, selector);
    if (!elements) {
      return null;
    }

    const elems = elements.slice();
    let rects: DOMRect[] | undefined;
    let last: { x: number; y: number; r: number; b: number } | undefined;
    let _computed = false;
    while (true) {
      if (!rects || rects.length < 1) {
        const elem = elems.pop();
        if (!elem) {
          break;
        }
        rects = renderer.getClientRects(elem);
      }
      const rect = rects.pop();
      if (!rect) {
        break;
      }
      if (rect.width === 0 && rect.height === 0) {
        continue;
      }
      if (!last) {
        last = {
          x: rect.left,
          y: rect.top,
          r: rect.right,
          b: rect.bottom,
        };
        continue;
      }
      if (rect.left < last.x) {
        last.x = rect.left;
        _computed = true;
      }
      if (rect.top < last.y) {
        last.y = rect.top;
        _computed = true;
      }
      if (rect.right > last.r) {
        last.r = rect.right;
        _computed = true;
      }
      if (rect.bottom > last.b) {
        last.b = rect.bottom;
        _computed = true;
      }
    }

    if (last) {
      const r: IPublicTypeRect = new DOMRect(last.x, last.y, last.r - last.x, last.b - last.y);
      r.elements = elements;
      r.computed = _computed;
      return r;
    }

    return null;
  }

  /**
   * @see ISimulator
   */
  findDOMNodes(instance: IPublicTypeComponentInstance, selector?: string): Array<Element | Text> | null {
    const elements = this._renderer?.findDOMNodes(instance);
    if (!elements) {
      return null;
    }

    if (selector) {
      const matched = getMatched(elements, selector);
      if (!matched) {
        return null;
      }
      return [matched];
    }
    return elements;
  }

  /**
   * Get node from DOM element; depends on simulator APIs
   */
  getNodeInstanceFromElement(target: Element | null): IPublicTypeNodeInstance<IPublicTypeComponentInstance, INode> | null {
    if (!target) {
      return null;
    }

    const nodeInstance = this.getClosestNodeInstance(target);
    if (!nodeInstance) {
      return null;
    }
    const { docId } = nodeInstance;
    const doc = this.project.getDocument(docId)!;
    const node = doc.getNode(nodeInstance.nodeId);
    return {
      ...nodeInstance,
      node,
    };
  }

  /**
   * @see ISimulator
   */
  /* istanbul ignore next */
  scrollToNode(node: Node, detail?: any /* , tryTimes = 0 */) {
    this.tryScrollAgain = null;
    if (this.sensing) {
      // active sensor
      return;
    }

    const opt: any = {};
    let scroll = false;

    const componentInstance = this.getComponentInstances(detail?.near?.node || node)?.[0];
    if (!componentInstance) return;
    const domNode = this.findDOMNodes(componentInstance)?.[0] as Element;
    if (!domNode) return;
    if (isElementNode(domNode) && !isDOMNodeVisible(domNode, this.viewport)) {
      const { left, top } = domNode.getBoundingClientRect();
      const { scrollTop = 0, scrollLeft = 0 } = this.contentDocument?.documentElement || {};
      opt.left = left + scrollLeft;
      opt.top = top + scrollTop;
      scroll = true;
    }

    if (scroll && this.scroller) {
      this.scroller.scrollTo(opt);
    }
  }

  // #region ========= drag and drop helpers =============
  /**
   * @see ISimulator
   */
  setNativeSelection(enableFlag: boolean) {
    this.renderer?.setNativeSelection(enableFlag);
  }

  /**
   * @see ISimulator
   */
  setDraggingState(state: boolean) {
    this.renderer?.setDraggingState(state);
  }

  /**
   * @see ISimulator
   */
  setCopyState(state: boolean) {
    this.renderer?.setCopyState(state);
  }

  /**
   * @see ISimulator
   */
  clearState() {
    this.renderer?.clearState();
  }

  /**
   * @see IPublicModelSensor
   */
  fixEvent(e: ILocateEvent): ILocateEvent {
    if (e.fixed) {
      return e;
    }

    const notMyEvent = e.originalEvent.view?.document !== this.contentDocument;
    // fix canvasX canvasY: active document canvas coordinates
    if (notMyEvent || !('canvasX' in e) || !('canvasY' in e)) {
      const l = this.viewport.toLocalPoint({
        clientX: e.globalX,
        clientY: e.globalY,
      });
      e.canvasX = l.clientX;
      e.canvasY = l.clientY;
    }

    // fix target: browser event target
    if (!e.target || notMyEvent) {
      if (!isNaN(e.canvasX!) && !isNaN(e.canvasY!)) {
        e.target = this.contentDocument?.elementFromPoint(e.canvasX!, e.canvasY!);
      }
    }

    // Event has been corrected
    e.fixed = true;
    return e;
  }

  /**
   * @see IPublicModelSensor
   */
  isEnter(e: ILocateEvent): boolean {
    const rect = this.viewport.bounds;
    return (
      e.globalY >= rect.top &&
      e.globalY <= rect.bottom &&
      e.globalX >= rect.left &&
      e.globalX <= rect.right
    );
  }

  /**
   * @see IPublicModelSensor
   */
  deactiveSensor() {
    this.sensing = false;
    this.scroller.cancel();
  }

  // ========= drag location logic: helper for locate ==========

  /**
   * @see IPublicModelSensor
   */
  locate(e: ILocateEvent): any {
    const { dragObject } = e;

    const nodes = dragObject?.nodes;

    const operationalNodes = nodes?.filter((node) => {
      const onMoveHook = node.componentMeta?.advanced.callbacks?.onMoveHook;
      const canMove = onMoveHook && typeof onMoveHook === 'function' ? onMoveHook(node.internalToShellNode()) : true;

      let parentContainerNode: INode | null = null;
      let parentNode = node.parent;

      while (parentNode) {
        if (parentNode.isContainer()) {
          parentContainerNode = parentNode;
          break;
        }

        parentNode = parentNode.parent;
      }

      const onChildMoveHook = parentContainerNode?.componentMeta?.advanced.callbacks?.onChildMoveHook;

      const childrenCanMove = onChildMoveHook && parentContainerNode && typeof onChildMoveHook === 'function' ? onChildMoveHook(node.internalToShellNode(), parentContainerNode.internalToShellNode()) : true;

      return canMove && childrenCanMove;
    });

    if (nodes && (!operationalNodes || operationalNodes.length === 0)) {
      return;
    }

    this.sensing = true;
    this.scroller.scrolling(e);
    const document = this.project.currentDocument;
    if (!document) {
      return null;
    }
    const dropContainer = this.getDropContainer(e);
    const lockedNode = getClosestNode(dropContainer?.container, (node) => node.isLocked);
    if (lockedNode) return null;
    if (
      !dropContainer
    ) {
      return null;
    }

    if (isLocationData(dropContainer)) {
      return this.designer.createLocation(dropContainer);
    }

    const { container, instance: containerInstance } = dropContainer;

    const edge = this.computeComponentInstanceRect(
      containerInstance,
      container.componentMeta.rootSelector,
    );

    if (!edge) {
      return null;
    }

    const { children } = container;

    const detail: IPublicTypeLocationChildrenDetail = {
      type: IPublicTypeLocationDetailType.Children,
      index: 0,
      edge,
    };

    const locationData = {
      target: container,
      detail,
      source: `simulator${document.id}`,
      event: e,
    };

    if (
      e.dragObject &&
      e.dragObject.nodes &&
      e.dragObject.nodes.length &&
      e.dragObject.nodes[0].componentMeta.isModal &&
      document.focusNode
    ) {
      return this.designer.createLocation({
        target: document.focusNode,
        detail,
        source: `simulator${document.id}`,
        event: e,
      });
    }

    if (!children || children.size < 1 || !edge) {
      return this.designer.createLocation(locationData);
    }

    let nearRect: IPublicTypeRect | null = null;
    let nearIndex: number = 0;
    let nearNode: INode | null = null;
    let nearDistance: number | null = null;
    let minTop: number | null = null;
    let maxBottom: number | null = null;

    for (let i = 0, l = children.size; i < l; i++) {
      const node = children.get(i)!;
      const index = i;
      const instances = this.getComponentInstances(node);
      const inst = instances
        ? instances.length > 1
          ? instances.find(
            (_inst) => this.getClosestNodeInstance(_inst, container.id)?.instance === containerInstance,
          )
          : instances[0]
        : null;
      const rect = inst
        ? this.computeComponentInstanceRect(inst, node.componentMeta.rootSelector)
        : null;

      if (!rect) {
        continue;
      }

      const distance = isPointInRect(e as any, rect) ? 0 : distanceToRect(e as any, rect);

      if (distance === 0) {
        nearDistance = distance;
        nearNode = node;
        nearIndex = index;
        nearRect = rect;
        break;
      }

      // Mark child as topmost
      if (minTop === null || rect.top < minTop) {
        minTop = rect.top;
      }
      // Mark child as bottommost
      if (maxBottom === null || rect.bottom > maxBottom) {
        maxBottom = rect.bottom;
      }

      if (nearDistance === null || distance < nearDistance) {
        nearDistance = distance;
        nearNode = node;
        nearIndex = index;
        nearRect = rect;
      }
    }

    detail.index = nearIndex;

    if (nearNode && nearRect) {
      const el = getRectTarget(nearRect);
      const inline = el ? isChildInline(el) : false;
      const row = el ? isRowContainer(el.parentElement!) : false;
      const vertical = inline || row;

      // TODO: fix type
      const near: {
        node: IPublicModelNode;
        pos: 'before' | 'after' | 'replace';
        rect?: IPublicTypeRect;
        align?: 'V' | 'H';
      } = {
        node: nearNode.internalToShellNode()!,
        pos: 'before',
        align: vertical ? 'V' : 'H',
      };
      detail.near = near;
      if (isNearAfter(e as any, nearRect, vertical)) {
        near.pos = 'after';
        detail.index = nearIndex + 1;
      }
      if (!row && nearDistance !== 0) {
        const edgeDistance = distanceToEdge(e as any, edge);
        if (edgeDistance.distance < nearDistance!) {
          const { nearAfter } = edgeDistance;
          if (minTop == null) {
            minTop = edge.top;
          }
          if (maxBottom == null) {
            maxBottom = edge.bottom;
          }
          near.rect = new DOMRect(edge.left, minTop, edge.width, maxBottom - minTop);
          near.align = 'H';
          near.pos = nearAfter ? 'after' : 'before';
          detail.index = nearAfter ? children.size : 0;
        }
      }
    }

    return this.designer.createLocation(locationData);
  }

  /**
   * Find a suitable drop container
   */
  getDropContainer(e: ILocateEvent): DropContainer | null {
    const { target, dragObject } = e;
    const isAny = isDragAnyObject(dragObject);
    const document = this.project.currentDocument!;
    const { currentRoot } = document;
    let container: INode | null;
    let nodeInstance: IPublicTypeNodeInstance<IPublicTypeComponentInstance, INode> | undefined;

    if (target) {
      const ref = this.getNodeInstanceFromElement(target);
      if (ref?.node) {
        nodeInstance = ref;
        container = ref.node;
      } else if (isAny) {
        return null;
      } else {
        container = currentRoot;
      }
    } else if (isAny) {
      return null;
    } else {
      container = currentRoot;
    }

    if (!container?.isParental()) {
      container = container?.parent || currentRoot;
    }

    // TODO: use spec container to accept specialData
    if (isAny) {
      // will return locationData
      return null;
    }

    // get common parent, avoid drop container contains by dragObject
    const drillDownExcludes = new Set<INode>();
    if (isDragNodeObject(dragObject)) {
      const { nodes } = dragObject;
      let i = nodes.length;
      let p: any = container;
      while (i-- > 0) {
        if (contains(nodes[i], p)) {
          p = nodes[i].parent;
        }
      }
      if (p !== container) {
        container = p || document.focusNode;
        container && drillDownExcludes.add(container);
      }
    }

    let instance: any;
    if (nodeInstance) {
      if (nodeInstance.node === container) {
        instance = nodeInstance.instance;
      } else {
        instance = this.getClosestNodeInstance(
          nodeInstance.instance as any,
          container?.id,
        )?.instance;
      }
    } else {
      instance = container && this.getComponentInstances(container)?.[0];
    }

    let dropContainer: DropContainer = {
      container: container as any,
      instance,
    };

    let res: any;
    let upward: DropContainer | null = null;
    while (container) {
      res = this.handleAccept(dropContainer, e);
      // if (isLocationData(res)) {
      //   return res;
      // }
      if (res === true) {
        return dropContainer;
      }
      if (!res) {
        drillDownExcludes.add(container);
        if (upward) {
          dropContainer = upward;
          container = dropContainer.container;
          upward = null;
        } else if (container.parent) {
          container = container.parent;
          instance = this.getClosestNodeInstance(dropContainer.instance, container.id)?.instance;
          dropContainer = {
            container,
            instance,
          };
        } else {
          return null;
        }
      }
    }
    return null;
  }

  isAcceptable(): boolean {
    return false;
  }

  /**
   * Control acceptance
   */
  handleAccept({ container }: DropContainer, e: ILocateEvent): boolean {
    const { dragObject } = e;
    const document = this.currentDocument!;
    const { focusNode } = document;
    if (isRootNode(container) || container.contains(focusNode)) {
      return document.checkNesting(focusNode!, dragObject as any);
    }

    const meta = (container as Node).componentMeta;

    // FIXME: get containerInstance for accept logic use
    const acceptable: boolean = this.isAcceptable(container);
    if (!meta.isContainer && !acceptable) {
      return false;
    }

    // check nesting
    return document.checkNesting(container, dragObject as any);
  }

  /**
   * Find nearby container
   */
  getNearByContainer(
    { container, instance }: DropContainer,
    drillDownExcludes: Set<INode>,
  ) {
    const { children } = container;
    if (!children || children.isEmpty()) {
      return null;
    }

    const nearBy: any = null;
    for (let i = 0, l = children.size; i < l; i++) {
      let child = children.get(i);

      if (!child) {
        continue;
      }
      if (child.conditionGroup) {
        const bn = child.conditionGroup;
        i = (bn.index || 0) + bn.length - 1;
        child = bn.visibleNode;
      }
      if (!child.isParental() || drillDownExcludes.has(child)) {
        continue;
      }
      // TODO:
      this.findDOMNodes(instance);
      this.getComponentInstances(child);
      const rect = this.computeRect(child);
      if (!rect) {
        continue;
      }
    }

    return nearBy;
  }
  // #endregion
}

function isHTMLTag(name: string) {
  return /^[a-z]\w*$/.test(name);
}

function isPointInRect(point: CanvasPoint, rect: IPublicTypeRect) {
  return (
    point.canvasY >= rect.top &&
    point.canvasY <= rect.bottom &&
    point.canvasX >= rect.left &&
    point.canvasX <= rect.right
  );
}

function distanceToRect(point: CanvasPoint, rect: IPublicTypeRect) {
  let minX = Math.min(Math.abs(point.canvasX - rect.left), Math.abs(point.canvasX - rect.right));
  let minY = Math.min(Math.abs(point.canvasY - rect.top), Math.abs(point.canvasY - rect.bottom));
  if (point.canvasX >= rect.left && point.canvasX <= rect.right) {
    minX = 0;
  }
  if (point.canvasY >= rect.top && point.canvasY <= rect.bottom) {
    minY = 0;
  }

  return Math.sqrt(minX ** 2 + minY ** 2);
}

function distanceToEdge(point: CanvasPoint, rect: IPublicTypeRect) {
  const distanceTop = Math.abs(point.canvasY - rect.top);
  const distanceBottom = Math.abs(point.canvasY - rect.bottom);

  return {
    distance: Math.min(distanceTop, distanceBottom),
    nearAfter: distanceBottom < distanceTop,
  };
}

function isNearAfter(point: CanvasPoint, rect: IPublicTypeRect, inline: boolean) {
  if (inline) {
    return (
      Math.abs(point.canvasX - rect.left) + Math.abs(point.canvasY - rect.top) >
      Math.abs(point.canvasX - rect.right) + Math.abs(point.canvasY - rect.bottom)
    );
  }
  return Math.abs(point.canvasY - rect.top) > Math.abs(point.canvasY - rect.bottom);
}

function getMatched(elements: Array<Element | Text>, selector: string): Element | null {
  let firstQueried: Element | null = null;
  for (const elem of elements) {
    if (isElement(elem)) {
      if (elem.matches(selector)) {
        return elem;
      }

      if (!firstQueried) {
        firstQueried = elem.querySelector(selector);
      }
    }
  }
  return firstQueried;
}
