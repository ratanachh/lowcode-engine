---
title: material - Material API
sidebar_position: 10
---

> **@types** [IPublicApiMaterial](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/material.ts)<br/> > **@since** v1.0.0

## Module Overview

Material-related APIs, including asset packages, designer auxiliary layer, material metadata, and material metadata transducers.

## Variables

### componentsMap

Get the component map structure

```typescript
/**
  * Get the component map structure
  * get map of components
  */
get componentsMap(): { [key: string]: IPublicTypeNpmInfo | ComponentType<any> | object } ;
```

Related type: [IPublicTypeNpmInfo](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/npm-info.ts)

## Methods

### Asset package

#### setAssets

Set the [asset package](/site/docs/specs/lowcode-spec#2-protocol-structure) structure

```typescript
/**
 * Set the asset package structure
 * set data for Assets
 * @returns void
 */
setAssets(assets: IPublicTypeAssetsJson): void;
```

Related type: [IPublicTypeAssetsJson](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/assets-json.ts)

**Example**
Import npm package directly in the project

```javascript
import { material } from '@rchh/lowcode-engine';
import assets from '@rchh/mc-assets-<siteId>/assets.json';

material.setAssets(assets);
```

Load asset package dynamically via API

```typescript
import { material, plugins } from '@rchh/lowcode-engine';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

// Dynamically load assets
plugins
  .register((ctx: IPublicModelPluginContext) => {
    return {
      name: 'ext-assets',
      async init() {
        try {
          // Replace the URL below with your material descriptor address.
          const res = await window.fetch(
            'https://fusion.alicdn.com/assets/default@0.1.95/assets.json',
          );
          const assets = await res.text();
          material.setAssets(assets);
        } catch (err) {
          console.error(err);
        }
      },
    };
  })
  .catch((err) => console.error(err));
```

#### getAssets

Get the asset package structure

```typescript
/**
 * Get the asset package structure
 * get AssetsJson data
 * @returns IPublicTypeAssetsJson
 */
getAssets(): IPublicTypeAssetsJson;
```

Related type: [IPublicTypeAssetsJson](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/assets-json.ts)

**Example**

```typescript
import { material } from '@rchh/lowcode-engine';

material.getAssets();
```

#### loadIncrementalAssets

Load an incremental asset package; merged with the existing one

```typescript
/**
 * Load an incremental asset package; merged with the existing one
 * load Assets incrementally, and will merge this with exiting assets
 * @param incrementalAssets
 * @returns
 */
loadIncrementalAssets(incrementalAssets: IPublicTypeAssetsJson): Promise<void>;
```

Related type: [IPublicTypeAssetsJson](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/assets-json.ts)

**Example**

```typescript
import { material } from '@rchh/lowcode-engine';
import assets1 from '@rchh/mc-assets-<siteId>/assets.json';
import assets2 from '@rchh/mc-assets-<siteId>/assets.json';

material.setAssets(assets1);
material.loadIncrementalAssets(assets2);
```

Update a specific material descriptor

```typescript
import { material } from '@rchh/lowcode-engine';
material.loadIncrementalAssets({
  version: '',
  components: [
    {
      componentName: 'Button',
      props: [{ name: 'new', title: 'new', propType: 'string' }],
    },
  ],
});
```

### Designer auxiliary layer

#### addBuiltinComponentAction

Add an extension action to the designer auxiliary layer

```typescript
/**
 * Add an extension action to the designer auxiliary layer
 * add an action button in canvas context menu area
 * @param action
 */
addBuiltinComponentAction(action: IPublicTypeComponentAction): void;
```

Related type: [IPublicTypeComponentAction](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/component-action.ts)

**Example**
Add a design extension slot and bind an event

```typescript
import { material } from '@rchh/lowcode-engine';

material.addBuiltinComponentAction({
  name: 'myIconName',
  content: {
    icon: () => 'x',
    title: 'hover title',
    action(node) {
      console.log('myIconName extension slot clicked');
    },
  },
  important: true,
  condition: true,
});
```

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01jDbN7B1KfWVzJ16tw_!!6000000001191-2-tps-230-198.png)

#### removeBuiltinComponentAction

Remove a specified action from the designer auxiliary layer

```typescript
/**
 * Remove a specified action from the designer auxiliary layer
 * remove a builtin action button from canvas context menu area
 * @param name
 */
removeBuiltinComponentAction(name: string): void;
```

##### Built-in designer auxiliary action names

- remove: delete
- hide: hide
- copy: copy
- lock: lock, not editable
- unlock: unlock, editable

**Example**

```typescript
import { material } from '@rchh/lowcode-engine';

material.removeBuiltinComponentAction('myIconName');
```

#### modifyBuiltinComponentAction

Modify an existing designer auxiliary layer action

```typescript
/**
 * Modify an existing designer auxiliary layer action
 * modify a builtin action button in canvas context menu area
 * @param actionName
 * @param handle
 */
modifyBuiltinComponentAction(
    actionName: string,
    handle: (action: IPublicTypeComponentAction) => void,
  ): void;
```

Related type: [IPublicTypeComponentAction](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/component-action.ts)

##### Built-in designer auxiliary action names

- remove: delete
- hide: hide
- copy: copy
- lock: lock, not editable
- unlock: unlock, editable

**Example**
Add before/after logs to the original remove action

```typescript
import { material } from '@rchh/lowcode-engine';

material.modifyBuiltinComponentAction('remove', (action) => {
  const originAction = action.content.action;
  action.content.action = (node) => {
    console.log('before reomve!');
    originAction(node);
    console.log('after remove!');
  };
});
```

### Context menu items

#### addContextMenuOption

Add a context menu item

```typescript
/**
 * Add a context menu item
 * @param action
 */
addContextMenuOption(action: IPublicTypeContextMenuAction): void;
```

Example

```typescript
import { IPublicEnumContextMenuType } from '@rchh/lowcode-types';

material.addContextMenuOption({
  name: 'parentItem',
  title: 'Parent Item',
  condition: (nodes) => true,
  items: [
    {
      name: 'childItem1',
      title: 'Child Item 1',
      action: (nodes) => console.log('Child Item 1 clicked', nodes),
      condition: (nodes) => true
    },
    // Separator
    {
      type: IPublicEnumContextMenuType.SEPARATOR
      name: 'separator.1'
    }
    // More sub-menu items...
  ]
});

```

#### removeContextMenuOption

Remove a specific context menu item

```typescript
/**
 * Remove a specific context menu item
 * @param name
 */
removeContextMenuOption(name: string): void;
```

#### adjustContextMenuLayout

Adjust context menu layout. Each call overwrites previously registered layout functions; only the last registered function is applied.

```typescript
/**
 * Adjust context menu layout
 * @param actions
 */
adjustContextMenuLayout(fn: (actions: IPublicTypeContextMenuItem[]) => IPublicTypeContextMenuItem[]): void;
```

**Example**

Add separators via adjustContextMenuLayout

```typescript
material.adjustContextMenuLayout((actions: IPublicTypeContextMenuAction) => {
  const names = ['a', 'b'];
  const newActions = [];
  actions.forEach((d) => {
    newActions.push(d);
    if (names.include(d.name)) {
      newActions.push({ type: 'separator' });
    }
  });
  return newActions;
});
```

### Material metadata

#### getComponentMeta

Get material metadata by component name

```typescript
/**
 * Get material metadata by component name
 * get component meta by component name
 * @param componentName
 * @returns
 */
getComponentMeta(componentName: string): IPublicModelComponentMeta | null;
```

Related type: [IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

**Example**

```typescript
import { material } from '@rchh/lowcode-engine';

material.getComponentMeta('Input');
```

#### getComponentMetasMap

Get all registered material metadata

```typescript
  /**
   * Get all registered material metadata
   * get map of all component metas
   * @returns
   */
  getComponentMetasMap(): Map<string, IPublicModelComponentMeta>;
```

Related type: [IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

**Example**

```typescript
import { material } from '@rchh/lowcode-engine';

material.getComponentMetasMap();
```

#### refreshComponentMetasMap

Refresh componentMetasMap; can trigger components rebuild in the simulator

**@since v1.1.7**

```typescript
  refreshComponentMetasMap(): void;
```

### Material metadata transducers

#### registerMetadataTransducer

Register a material metadata transducer, executed during material initialization.

```typescript
/**
 * Register a material metadata transducer, executed during material initialization.
 * register transducer to process component meta, which will be
 * excuted during component meta`s initialization
 * @param transducer
 * @param level
 * @param id
 */
registerMetadataTransducer(
  transducer: IPublicTypeMetadataTransducer,
  level?: number,
  id?: string | undefined
): void;
```

**Example**
Add an advanced settings panel to every component with a render-condition field

```typescript
import { material } from '@rchh/lowcode-engine';

function addonCombine(metadata: TransformedComponentMetadata) {
  const { componentName, configure = {} } = metadata;
  const advanceGroup = [];
  const combined: FieldConfig[] = [];

  advanceGroup.push({
    name: getConvertedExtraKey('condition'),
    title: { type: 'i18n', 'zh-CN': 'Whether to render', 'en-US': 'Condition' },
    defaultValue: true,
    setter: [
      {
        componentName: 'BoolSetter',
      },
      {
        componentName: 'VariableSetter',
      },
    ],
    extraProps: {
      display: 'block',
    },
  });

  combined.push({
    name: '#advanced',
    title: { type: 'i18n', 'zh-CN': 'Advanced', 'en-US': 'Advanced' },
    items: advanceGroup,
  });

  return {
    ...metadata,
    configure: {
      ...configure,
      combined,
    },
  };
}

material.registerMetadataTransducer(addonCombine, 1, 'parse-func');
```

Remove the Advanced tab

```typescript
import { material } from '@rchh/lowcode-engine';
import { IPublicTypeFieldConfig } from '@rchh/lowcode-types';

material.registerMetadataTransducer(
  (transducer) => {
    const combined: IPublicTypeFieldConfig[] = [];

    transducer.configure.combined?.forEach((d) => {
      if (d.name !== '#advanced') {
        combined.push(d);
      }
    });

    return {
      ...transducer,
      configure: {
        ...transducer.configure,
        combined,
      },
    };
  },
  111,
  'parse-func',
);
```

#### getRegisteredMetadataTransducers

Get all material metadata transducers

```typescript
/**
 * Get all material metadata transducers
 * get all registered metadata transducers
 * @returns {IPublicTypeMetadataTransducer[]}
 */
getRegisteredMetadataTransducers(): IPublicTypeMetadataTransducer[];
```

**Example**

```typescript
import { material } from '@rchh/lowcode-engine';

material.getRegisteredMetadataTransducers();
```

## Events

### onChangeAssets

Listen for asset change events

```typescript
/**
 * Listen for asset change events
 * add callback for assets changed event
 * @param fn
 */
onChangeAssets(fn: () => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**Example**

```typescript
import { material } from '@rchh/lowcode-engine';

material.onChangeAssets(() => {
  console.log('asset changed');
});
```
