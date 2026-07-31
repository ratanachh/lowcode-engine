import {
  Detecting,
  DocumentModel,
  History,
  Node,
  NodeChildren,
  Prop,
  Selection,
  Dragon,
  SettingTopEntry,
  Clipboard,
  SettingField,
  Window,
  SkeletonItem,
} from './model';
import {
  Project,
  Material,
  Logger,
  Plugins,
  Skeleton,
  Setters,
  Hotkey,
  Common,
  getEvent,
  Event,
  Canvas,
  Workspace,
  SimulatorHost,
  Config,
  CommonUI,
  Command,
} from './api';

export * from './symbols';

/**
 * API design conventions for all shell-layer models:
 *  1. All API namespaces are organized as variables / functions / events
 *  2. Event naming format: on[Will|Did]VerbNoun?, see https://code.visualstudio.com/api/references/vscode-api#events
 *  3. Based on the Disposable pattern, event/hotkey bind functions return an unbind function
 *  4. Exported properties use the .xxx getter pattern; do not use .getXxx()
 */
export {
  DocumentModel,
  Detecting,
  Event,
  History,
  Material,
  Node,
  NodeChildren,
  Project,
  Prop,
  Selection,
  Setters,
  Hotkey,
  Window,
  Skeleton,
  SettingField as SettingPropEntry,
  SettingTopEntry,
  Dragon,
  Common,
  getEvent,
  Plugins,
  Logger,
  Canvas,
  Workspace,
  Clipboard,
  SimulatorHost,
  Config,
  SettingField,
  SkeletonItem,
  CommonUI,
  Command,
};
