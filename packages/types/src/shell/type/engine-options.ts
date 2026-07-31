import { RequestHandlersMap } from '@rchh/lowcode-datasource-types';
import { ComponentType } from 'react';

export interface IPublicTypeEngineOptions {

  /**
   * Whether to enable condition capability; by default the designer shows nodes regardless of condition
   * when this is true, node that configured as conditional not renderring
   * will not display in canvas.
   * @default false
   */
  enableCondition?: boolean;

  /**
   * TODO: designMode cannot be mapped to the document render module
   *
   * Design mode; live mode shows variable values in real time. Default: 'design'
   *
   * @default 'design'
   * @experimental
   */
  designMode?: 'design' | 'live';

  /**
   * Device type. Default: 'default'
   * @default 'default'
   */
  device?: 'default' | 'mobile' | string;

  /**
   * Initial deviceClassName mounted on the canvas top-level node
   */
  deviceClassName?: string;

  /**
   * Locale. Default: 'zh-CN'
   * @default 'zh-CN'
   */
  locale?: string;

  /**
   * Renderer type. Default: 'react'
   */
  renderEnv?: 'react' | string;

  /**
   * Device type mapper between designer and renderer
   */
  deviceMapper?: {
    transform: (originalDevice: string) => string;
  };

  /**
   * Enable strict plugin mode. Default: STRICT_PLUGIN_MODE_DEFAULT. In strict mode plugins cannot pass custom options via engineOptions
   * enable strict plugin mode, default value: false
   * under strict mode, customed engineOption is not accepted.
   */
  enableStrictPluginMode?: boolean;

  /**
   * Whether the drop target container shows visual feedback while dragging. Default: false
   */
  enableReactiveContainer?: boolean;

  /**
   * Disable canvas auto-render; useful when assets load asynchronously in multiple batches. Default: false
   */
  disableAutoRender?: boolean;

  /**
   * Disable dashed-line feedback while dragging (for performance). Default: false
   */
  disableDetecting?: boolean;

  /**
   * Custom selectors whose clicks are ignored on the canvas. Default: undefined
   */
  customizeIgnoreSelectors?: (defaultIgnoreSelectors: string[], e: MouseEvent) => string[];

  /**
   * Disable the default settings panel. Default: false
   */
  disableDefaultSettingPanel?: boolean;

  /**
   * Disable default setters. Default: false
   */
  disableDefaultSetters?: boolean;

  /**
   * Enable canvas lock operations. Default: false
   */
  enableCanvasLock?: boolean;

  /**
   * Whether a locked container can still set props; only effective when canvas lock is on. Default: false
   */
  enableLockedNodeSetting?: boolean;

  /**
   * Stay on the same settings tab when selection changes. Default: false
   */
  stayOnTheSameSettingTab?: boolean;

  /**
   * Hide settings tabs when there is only one item. Default: false
   */
  hideSettingsTabsWhenOnlyOneItem?: boolean;

  /**
   * Custom loading component
   */
  loadingComponent?: ComponentType;

  /**
   * Allow variable binding for all props. Default: false
   */
  supportVariableGlobally?: boolean;

  /**
   * Simulator-related URLs. Default: undefined
   */
  simulatorUrl?: string[];

  /**
   * Vision-polyfill settings
   * @deprecated this exists for some legacy reasons
   */
  visionSettings?: {
    // Whether to disable the fallback reducer. Default: false
    disableCompatibleReducer?: boolean;
    // Whether to enable the filter reducer during render. Default: false
    enableFilterReducerInRenderStage?: boolean;
  };

  /**
   * Same as react-renderer appHelper: https://lowcode-engine.cn/site/docs/guide/expand/runtime/renderer#apphelper
   */
  appHelper?: {

    /** Global utility functions */
    utils?: Record<string, any>;

    /** Global constants */
    constants?: Record<string, any>;
  };

  /**
   * Request handler map for the data source engine
   */
  requestHandlersMap?: RequestHandlersMap;

  /**
   * @default true
   * Whether JSExpression only supports accessing context via this; set false to keep compatibility with 'state.xxx'
   */
  thisRequiredInJSE?: boolean;

  /**
   * @default false
   * When component-not-found strict mode is on, the renderer will not fall back to a default container
   */
  enableStrictNotFoundMode?: boolean;

  /**
   * Configure a specified node as the root component
   */
  focusNodeSelector?: (rootNode: Node) => Node;

  /**
   * Enable application-level design mode
   */
  enableWorkspaceMode?: boolean;

  /**
   * @default true
   * In application-level design mode, automatically open the first window
   */
  enableAutoOpenFirstWindow?: boolean;

  /**
   * @default false
   * Enable context menu capability
   */
  enableContextMenu?: boolean;

  /**
   * @default false
   * Hide the designer helper layer
   */
  hideComponentAction?: boolean;
}

/**
 * @deprecated use IPublicTypeEngineOptions instead
 */
export interface EngineOptions {

}