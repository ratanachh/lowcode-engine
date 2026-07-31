import { ComponentType, ReactElement } from 'react';
import { IPublicTypeNodeData, IPublicTypeSnippet, IPublicTypeInitialItem, IPublicTypeFilterItem, IPublicTypeAutorunItem, IPublicTypeCallbacks, IPublicTypeLiveTextEditingConfig } from './';
import { IPublicModelNode } from '../model';

/**
 * Advanced feature configuration
 */
export interface IPublicTypeAdvanced {

  /**
   * Configure callbacks to capture engine events such as onNodeAdd, onResize, etc.
   * callbacks/hooks which can be used to do
   * things on some special ocations like onNodeAdd or onResize
   */
  callbacks?: IPublicTypeCallbacks;

  /**
   * When dropped into a container, automatically bring in the children list
   */
  initialChildren?: IPublicTypeNodeData[] | ((target: IPublicModelNode) => IPublicTypeNodeData[]);

  /**
   * Style and position; handles must have clear markers for event routing, or enable exclusive event mode
   * NWSE lets the engine compute placement; ReactElement must control its own initial position
   *
   * Configure style and content of the component resize tools in the designer
   * - Highlight handle on hover
   * - Request exclusive mode on mousedown
   * - On dragstart, request generic resizing control and HUD display
   * - On drag, compute and apply effects, update handle positions
   */
  getResizingHandlers?: (
    currentNode: any
  ) => (Array<{
    type: 'N' | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SE' | 'SW';
    content?: ReactElement;
    propTarget?: string;
    appearOn?: 'mouse-enter' | 'mouse-hover' | 'selected' | 'always';
  }> |
    ReactElement[]);

  /**
   * @deprecated Dynamically initialize prop values of components dragged into the designer
   */
  initials?: IPublicTypeInitialItem[];

  /**
   * @deprecated Use the snippets field on component metadata instead
   */
  snippets?: IPublicTypeSnippet[];

  /**
   * Whether this is an absolute-layout container; not yet in the protocol
   * @experimental not in spec yet
   */
  isAbsoluteLayoutContainer?: boolean;

  /**
   * hide bem tools when selected
   * @experimental not in spec yet
   */
  hideSelectTools?: boolean;

  /**
   * Live Text Editing: if children are plain text, support double-click to edit
   * @experimental not in spec yet
   */
  liveTextEditing?: IPublicTypeLiveTextEditingConfig[];

  /**
   * TODO: add documentation
   * @experimental not in spec yet
   */
  view?: ComponentType<any>;

  /**
   * @legacy capability for vision
   * @deprecated
   */
  isTopFixed?: boolean;

  /**
   * TODO: add documentation or remove
   * @deprecated not used anywhere, dont know what is it for
   */
  context?: { [contextInfoName: string]: any };

  /**
   * @legacy capability for vision
   * @deprecated
   */
  filters?: IPublicTypeFilterItem[];

  /**
   * @legacy capability for vision
   * @deprecated
   */
  autoruns?: IPublicTypeAutorunItem[];

  /**
   * @legacy capability for vision
   * @deprecated
   */
  transducers?: any;
}
