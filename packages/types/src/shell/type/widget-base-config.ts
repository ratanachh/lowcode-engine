import { ReactElement, ComponentType } from 'react';
import { IPublicTypeI18nData, IPublicTypeIconType, IPublicTypeTitleContent, IPublicTypeWidgetConfigArea, TipContent } from './';

export type IPublicTypeHelpTipConfig = string | { url?: string; content?: string | ReactElement };

export interface IPublicTypePanelConfigProps extends IPublicTypePanelDockPanelProps {
  title?: IPublicTypeTitleContent;
  icon?: any; // Redundant field
  description?: string | IPublicTypeI18nData;
  help?: IPublicTypeHelpTipConfig; // Show question-mark help
  hiddenWhenInit?: boolean; //  when this is true, by default will be hidden
  condition?: (widget: any) => any;
  onInit?: (widget: any) => any;
  onDestroy?: () => any;
  shortcut?: string; // Only at specific positions can toggle show be triggered
  enableDrag?: boolean; // Whether to enable resizing width via drag
  keepVisibleWhileDragging?: boolean; // Whether to keep visible while dragging within this panel
}

export interface IPublicTypePanelConfig extends IPublicTypeWidgetBaseConfig {
  type: 'Panel';
  content?: string | ReactElement | ComponentType<any> | IPublicTypePanelConfig[]; // as children
  props?: IPublicTypePanelConfigProps;
}

export interface IPublicTypeWidgetBaseConfig {
  [extra: string]: any;
  type: string;
  name: string;

  /**
   * Dock area:
   * - When type is 'Panel', defaults to 'leftFloatArea';
   * - When type is 'Widget', defaults to 'mainArea';
   * - Otherwise defaults to 'leftArea';
   */
  area?: IPublicTypeWidgetConfigArea;
  props?: Record<string, any>;
  content?: string | ReactElement | ComponentType<any> | IPublicTypePanelConfig[];
  contentProps?: Record<string, any>;

  /**
   * Priority; smaller value means higher priority and appears first
   */
  index?: number;
}

export interface IPublicTypePanelDockConfig extends IPublicTypeWidgetBaseConfig {
  type: 'PanelDock';

  panelProps?: IPublicTypePanelDockPanelProps;

  props?: IPublicTypePanelDockProps;

  /** Panel name; used as title when props.title is absent */
  name: string;
}

export interface IPublicTypePanelDockProps {
  [key: string]: any;

  size?: 'small' | 'medium' | 'large';

  className?: string;

  /** Detailed description; tip content shown above the title on hover */
  description?: TipContent;

  onClick?: () => void;

  /**
   * Icon before the panel title
   */
  icon?: IPublicTypeIconType;

  /**
   * Panel title
   */
  title?: IPublicTypeTitleContent;
}

export interface IPublicTypePanelDockPanelProps {
  [key: string]: any;

  /** Whether to hide the panel top bar */
  hideTitleBar?: boolean;

  width?: number;

  height?: number;

  maxWidth?: number;

  maxHeight?: number;

  area?: IPublicTypeWidgetConfigArea;
}

export type IPublicTypeSkeletonConfig = IPublicTypePanelDockConfig | IPublicTypeWidgetBaseConfig;