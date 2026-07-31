import { get as lodashGet } from 'lodash';
import { isPlainObject } from '@rchh/lowcode-utils';
import {
  IPublicTypeEngineOptions,
  IPublicModelEngineConfig,
  IPublicModelPreference,
} from '@rchh/lowcode-types';
import { getLogger } from './utils/logger';
import Preference from './utils/preference';

const logger = getLogger({ level: 'log', bizName: 'config' });

// this default behavior will be different later
const STRICT_PLUGIN_MODE_DEFAULT = true;

// used in strict mode, when only options in this VALID_ENGINE_OPTIONS can be accepted
// type and description are only used for developer`s assistance, won`t affect runtime
const VALID_ENGINE_OPTIONS = {
  enableCondition: {
    type: 'boolean',
    description: 'Enable condition capability; by default designer shows nodes regardless of condition',
  },
  designMode: {
    type: 'string',
    enum: ['design', 'live'],
    default: 'design',
    description: 'Design mode; live mode shows variable values in real time',
  },
  device: {
    type: 'string',
    enum: ['default', 'mobile', 'any string value'],
    default: 'default',
    description: 'Device type',
  },
  deviceClassName: {
    type: 'string',
    default: undefined,
    description: 'Initial deviceClassName mounted on the canvas top-level node',
  },
  locale: {
    type: 'string',
    default: 'zh-CN',
    description: 'Locale / language',
  },
  renderEnv: {
    type: 'string',
    enum: ['react', 'any string value'],
    default: 'react',
    description: 'Renderer type',
  },
  deviceMapper: {
    type: 'object',
    description: 'Device type mapper between designer and renderer',
  },
  enableStrictPluginMode: {
    type: 'boolean',
    default: STRICT_PLUGIN_MODE_DEFAULT,
    description: 'Enable strict plugin mode (default: STRICT_PLUGIN_MODE_DEFAULT); plugins cannot pass custom options via engineOptions',
  },
  enableReactiveContainer: {
    type: 'boolean',
    default: false,
    description: 'Show visual feedback on the container about to receive a dropped component',
  },
  disableAutoRender: {
    type: 'boolean',
    default: false,
    description: 'Disable canvas auto-render; useful when assets load asynchronously in multiple batches',
  },
  disableDetecting: {
    type: 'boolean',
    default: false,
    description: 'Disable dashed-line feedback while dragging, for performance',
  },
  customizeIgnoreSelectors: {
    type: 'function',
    default: undefined,
    description: 'Customize canvas click-ignore selectors, eg. (defaultIgnoreSelectors: string[], e: MouseEvent) => string[]',
  },
  disableDefaultSettingPanel: {
    type: 'boolean',
    default: false,
    description: 'Disable the default settings panel',
  },
  disableDefaultSetters: {
    type: 'boolean',
    default: false,
    description: 'Disable default setters',
  },
  enableCanvasLock: {
    type: 'boolean',
    default: false,
    description: 'Enable canvas lock operations',
  },
  enableLockedNodeSetting: {
    type: 'boolean',
    default: false,
    description: 'Whether a locked container can still have props set; only when canvas lock is enabled',
  },
  stayOnTheSameSettingTab: {
    type: 'boolean',
    default: false,
    description: 'Stay on the same settings tab when selected node changes',
  },
  hideSettingsTabsWhenOnlyOneItem: {
    type: 'boolean',
    description: 'Hide settings tabs when there is only one item',
  },
  loadingComponent: {
    type: 'ComponentType',
    default: undefined,
    description: 'Custom loading component',
  },
  supportVariableGlobally: {
    type: 'boolean',
    default: false,
    description: 'Enable variable binding for all props',
  },
  visionSettings: {
    type: 'object',
    description: 'Vision-polyfill settings',
  },
  simulatorUrl: {
    type: 'array',
    description: 'Custom simulatorUrl',
  },
  // Aligned with react-renderer appHelper: https://lowcode-engine.cn/site/docs/guide/expand/runtime/renderer#apphelper
  appHelper: {
    type: 'object',
    description: 'Define utils, constants, and related objects',
  },
  requestHandlersMap: {
    type: 'object',
    description: 'Data-source engine request handler map',
  },
  thisRequiredInJSE: {
    type: 'boolean',
    description: 'Whether JSExpression may only access context via this',
  },
  enableStrictNotFoundMode: {
    type: 'boolean',
    description: 'In strict component-not-found mode, renderer will not fall back to a container component',
  },
  focusNodeSelector: {
    type: 'function',
    description: 'Configure a specified node as the root component',
  },
  enableAutoOpenFirstWindow: {
    type: 'boolean',
    description: 'In app-level design mode, auto-open the first window',
    default: true,
  },
  enableWorkspaceMode: {
    type: 'boolean',
    description: 'Enable app-level design mode',
    default: false,
  },
  workspaceEmptyComponent: {
    type: 'function',
    description: 'Placeholder component when windows are empty in app-level design mode',
  },
  enableContextMenu: {
    type: 'boolean',
    description: 'Enable context menu',
    default: false,
  },
  hideComponentAction: {
    type: 'boolean',
    description: 'Hide designer assist layer',
    default: false,
  },
};

const getStrictModeValue = (engineOptions: IPublicTypeEngineOptions, defaultValue: boolean): boolean => {
  if (!engineOptions || !isPlainObject(engineOptions)) {
    return defaultValue;
  }
  if (engineOptions.enableStrictPluginMode === undefined
    || engineOptions.enableStrictPluginMode === null) {
    return defaultValue;
  }
  return engineOptions.enableStrictPluginMode;
};

export interface IEngineConfig extends IPublicModelEngineConfig {

  /**
   * if engineOptions.strictPluginMode === true, only accept propertied predefined in EngineOptions.
   *
   * @param {IPublicTypeEngineOptions} engineOptions
   */
  setEngineOptions(engineOptions: IPublicTypeEngineOptions): void;

  notifyGot(key: string): void;

  setWait(key: string, resolve: (data: any) => void, once?: boolean): void;

  delWait(key: string, fn: any): void;
}

export class EngineConfig implements IEngineConfig {
  private config: { [key: string]: any } = {};

  private waits = new Map<
  string,
  Array<{
    once?: boolean;
    resolve: (data: any) => void;
  }>
  >();

  /**
   * used to store preferences
   *
   */
  readonly preference: IPublicModelPreference;

  constructor(config?: { [key: string]: any }) {
    this.config = config || {};
    this.preference = new Preference();
  }

  /**
   * Check whether the given key has a value
   * @param key
   */
  has(key: string): boolean {
    return this.config[key] !== undefined;
  }

  /**
   * Get the value for the given key
   * @param key
   * @param defaultValue
   */
  get(key: string, defaultValue?: any): any {
    return lodashGet(this.config, key, defaultValue);
  }

  /**
   * Set the value for the given key
   * @param key
   * @param value
   */
  set(key: string, value: any) {
    this.config[key] = value;
    this.notifyGot(key);
  }

  /**
   * Batch set; object form of set
   * @param config
   */
  setConfig(config: { [key: string]: any }) {
    if (config) {
      Object.keys(config).forEach((key) => {
        this.set(key, config[key]);
      });
    }
  }

  /**
   * if engineOptions.strictPluginMode === true, only accept propertied predefined in EngineOptions.
   *
   * @param {IPublicTypeEngineOptions} engineOptions
   */
  setEngineOptions(engineOptions: IPublicTypeEngineOptions) {
    if (!engineOptions || !isPlainObject(engineOptions)) {
      return;
    }
    const strictMode = getStrictModeValue(engineOptions, STRICT_PLUGIN_MODE_DEFAULT) === true;
    if (strictMode) {
      const isValidKey = (key: string) => {
        const result = (VALID_ENGINE_OPTIONS as any)[key];
        return !(result === undefined || result === null);
      };
      Object.keys(engineOptions).forEach((key) => {
        if (isValidKey(key)) {
          this.set(key, (engineOptions as any)[key]);
        } else {
          logger.warn(`failed to config ${key} to engineConfig, only predefined options can be set under strict mode, predefined options: `, VALID_ENGINE_OPTIONS);
        }
      });
    } else {
      this.setConfig(engineOptions as any);
    }
  }

  /**
   * Get the value for a key; wait if not yet set, otherwise return immediately
   *  Note: returns a Promise that fulfills only once
   * @param key
   * @returns
   */
  onceGot(key: string): Promise<any> {
    const val = this.config[key];
    if (val !== undefined) {
      return Promise.resolve(val);
    }
    return new Promise((resolve) => {
      this.setWait(key, resolve, true);
    });
  }

  /**
   * Get the value for a key in callback mode; if set multiple times, the callback is invoked multiple times
   * @param key
   * @param fn
   * @returns
   */
  onGot(key: string, fn: (data: any) => void): () => void {
    const val = this.config?.[key];
    if (val !== undefined) {
      fn(val);
    }
    this.setWait(key, fn);
    return () => {
      this.delWait(key, fn);
    };
  }

  notifyGot(key: string): void {
    let waits = this.waits.get(key);
    if (!waits) {
      return;
    }
    waits = waits.slice().reverse();
    let i = waits.length;
    while (i--) {
      waits[i].resolve(this.get(key));
      if (waits[i].once) {
        waits.splice(i, 1);
      }
    }
    if (waits.length > 0) {
      this.waits.set(key, waits);
    } else {
      this.waits.delete(key);
    }
  }

  setWait(key: string, resolve: (data: any) => void, once?: boolean) {
    const waits = this.waits.get(key);
    if (waits) {
      waits.push({ resolve, once });
    } else {
      this.waits.set(key, [{ resolve, once }]);
    }
  }

  delWait(key: string, fn: any) {
    const waits = this.waits.get(key);
    if (!waits) {
      return;
    }
    let i = waits.length;
    while (i--) {
      if (waits[i].resolve === fn) {
        waits.splice(i, 1);
      }
    }
    if (waits.length < 1) {
      this.waits.delete(key);
    }
  }

  getPreference(): IPublicModelPreference {
    return this.preference;
  }
}

export const engineConfig = new EngineConfig();
