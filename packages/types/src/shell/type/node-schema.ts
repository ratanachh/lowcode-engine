import { IPublicTypeCompositeValue, IPublicTypePropsMap, IPublicTypeNodeData } from './';

// Convert to JSX returned by a React Class render function in a .jsx file
/**
 * Builder base protocol - single component tree node description
 */
export interface IPublicTypeNodeSchema {

  id?: string;

  /**
   * Component name; required, capitalized
   */
  componentName: string;

  /**
   * Component props object
   */
  props?: {
    children?: IPublicTypeNodeData | IPublicTypeNodeData[];
  } & IPublicTypePropsMap; // | PropsList;

  /**
   * Render condition
   */
  condition?: IPublicTypeCompositeValue;

  /**
   * Loop data
   */
  loop?: IPublicTypeCompositeValue;

  /**
   * Loop iteration item and index names ["item", "index"]
   */
  loopArgs?: [string, string];

  /**
   * Child nodes
   */
  children?: IPublicTypeNodeData | IPublicTypeNodeData[];

  /**
   * Whether locked
   */
  isLocked?: boolean;

  // @todo
  // ------- future support -----
  conditionGroup?: string;
  title?: string;
  ignore?: boolean;
  locked?: boolean;
  hidden?: boolean;
  isTopFixed?: boolean;

  /** @experimental for internal editor use */
  __ctx?: any;
}
