import { IPublicModelNode } from '../model';
import { IPublicTypeIconType, TipContent } from './';

/**
 * Action description
 */
export interface IPublicTypeActionContentObject {

  /**
   * Icon
   */
  icon?: IPublicTypeIconType;

  /**
   * Description
   */
  title?: TipContent;

  /**
   * Execute action
   */
  action?: (currentNode: IPublicModelNode) => void;
}
