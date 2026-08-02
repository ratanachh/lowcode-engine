---
title: plugins - Plugin API
sidebar_position: 2
---

> **@types** [IPublicApiPlugins](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/plugins.ts)<br/> > **@since** v1.0.0

## Module Overview

Plugin manager providing plugin management in the orchestration module.

## Methods

### register

Register a plugin

```typescript
async function register(
  plugin: IPublicTypePlugin,
  options?: IPublicTypePluginRegisterOptions,
): Promise<void>;
```

Related types:

- [IPublicTypePlugin](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/plugin.ts)
- [IPublicTypePluginRegisterOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/plugin-register-options.ts)

The first `plugin` parameter is typically authored from the low-code toolchain plugin scaffold template. See [this section](/lowcode-engine/docs/guide/expand/editor/cli) for creation.

#### Simple example

```typescript
import { plugins } from '@rchh/lowcode-engine';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

const builtinPluginRegistry = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { skeleton } = ctx;

      // Register component panel
      const componentsPane = skeleton.add({
        area: 'leftArea',
        type: 'PanelDock',
        name: 'componentsPane',
        content: ComponentsPane,
        contentProps: {},
        props: {
          align: 'top',
          icon: 'zujianku',
          description: 'Component library',
        },
      });
      componentsPane?.disable?.();
      project.onSimulatorRendererReady(() => {
        componentsPane?.enable?.();
      });
    },
  };
};
builtinPluginRegistry.pluginName = 'builtinPluginRegistry';
await plugins.register(builtinPluginRegistry);
```

#### Using exports example

```typescript
import { plugins } from '@rchh/lowcode-engine';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

const PluginA = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {},
    exports() {
      return { x: 1 };
    },
  };
};
PluginA.pluginName = 'PluginA';

const PluginB = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      // Get PluginA exports
      console.log(ctx.plugins.PluginA.x); // => 1
    },
  };
};
PluginA.pluginName = 'pluginA';
PluginB.pluginName = 'PluginB';
PluginB.meta = {
  dependencies: ['PluginA'],
};
await plugins.register(PluginA);
await plugins.register(PluginB);
```

> Note: `ctx` is the only way to access engine APIs from a plugin. See [IPublicModelPluginContext](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-context.ts) for the full definition.

#### Engine version compatibility example

```typescript
import { plugins } from '@rchh/lowcode-engine';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

const BuiltinPluginRegistry = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      ...
    },
  };
}
BuiltinPluginRegistry.pluginName = 'BuiltinPluginRegistry';
BuiltinPluginRegistry.meta = {
  engines: {
    lowcodeEngine: '^1.0.0', // Plugin requires engine ^1.0.0
  },
}
await plugins.register(BuiltinPluginRegistry);
```

#### Plugin options example

```typescript
import { plugins } from '@rchh/lowcode-engine';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

const BuiltinPluginRegistry = (ctx: IPublicModelPluginContext, options: any) => {
  return {
    async init() {
      // Direct value passing:
      //   Passed via register(xxx, options)
      //   Retrieved via options
      // Global plugin config can also be set at engine init:
      //   Passed via engine.init(..., preference)
      //   Retrieved via ctx.preference.getValue()
    },
  };
};
BuiltinPluginRegistry.pluginName = 'BuiltinPluginRegistry';
BuiltinPluginRegistry.meta = {
  preferenceDeclaration: {
    title: 'PluginA option definitions',
    properties: [
      {
        key: 'key1',
        type: 'string',
        description: 'this is description for key1',
      },
      {
        key: 'key2',
        type: 'boolean',
        description: 'this is description for key2',
      },
      {
        key: 'key3',
        type: 'number',
        description: 'this is description for key3',
      },
      {
        key: 'key4',
        type: 'string',
        description: 'this is description for key4',
      },
    ],
  },
};

await plugins.register(BuiltinPluginRegistry, { key1: 'abc', key5: 'willNotPassToPlugin' });
```

### get

Get a plugin by name

```typescript
/**
 * Get a plugin by name
 * get plugin instance by name
 */
get(pluginName: string): IPublicModelPluginInstance | null;
```

Related model: [IPublicModelPluginInstance](./model/plugin-instance)

### getAll

Get all plugin instances

```typescript
/**
 * Get all plugin instances
 * get all plugin instances
 */
getAll(): IPublicModelPluginInstance[];
```

Related model: [IPublicModelPluginInstance](./model/plugin-instance)

### has

Check whether a plugin exists

```typescript
/**
 * Check whether a plugin exists
 * check if plugin with certain name exists
 */
has(pluginName: string): boolean;
```

### delete

Delete a plugin by name

```typescript
/**
 * Delete a plugin by name
 * delete plugin instance by name
 */
delete(pluginName: string): void;
```

### getPluginPreference

Global config can be provided to plugins at engine init; use this method to get config for a specific plugin

```typescript
/**
 * Global config can be provided to plugins at engine init; use this method to get config for a specific plugin
 * use this to get preference config for this plugin when engine.init() called
 */
getPluginPreference(
    pluginName: string,
  ): Record<string, IPublicTypePreferenceValueType> | null | undefined;
```

## Related Type Definitions

- [IPublicModelPluginContext](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-context.ts)
- [IPublicTypePluginConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/plugin-config.ts)
- [IPublicModelPluginInstance](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/plugin-instance.ts)

## Plugin Metadata Project Transformation Example

your-plugin/package.json

```json
{
	"name": "@rchh/lowcode-plugin-debug",
  "lcMeta": {
    "pluginName": "debug",
    "meta": {
      "engines": {
        "lowcodeEgnine": "^1.0.0"
      },
      "preferenceDeclaration": { ... }
    }
  }
}
```

Transformed structure:

```typescript
const debug = (ctx: IPublicModelPluginContext, options: any) => {
	return {};
}

debug.pluginName = 'debug';
debug.meta = {
  engines: {
    lowcodeEgnine: '^1.51.0',
	},
  preferenceDeclaration: { ... }
};
```
