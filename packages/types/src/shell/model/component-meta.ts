import { IPublicTypeNodeSchema, IPublicTypeNodeData, IPublicTypeIconType, IPublicTypeTransformedComponentMetadata, IPublicTypeI18nData, IPublicTypeNpmInfo, IPublicTypeAdvanced, IPublicTypeFieldConfig, IPublicTypeComponentAction } from '../type';
import { ReactElement } from 'react';
import { IPublicModelNode } from './node';

export interface IPublicModelComponentMeta<
  Node = IPublicModelNode
> {

  /**
   * Component name
   * component name
   */
  get componentName(): string;

  /**
   * Whether this is a container component
   * is container node or not
   */
  get isContainer(): boolean;

  /**
   * Whether this is a minimal render unit.
   * When the component needs to re-render:
   *  If it is a minimal render unit, only the current component is rendered;
   *  Otherwise, find the nearest ancestor minimal render unit and re-render from there up to the root.
   *
   * check if this is a mininal render unit.
   * when a rerender is needed for a component:
   *  case 'it`s a mininal render unit':  only render itself.
   *  case 'it`s not a mininal render unit': find a mininal render unit to render in
   *  its ancesters until root node is reached.
   */
  get isMinimalRenderUnit(): boolean;

  /**
   * Whether this is a modal component
   * check if this is a modal component or not.
   */
  get isModal(): boolean;

  /**
   * Get configuration used by the settings panel display
   * get configs for Settings Panel
   */
  get configure(): IPublicTypeFieldConfig[];

  /**
   * Title
   * title for this component
   */
  get title(): string | IPublicTypeI18nData | ReactElement;

  /**
   * Icon
   * icon config for this component
   */
  get icon(): IPublicTypeIconType;

  /**
   * Component npm info
   * npm informations
   */
  get npm(): IPublicTypeNpmInfo;

  /**
   * Available actions for the current component
   * available actions
   */
  get availableActions(): IPublicTypeComponentAction[];

  /**
   * Advanced configuration section in component metadata
   * configure.advanced
   * @since v1.1.0
   */
  get advanced(): IPublicTypeAdvanced;

  /**
   * Set npm info
   * set method for npm inforamtion
   * @param npm
   */
  setNpm(npm: IPublicTypeNpmInfo): void;

  /**
   * Get metadata
   * get component metadata
   */
  getMetadata(): IPublicTypeTransformedComponentMetadata;

  /**
   * Check whether the current node can be placed under the parent
   * check if the current node could be placed in parent node
   * @param my current node
   * @param parent parent node
   */
  checkNestingUp(my: Node | IPublicTypeNodeData, parent: any): boolean;

  /**
   * Check whether the target node can be placed under the parent
   * check if the target node(s) could be placed in current node
   * @param my current node
   * @param parent parent node
   */
  checkNestingDown(
      my: Node | IPublicTypeNodeData,
      target: IPublicTypeNodeSchema | Node | IPublicTypeNodeSchema[],
    ): boolean;

  /**
   * Refresh metadata; triggers re-parse and refresh of metadata
   * refresh metadata
   */
  refreshMetadata(): void;
}
