---
title: hotkey - Hotkey API
sidebar_position: 10
---

> **@types** [IPublicApiHotkey](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/hotkey.ts)<br/> > **@since** v1.0.0

## Module Overview

Hotkey binding API for custom project shortcuts.

## Methods

### bind

Bind a hotkey

```typescript
/**
 * Bind a hotkey
 * bind hotkey/hotkeys,
 * @param combos Hotkey combos, e.g. ['command + s'], ['ctrl + shift + s']
 * @param callback Callback function
 * @param action
 * @returns
 */
bind(
    combos: string[] | string,
    callback: IPublicTypeHotkeyCallback,
    action?: string,
  ): IPublicTypeDisposable;
```

Related types

- [IPublicTypeHotkeyCallback](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/hotkey-callback.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

## Usage Examples

### Basic example

```typescript
hotkey.bind('command+s', (e) => {
  e.preventDefault();
  // Logic to run when command+s is pressed
});
```

### Bind multiple hotkeys at once

```typescript
hotkey.bind(['command+s', 'command+c'], (e) => {
  e.preventDefault();
  // Logic to run when command+s or command+c is pressed
});
```

### Save hotkey configuration

```typescript
import { hotkey } from '@rchh/lowcode-engine';

function saveSchema(schema) {
  // Schema save logic
}

const saveSampleHotKey = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'saveSample',
    async init() {
      hotkey.bind('command+s', (e) => {
        e.preventDefault();
        saveSchema();
      });
    },
  };
};

saveSampleHotKey.pluginName = 'saveSampleHotKey';
plugins.register(saveSampleHotKey);
```
