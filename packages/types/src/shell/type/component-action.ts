import { ReactNode } from 'react';
import { IPublicTypeActionContentObject } from './';

/**
 * @todo toolbar action
 */

export interface IPublicTypeComponentAction {

  /**
   * behaviorName
   */
  name: string;

  /**
   * Menu name
   */
  content: string | ReactNode | IPublicTypeActionContentObject;

  /**
   * Children
   */
  items?: IPublicTypeComponentAction[];

  /**
   * Whether to show
   * always: cannot be disabled
   */
  condition?: boolean | ((currentNode: any) => boolean) | 'always';

  /**
   * Show on the toolbar
   */
  important?: boolean;
}
