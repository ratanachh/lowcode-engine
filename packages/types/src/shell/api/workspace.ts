import { IPublicModelWindow } from '../model';
import { IPublicApiPlugins, IPublicApiSkeleton, IPublicModelResource, IPublicResourceList, IPublicTypeDisposable, IPublicTypeResourceType } from '@rchh/lowcode-types';

export interface IPublicApiWorkspace<
  Plugins = IPublicApiPlugins,
  Skeleton = IPublicApiSkeleton,
  ModelWindow = IPublicModelWindow,
  Resource = IPublicModelResource,
> {

  /** Whether workspace mode is enabled */
  isActive: boolean;

  /** Current designer window */
  window: ModelWindow | null;

  plugins: Plugins;

  skeleton: Skeleton;

  /** Current designer editor window */
  windows: ModelWindow[];

  /** Get the resource tree list */
  get resourceList(): IPublicModelResource[];

  /** Set the resource tree list */
  setResourceList(resourceList: IPublicResourceList): void;

  /** Resource tree list update event */
  onResourceListChange(fn: (resourceList: IPublicResourceList) => void): IPublicTypeDisposable;

  /** Register a resource */
  registerResourceType(resourceTypeModel: IPublicTypeResourceType): void;

  /**
   * Open a view window
   * @deprecated
   */
  openEditorWindow(resourceName: string, id: string, extra: Object, viewName?: string, sleep?: boolean): Promise<void>;

  /** Open a view window */
  openEditorWindow(resource: Resource, sleep?: boolean): Promise<void>;

  /** Open a window by view id */
  openEditorWindowById(id: string): void;

  /**
   * Remove a view window
   * @deprecated
   */
  removeEditorWindow(resourceName: string, id: string): void;

  /**
   * Remove a view window
   */
  removeEditorWindow(resource: Resource): void;

  /** Remove a window by view id */
  removeEditorWindowById(id: string): void;

  /** Window added/removed event */
  onChangeWindows(fn: () => void): IPublicTypeDisposable;

  /** Active window change event */
  onChangeActiveWindow(fn: () => void): IPublicTypeDisposable;

  /**
   * Active view change event
   * @since v1.1.7
   */
  onChangeActiveEditorView(fn: () => void): IPublicTypeDisposable;

  /**
   * All views under the window are renderer-ready event
   * @since v1.1.7
   */
  onWindowRendererReady(fn: () => void): IPublicTypeDisposable;
}