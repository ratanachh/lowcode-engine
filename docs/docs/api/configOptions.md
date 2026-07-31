---
title: config options - Configuration Reference
sidebar_position: 5
---

> **@types** [IPublicTypeEngineOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/engine-options.ts)<br/>

## Configuration Methods

#### init API

```javascript
import { init } from '@rchh/lowcode-engine';

init(document.getElementById('engine'), {
  enableCondition: false,
});
```

[**init api**](./init)

#### config API

```javascript
import { config } from '@rchh/lowcode-engine';

config.set('enableCondition', false);
```

[**config api**](./config)

## Configuration Details

> See source: [IPublicTypeEngineOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/engine-options.ts)

### Canvas

#### locale - Language

`@type {string}`、`@default {zh-CN}`

Language

#### device - Device type

`@type {string}`

Built-in device types: `default`, `mobile`, `iphonex`, `iphone6`.

Device types supported by plugin `@rchh/lowcode-plugin-simulator-select`: `default`, `phone`, `tablet`, `desktop`.

For custom device types, add corresponding styles. For example, when device is `phone`:

```css
.lc-simulator-device-phone {
  top: 16px;
  bottom: 16px;
  left: 50%;
  width: 375px;
  transform: translateX(-50%);
  margin: auto;
}
```

#### deviceClassName

`@type {string}`

Initial `deviceClassName` applied to the canvas root node

#### appHelper

Same as react-renderer `appHelper`: https://lowcode-engine.cn/site/docs/guide/expand/runtime/renderer#apphelper

#### enableCondition

`@type {boolean}`

Whether to enable condition support; by default the designer shows components regardless of condition value

#### disableAutoRender

`@type {boolean}` `@default {false}`

Disable automatic canvas rendering; useful when asset packages load asynchronously in multiple stages

#### renderEnv - Renderer type

Renderer type

`@type {string}`、`@default {react}`

#### simulatorUrl

`@type {string[]}`

URLs related to the simulator

#### enableStrictNotFoundMode

`@type {boolean}` `@default {false}`

When strict component-not-found mode is enabled, the renderer does not fall back to a default container component

### Orchestration

#### focusNodeSelector - Specify root component

Configure a specific node as the root component

Type definition

```typescript
  focusNodeSelector?: (rootNode: IPublicModelNode) => Node;
```

#### supportVariableGlobally - Global variable configuration

`@type {boolean}` `@default {false}`

Enable variable binding for all properties

Visual feedback on the container about to receive a dragged component

#### customizeIgnoreSelectors - Click ignore

Elements in the canvas whose click events should be ignored — configured elements do not respond to clicks by default.

Type definition:

```typescript
  customizeIgnoreSelectors?: (defaultIgnoreSelectors: string[], e: MouseEvent) => string[];
```

Default:

```javascript
() => {
  return [
    '.next-input-group',
    '.next-checkbox-group',
    '.next-checkbox-wrapper',
    '.next-date-picker',
    '.next-input',
    '.next-month-picker',
    '.next-number-picker',
    '.next-radio-group',
    '.next-range',
    '.next-range-picker',
    '.next-rating',
    '.next-select',
    '.next-switch',
    '.next-time-picker',
    '.next-upload',
    '.next-year-picker',
    '.next-breadcrumb-item',
    '.next-calendar-header',
    '.next-calendar-table',
    '.editor-container', // Rich text component
  ];
};
```

#### enableCanvasLock

`@type {boolean}` `@default {false}`

Enable canvas lock operations

#### enableLockedNodeSetting

`@type {boolean}` `@default {false}`

Whether locked containers can still have their properties edited; only applies when canvas lock is enabled

#### enableMouseEventPropagationInCanvas

`@type {boolean}` `@default {false}`

Whether mouse events (mouseover, mouseleave, mousemove) bubble in the canvas; disabled by default.

#### enableReactiveContainer

`@type {boolean}` `@default {false}`

#### enableContextMenu - Enable context menu

`@type {boolean}` `@default {false}`

Whether to enable the context menu

#### disableDetecting

`@type {boolean}` `@default {false}`

Disable dashed-line feedback when dragging components (for performance)

#### disableDefaultSettingPanel

`@type {boolean}` `@default {false}`

Disable the default settings panel

#### disableDefaultSetters

`@type {boolean}` `@default {false}`

Disable default setters

#### stayOnTheSameSettingTab

`@type {boolean}` `@default {false}`

When the selected node changes, stay on the same settings tab

#### hideSettingsTabsWhenOnlyOneItem

`@type {boolean}` `@default {false}`

Hide settings tabs when there is only one item

#### hideComponentAction

`@type {boolean}` `@default {false}`

Hide the designer auxiliary layer

#### thisRequiredInJSE

`@type {boolean}` `@default {true}`

Whether JSExpression only allows accessing context variables via `this`; set to `false` to support legacy `'state.xxx'` access

### Application-level designer

#### enableWorkspaceMode - Application-level design mode

`@type {boolean}` `@default {false}`

Enable application-level design mode

#### enableAutoOpenFirstWindow

`@type {boolean}` `@default {true}`

In application-level design mode, automatically open the first window

#### workspaceEmptyComponent

Placeholder component shown when a window is empty in application-level design mode

### Custom components

#### faultComponent

Placeholder component when component rendering fails

#### notFoundComponent

Placeholder component when a component is not found

#### loadingComponent - Loading component

Custom loading component

### Plugins

#### defaultSettingPanelProps

`panelProps` for the built-in settings panel plugin

#### defaultOutlinePaneProps

`panelProps` for the built-in outline tree panel plugin

### Other

#### enableStrictPluginMode

`@type {boolean}`

Enable strict plugin mode. Default: `STRICT_PLUGIN_MODE_DEFAULT`. In strict mode, plugins cannot receive custom options via `engineOptions`.

#### requestHandlersMap

Request handler map for the data source engine

#### customPluginTransducer

Plugin processing middleware for plugin debugging

Type definition

```typescript
customPluginTransducer: async (originPlugin: IPublicTypePlugin, ctx: IPublicModelPluginContext, options): IPublicTypePlugin;
```

#### defaultOutlinePaneProps

`@type {object}`

Default props for the outline tree plugin panel
