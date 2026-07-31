---
title: skeleton - Panel API
sidebar_position: 10
---

> **@types** [IPublicApiSkeleton](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/skeleton.ts)<br/> > **@since** v1.0.0

## Module Overview

The panel API provides panel extension and management. The blue areas in the image below are all extensions.

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01eVA0U41xYRP3e5zo0_!!6000000006455-2-tps-1780-996.png)

There are 5 extensible areas on the page:
![image.png](https://img.alicdn.com/imgextra/i3/O1CN014d2AcS1D5c9TshEiQ_!!6000000000165-2-tps-1892-974.png)

### Core Concepts

#### Extension area (area)

##### topArea

Top area of the designer. Common plugins here include:

1. Designer logo
2. Undo/redo buttons
3. Global actions such as save and preview

##### leftArea

Left area is usually icons with corresponding panels. Clicking an icon shows that panel and hides others.

Common plugins here include:

1. Outline tree showing the page structure
2. Component library — drag components from the panel onto the canvas
3. Data source panel
4. JS and other code panels

Panels in this area usually do not need to be open at the same time and often need a larger dedicated area for interaction.

##### centerArea

Canvas area. Extensions here are relatively rare since the canvas is mostly for display. Common extensions include:

1. Canvas size controls
2. Material selection extension areas

##### rightArea

Right area, commonly used for component configuration. Common extensions include uniformly adding or removing configuration items across components.

##### toolbar

Similar to topArea — place panel plugins as needed.

#### Display type (type)

Display type distinguishes different UI patterns plugins can use in the designer. Main types are PanelDock, Widget, and Dock. Panel is currently not recommended.

##### PanelDock

PanelDock appears as a panel in the left area. It consists of an icon and a panel; clicking the icon toggles panel visibility.

Below is the component library plugin display.

![Feb-08-2022 19-44-15.gif](https://img.alicdn.com/imgextra/i2/O1CN01i66G5O27bK37nlpxV_!!6000000007815-1-tps-1536-790.gif)

The top-right corner supports pinning and setting popup width.

Integration example:

```javascript
import { skeleton } from '@rchh/lowcode-engine';

skeleton.add({
  area: 'leftArea', // Plugin area
  type: 'PanelDock', // Plugin type — popup panel
  name: 'sourceEditor',
  content: SourceEditor, // Plugin component instance
  props: {
    align: 'left',
    icon: 'wenjian',
    title: 'Title', // Title shown below the icon
    description: 'JS panel',
  },
  panelProps: {
    floatable: true, // Whether the panel can float
    height: 300,
    hideTitleBar: false,
    maxHeight: 800,
    maxWidth: 1200,
    title: 'JS panel',
    width: 600,
  },
});
```

##### Widget

Widget renders directly at the corresponding position in the editor. In the demo, all components in the top area use this pattern.

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01IRQIZp1m5AJPwBKDv_!!6000000004902-2-tps-1988-94.png)

Integration example:

```javascript
import { skeleton } from '@rchh/lowcode-engine';
// Register logo panel
skeleton.add({
  area: 'topArea',
  type: 'Widget',
  name: 'logo',
  content: Logo, // Widget component instance
  contentProps: {
    // Widget plugin props
    logo: 'https://img.alicdn.com/tfs/TB1_SocGkT2gK0jSZFkXXcIQFXa-66-66.png',
    href: '/',
  },
  props: {
    align: 'left',
    width: 100,
  },
});
```

##### Dock

An icon-only display suitable for language switching, external links, opening a widget, and similar scenarios.

```javascript
import { skeleton } from '@rchh/lowcode-engine';

skeleton.add({
  area: 'leftArea',
  type: 'Dock',
  name: 'opener',
  props: {
    icon: Icon, // Icon component instance
    align: 'bottom',
    onClick: function () {
      // Open external link
      window.open('https://lowcode-engine.cn');
      // Show widget
      skeleton.showWidget('xxx');
    },
  },
});
```

## Methods

### add

Add a panel to a specified extension area

```typescript
/**
 * Add a panel instance
 * add a new panel
 * @param config
 * @param extraConfig
 * @returns
 */
add(config: IPublicTypeWidgetBaseConfig, extraConfig?: Record<string, any>): any;
```

IWidgetBaseConfig definition:

| Property     | Description                                                                                                           | Notes                                                                                                                                                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | Panel name                                                                                                            |                                                                                                                                                                                                                                                                                           |
| area         | Extension area: 'topArea' &#124; 'leftArea' &#124; 'rightArea' &#124; 'toolbar' &#124; 'bottomArea' &#124; 'mainArea' |                                                                                                                                                                                                                                                                                           |
| type         | Panel type: 'Widget' &#124; 'PanelDock' &#124; 'Panel' &#124; Dock                                                    | See **Display type** above                                                                                                                                                                                                                                                                |
| content      | Panel implementation class/node — ReactClass &#124; ReactElement                                                      |                                                                                                                                                                                                                                                                                           |
| props        | Panel properties                                                                                                      | align: 'top' &#124; 'bottom' &#124; 'left' &#124; 'center' &#124; 'right'; // Icon position<br />icon: string &#124; ReactElement; // When icon is a string, ensure the current Fusion theme includes it<br />description: string;<br />condition: Function; // Controls panel visibility |
| contentProps | Props for the panel implementation class/node                                                                         |                                                                                                                                                                                                                                                                                           |
| panelProps   | Valid when type is 'Panel' &#124; 'PanelDock'; passed to Panel                                                        | keepVisibleWhileDragging: boolean; // Keep panel open while dragging inside it; default false<br />area: 'leftFloatArea' &#124; 'leftFixedArea' // Float or pinned panel                                                                                                                  |
| index        | Panel position; defaults to plugin registration order                                                                 |                                                                                                                                                                                                                                                                                           |

### remove

Remove a panel instance

```typescript
/**
 * Remove a panel instance
 * remove a panel
 * @param config
 * @returns
 */
remove(config: IPublicTypeWidgetBaseConfig): number | undefined;
```

### getPanel

Get a panel instance

```typescript
/**
 * Get a panel instance
 * @param name Panel name
 */
getPanel(name: string): IPublicModelSkeletonItem | undefined;
```

Related type: [IPublicModelSkeletonItem](https://github.com/alibaba/lowcode-engine/blob/main/packages/shell/src/model/skeleton-item.ts)

@since v1.1.10

### showPanel

Show a panel instance by name

```typescript
/**
 * Show a panel instance by name
 * show panel by name
 * @param name
 */
showPanel(name: string): void;
```

### hidePanel

Hide a panel

```typescript
/**
 * Hide a panel
 * hide panel by name
 * @param name
 */
hidePanel(name: string): void;
```

### showWidget

Show a widget instance by name

```typescript
/**
 * Show a widget instance by name
 * show widget by name
 * @param name
 */
showWidget(name: string): void;
```

### enableWidget

Enable a widget.

```typescript
/**
 * Enable a widget
 * enable widget
 * @param name
 */
enableWidget(name: string): void;
```

### hideWidget

Hide a widget instance by name.

```typescript
/**
 * Hide a widget instance by name
 * hide widget by name
 * @param name
 */
hideWidget(name: string): void;
```

### disableWidget

Disable a widget; all mouse events are blocked.

Use case: disable the panel during initialization to prevent user clicks from causing errors, then re-enable when ready.

```typescript
/**
 * Disable a widget; all mouse events are blocked.
 * disable widget，and make it not responding any click event.
 * @param name
 */
disableWidget(name: string): void;
```

### showArea

Show an area

```typescript
/**
 * Show an area
 * show area
 * @param areaName name of area
 */
showArea(areaName: string): void;
```

### hideArea

Hide an area

```typescript
/**
 * Hide an area
 * hide area
 * @param areaName name of area
 */
hideArea(areaName: string): void;
```

### getAreaItems

Get all panel instances in an area

```typescript
/**
  * Get all panel instances in an area
  * @param areaName IPublicTypeWidgetConfigArea
  */
getAreaItems(areaName: IPublicTypeWidgetConfigArea): IPublicModelSkeletonItem[] | undefined;
```

Related type: [IPublicModelSkeletonItem](https://github.com/alibaba/lowcode-engine/blob/main/packages/shell/src/model/skeleton-item.ts)

### registerConfigTransducer

Register a panel configuration transducer.

```typescript
/**
 * Register a panel configuration transducer.
 * Registers a configuration transducer for a panel.
 * @param {IPublicTypeConfigTransducer} transducer
 *   - Transducer function to register. Accepts a configuration object (IPublicTypeSkeletonConfig) and returns the modified configuration.
 *   - The transducer function to be registered. This function takes a configuration object
 *
 * @param {number} level
 *   - Transducer priority. Higher priority transducers run first.
 *   - The priority level of the transducer. Transducers with higher priority levels are executed first.
 *
 * @param {string} [id]
 *   - (Optional) Unique transducer identifier for referencing or manipulating a specific transducer.
 *   - (Optional) A unique identifier for the transducer. Used for referencing or manipulating a specific transducer when needed.
 */
registerConfigTransducer(transducer: IPublicTypeConfigTransducer, level: number, id?: string): void;
```

Usage example

```typescript
import { IPublicModelPluginContext, IPublicTypeSkeletonConfig } from '@rchh/lowcode-types';

function updatePanelWidth(config: IPublicTypeSkeletonConfig) {
  if (config.type === 'PanelDock') {
    return {
      ...config,
      panelProps: {
        ...(config.panelProps || {}),
        width: 240,
      },
    };
  }

  return config;
}

const controlPanelWidthPlugin = (ctx: IPublicModelPluginContext) => {
  const { skeleton } = ctx;
  (skeleton as any).registerConfigTransducer?.(updatePanelWidth, 1, 'update-panel-width');

  return {
    init() {},
  };
};

controlPanelWidthPlugin.pluginName = 'controlPanelWidthPlugin';
controlPanelWidthPlugin.meta = {
  dependencies: [],
  engines: {
    lowcodeEngine: '^1.2.3', // Plugin requires engine ^1.0.0
  },
};

export default controlPanelWidthPlugin;
```

## Events

### onShowPanel

Listen for panel show events

```typescript
/**
 * Listen for panel show events
 * set callback for panel shown event
 * @param listener
 * @returns
 */
onShowPanel(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onHidePanel

Listen for panel hide events

```typescript
/**
 * Listen for panel hide events
 * set callback for panel hidden event
 * @param listener
 * @returns
 */
onHidePanel(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onDisableWidget

Listen for widget disable events

```typescript
/**
 * Listen for widget disable events
 * @param listener
 */
onDisableWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onEnableWidget

Listen for widget enable events

```typescript
/**
 * Listen for widget enable events
 * @param listener
 */
onEnableWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onShowWidget

Listen for widget show events

```typescript
/**
 * Listen for widget show events
 * set callback for widget shown event
 * @param listener
 * @returns
 */
onShowWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onHideWidget

Listen for widget hide events

```typescript
/**
 * Listen for widget hide events
 * set callback for widget hidden event
 * @param listener
 * @returns
 */
onHideWidget(listener: (paneName?: string, panel?: IPublicModelSkeletonItem) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

## Usage Examples

```typescript
import { skeleton } from '@rchh/lowcode-engine';

skeleton.add({
  name: 'logo',
  area: 'topArea',
  type: 'Widget',
  contentProps: {},
  content: LogoContent,
});

skeleton.add({
  name: 'sourceEditor',
  type: 'PanelDock',
  area: 'leftArea',
  props: {
    align: 'top',
    icon: 'wenjian',
    description: 'JS panel',
  },
  panelProps: {
    floatable: true,
    height: 300,
    help: undefined,
    hideTitleBar: false,
    maxHeight: 800,
    maxWidth: 1200,
    title: 'JS panel',
    width: 600,
  },
  content: SourceEditor,
});

// Show/hide panel
skeleton.showPanel('sourceEditor');
skeleton.hidePanel('sourceEditor');

// Create a floating widget
skeleton.add({
  name: 'floatingWidget',
  type: 'Widget',
  area: 'mainArea',
  props: {},
  content: React.createElement('div', {}, 'haha'),
  contentProps: {
    style: {
      position: 'fixed',
      top: '200px',
      bottom: 0,
      width: 'calc(100% - 46px)',
      'background-color': 'lightblue',
    },
  },
});

// Show/hide widget
skeleton.showWidget('floatingWidget');
skeleton.hideWidget('floatingWidget');

// Control widget clickability
skeleton.enableWidget('sourceEditor');
skeleton.disableWidget('sourceEditor');
```

### bottomArea example

```typescript
import { skeleton } from '@rchh/lowcode-engine';

skeleton.add({
  name: 'bottomAreaPanelName',
  area: 'bottomArea',
  type: 'Panel',
  content: () => 'demoText',
});

skeleton.showPanel('bottomAreaPanelName');
```

### widget example

```typescript
// Register logo panel
skeleton.add({
  area: 'topArea',
  type: 'Widget',
  name: 'logo',
  content: Logo,
  contentProps: {
    logo: 'https://img.alicdn.com/imgextra/i4/O1CN013w2bmQ25WAIha4Hx9_!!6000000007533-55-tps-137-26.svg',
    href: 'https://lowcode-engine.cn',
  },
  props: {
    align: 'left',
  },
});
```
