import { IPublicEnumContextMenuType } from '../enum';
import { IPublicModelNode } from '../model';
import { IPublicTypeI18nData } from './i8n-data';
import { IPublicTypeHelpTipConfig } from './widget-base-config';

export interface IPublicTypeContextMenuItem extends Omit<IPublicTypeContextMenuAction, 'condition' | 'disabled' | 'items'> {
  disabled?: boolean;

  items?: Omit<IPublicTypeContextMenuItem, 'items'>[];
}

export interface IPublicTypeContextMenuAction {

  /**
   * Unique action identifier
   * Unique identifier for the action
   */
  name: string;

  /**
   * Display title; may be a string or i18n data
   * Display title, can be a string or internationalized data
   */
  title?: string | IPublicTypeI18nData;

  /**
   * Menu item type
   * Menu item type
   * @see IPublicEnumContextMenuType
   * @default IPublicEnumContextMenuType.MENU_ITEM
   */
  type?: IPublicEnumContextMenuType;

  /**
   * Action on click (optional)
   * Action to execute on click, optional
   */
  action?: (nodes?: IPublicModelNode[], event?: MouseEvent) => void;

  /**
   * Submenu items or a function that produces children (optional); only two levels supported
   * Sub-menu items or function to generate child node, optional
   */
  items?: Omit<IPublicTypeContextMenuAction, 'items'>[] | ((nodes?: IPublicModelNode[]) => Omit<IPublicTypeContextMenuAction, 'items'>[]);

  /**
   * Visibility condition function
   * Function to determine display condition
   */
  condition?: (nodes?: IPublicModelNode[]) => boolean;

  /**
   * Disable condition function (optional)
   * Function to determine disabled condition, optional
   */
  disabled?: (nodes?: IPublicModelNode[]) => boolean;

  /**
   * Help tip (optional)
   */
  help?: IPublicTypeHelpTipConfig;
}

