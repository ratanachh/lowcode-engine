import { MouseEvent } from 'react';
import { IPublicTypePropType, IPublicTypeComponentAction } from './';
import { IPublicModelNode, IPublicModelSettingField } from '../model';

/**
 * Nesting control function
 */
export type IPublicTypeNestingFilter = (testNode: any, currentNode: any) => boolean;

/**
 * Nesting control
 * Prevent invalid nesting, e.g. a nesting a, FormField only under Form, Column only under Table
 */
export interface IPublicTypeNestingRule {

  /**
   * Children whitelist
   */
  childWhitelist?: string[] | string | RegExp | IPublicTypeNestingFilter;

  /**
   * Parent whitelist
   */
  parentWhitelist?: string[] | string | RegExp | IPublicTypeNestingFilter;

  /**
   * Descendant whitelist
   */
  descendantWhitelist?: string[] | string | RegExp | IPublicTypeNestingFilter;

  /**
   * Descendant blacklist
   */
  descendantBlacklist?: string[] | string | RegExp | IPublicTypeNestingFilter;

  /**
   * Ancestor whitelist; can be used for region highlighting
   */
  ancestorWhitelist?: string[] | string | RegExp | IPublicTypeNestingFilter;
}

/**
 * Component capability configuration
 */
export interface IPublicTypeComponentConfigure {

  /**
   * Whether this is a container component
   */
  isContainer?: boolean;

  /**
   * Whether the component has an overlay; overlays can block the canvas when dragged in, so helper interactions should prevent blocking
   */
  isModal?: boolean;

  /**
   * Whether a render root node exists
   */
  isNullNode?: boolean;

  /**
   * Component tree description
   */
  descriptor?: string;

  /**
   * Nesting control: prevent invalid node nesting
   * e.g. a nesting a, FormField only under Form, Column only under Table
   */
  nestingRule?: IPublicTypeNestingRule;

  /**
   * Whether this is a minimal render unit
   * Under a minimal render unit, render/update starts from the unit root. With nested units, rendering starts from the outermost one.
   */
  isMinimalRenderUnit?: boolean;

  /**
   * cssSelector for the component selection box
   */
  rootSelector?: string;

  /**
   * Disabled behaviors; may be 'copy', 'move', 'remove', or an array of them
   */
  disableBehaviors?: string[] | string;

  /**
   * Detailed configuration for the operations above
   */
  actions?: IPublicTypeComponentAction[];
}

export interface IPublicTypeInitialItem {
  name: string;
  initial: (target: IPublicModelSettingField, currentValue: any) => any;
}
export interface IPublicTypeFilterItem {
  name: string;
  filter: (target: IPublicModelSettingField | null, currentValue: any) => any;
}
export interface IPublicTypeAutorunItem {
  name: string;
  autorun: (target: IPublicModelSettingField | null) => any;
}

// thinkof Array
/**
 * Configurable options for Live Text Editing (double-click edit when children are plain text)
 */
export interface IPublicTypeLiveTextEditingConfig {

  /**
   * @todo documentation pending
   */
  propTarget: string;

  /**
   * @todo documentation pending
   */
  selector?: string;

  /**
   * Edit mode: plain text | paragraph | article (default plain text, no floating toolbar)
   * @default 'plaintext'
   */
  mode?: 'plaintext' | 'paragraph' | 'article';

  /**
   * Read content from contentEditable and set it on the prop
   */
  onSaveContent?: (content: string, prop: any) => any;
}

export type ConfigureSupportEvent = string | ConfigureSupportEventConfig;

export interface ConfigureSupportEventConfig {
  name: string;
  propType?: IPublicTypePropType;
  description?: string;
  template?: string;
}

/**
 * Common extension panel support configuration
 */
export interface ConfigureSupport {

  /**
   * Supported event list
   */
  events?: ConfigureSupportEvent[];

  /**
   * Support className setting
   */
  className?: boolean;

  /**
   * Support style setting
   */
  style?: boolean;

  /**
   * Support lifecycle setting
   */
  lifecycles?: any[];

  // general?: boolean;
  /**
   * Support loop setting
   */
  loop?: boolean;

  /**
   * Support conditional render setting
   */
  condition?: boolean;
}

/**
 * handleResizing
 */

/**
 * Configure callbacks to capture engine events such as onNodeAdd, onResize, etc.
 */
export interface IPublicTypeCallbacks {
  // hooks
  onMouseDownHook?: (e: MouseEvent, currentNode: IPublicModelNode | null) => any;
  onDblClickHook?: (e: MouseEvent, currentNode: IPublicModelNode | null) => any;
  onClickHook?: (e: MouseEvent, currentNode: IPublicModelNode | null) => any;
  // onLocateHook?: (e: any, currentNode: any) => any;
  // onAcceptHook?: (currentNode: any, locationData: any) => any;
  onMoveHook?: (currentNode: IPublicModelNode) => boolean;
  // thinkof: restrictive dragging
  onHoverHook?: (currentNode: IPublicModelNode) => boolean;

  /** Selection hook; return false to prevent the component from being selected */
  onSelectHook?: (currentNode: IPublicModelNode) => boolean;
  onChildMoveHook?: (childNode: IPublicModelNode, currentNode: IPublicModelNode) => boolean;

  // events
  onNodeRemove?: (removedNode: IPublicModelNode | null, currentNode: IPublicModelNode | null) => void;
  onNodeAdd?: (addedNode: IPublicModelNode | null, currentNode: IPublicModelNode | null) => void;
  onSubtreeModified?: (currentNode: IPublicModelNode, options: any) => void;
  onResize?: (
    e: MouseEvent & {
      trigger: string;
      deltaX?: number;
      deltaY?: number;
    },
    currentNode: any,
  ) => void;
  onResizeStart?: (
    e: MouseEvent & {
      trigger: string;
      deltaX?: number;
      deltaY?: number;
    },
    currentNode: any,
  ) => void;
  onResizeEnd?: (
    e: MouseEvent & {
      trigger: string;
      deltaX?: number;
      deltaY?: number;
    },
    currentNode: IPublicModelNode,
  ) => void;
}
