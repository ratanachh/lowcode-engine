import { ComponentType } from 'react';
import { IPublicTypeComponentMetadata, IPublicTypeNodeSchema, IPublicTypeScrollable, IPublicTypeComponentInstance, IPublicModelSensor, IPublicTypeNodeInstance, IPublicTypePackage } from '@rchh/lowcode-types';
import { Point, ScrollTarget, ILocateEvent, IDesigner } from './designer';
import { BuiltinSimulatorRenderer } from './builtin-simulator/renderer';
import { INode } from './document';
import { IProject } from './project';

export type AutoFit = '100%';
// eslint-disable-next-line no-redeclare
export const AutoFit = '100%';

export interface IScrollable extends IPublicTypeScrollable {
}
export interface IViewport extends IScrollable {

  /**
   * Viewport size
   */
  width: number;
  height: number;

  /**
   * Content size
   */
  contentWidth: number | AutoFit;
  contentHeight: number | AutoFit;

  /**
   * Content scale
   */
  scale: number;

  /**
   * Viewport rect bounds
   */
  readonly bounds: DOMRect;

  /**
   * Content rect bounds
   */
  readonly contentBounds: DOMRect;

  /**
   * Viewport scroll object
   */
  readonly scrollTarget?: ScrollTarget;

  /**
   * Whether scrolling
   */
  readonly scrolling: boolean;

  /**
   * Content current scroll X
   */
  readonly scrollX: number;

  /**
   * Content current scroll Y
   */
  readonly scrollY: number;

  /**
   * Convert global coordinates to local
   */
  toLocalPoint(point: Point): Point;

  /**
   * Convert local coordinates to global
   */
  toGlobalPoint(point: Point): Point;
}

export interface DropContainer {
  container: INode;
  instance: IPublicTypeComponentInstance;
}

/**
 * Simulator control process protocol
 */
export interface ISimulatorHost<P = object> extends IPublicModelSensor<INode> {
  readonly isSimulator: true;

  /**
   * Get boundary dimensions and related info
   */
  readonly viewport: IViewport;
  readonly contentWindow?: Window;
  readonly contentDocument?: Document;
  readonly renderer?: BuiltinSimulatorRenderer;

  readonly project: IProject;

  readonly designer: IDesigner;

  // dependsAsset // like react jQuery lodash
  // themesAsset
  // componentsAsset
  // simulatorUrl //
  // Simulate utils, dataSource, constants
  //
  // later:
  // layout: ComponentName
  // Get block code via components; may be async
  // Set simulator Props
  setProps(props: P): void;
  // Set a single Prop
  set(key: string, value: any): void;

  setSuspense(suspensed: boolean): void;

  // #region ========= drag and drop helpers =============

  /**
   * Enable text drag-select
   */
  setNativeSelection(enableFlag: boolean): void;

  /**
   * Set dragging state
   */
  setDraggingState(state: boolean): void;

  /**
   * Set copying state
   */
  setCopyState(state: boolean): void;

  /**
   * Clear all states: dragging and copying
   */
  clearState(): void;

  // #endregion

  /**
   * Scroll viewport to node
   */
  scrollToNode(node: INode, detail?: any): void;

  /**
   * Describe component
   */
  generateComponentMetadata(componentName: string): IPublicTypeComponentMetadata;

  /**
   * Get component class from component info
   */
  getComponent(componentName: string): Component | any;

  /**
   * Get component instance for a node
   */
  getComponentInstances(node: INode): IPublicTypeComponentInstance[] | null;

  /**
   * Create component class from schema
   */
  createComponent(schema: IPublicTypeNodeSchema): Component | null;

  /**
   * Get component runtime context for a node
   */
  getComponentContext(node: INode): object | null;

  getClosestNodeInstance(from: IPublicTypeComponentInstance, specId?: string): IPublicTypeNodeInstance | null;

  computeRect(node: INode): DOMRect | null;

  computeComponentInstanceRect(instance: IPublicTypeComponentInstance, selector?: string): DOMRect | null;

  findDOMNodes(instance: IPublicTypeComponentInstance, selector?: string): Array<Element | Text> | null;

  getDropContainer(e: ILocateEvent): DropContainer | null;

  postEvent(evtName: string, evtData: any): void;

  rerender(): void;

  /**
   * Destroy
   */
  purge(): void;

  setupComponents(library: IPublicTypePackage[]): Promise<void>;
}

export function isSimulatorHost(obj: any): obj is ISimulatorHost {
  return obj && obj.isSimulator;
}

/**
 * Component class definition
 */
export type Component = ComponentType<any> | object;

export interface INodeSelector {
  node: INode;
  instance?: IPublicTypeComponentInstance;
}
