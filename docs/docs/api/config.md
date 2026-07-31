---
title: config - Configuration API
sidebar_position: 5
---

> **@types** [IPublicModelEngineConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/engine-config.ts)<br/> > **@since** v1.0.0

## Module Overview

Configuration module for reading and writing config values.

## Methods

### get

Get the value for a given key

```typescript
/**
 * Get the value for a given key
 * get value by key
 * @param key
 * @param defaultValue
 * @returns
 */
get(key: string, defaultValue?: any): any;
```

**Example**

```typescript
import { config } from '@rchh/lowcode-engine';

config.get('keyA', true);
config.get('keyB', { a: 1 });
```

### set

Set the value for a given key

```typescript
/**
 * Set the value for a given key
 * set value for certain key
 * @param key
 * @param value
 */
set(key: string, value: any): void;
```

**Example**

```typescript
import { config } from '@rchh/lowcode-engine';

config.set('keyC', 1);
```

### has

Check whether a given key has a value

```typescript
/**
 * Check whether a given key has a value
 * check if config has certain key configed
 * @param key
 * @returns
 */
has(key: string): boolean;
```

**Example**

```typescript
import { config } from '@rchh/lowcode-engine';

config.has('keyD');
```

### setConfig

Set multiple values at once — object version of `set`

```typescript
/**
 * Set multiple values at once — object version of set
 * set multiple config key-values
 * @param config
 */
setConfig(config: { [key: string]: any }): void;
```

**Example**

```typescript
import { config } from '@rchh/lowcode-engine';

config.setConfig({ keyA: false, keyB: 2 });
```

### getPreference

Get the global Preference manager for browser-side user preferences, such as whether a panel is pinned

```typescript
/**
 * Get the global Preference manager for browser-side user preferences, such as whether a panel is pinned
 * get global user preference manager, which can be use to store
 * user`s preference in user localstorage, such as a panel is pinned or not.
 * @returns {IPublicModelPreference}
 * @since v1.1.0
 */
getPreference(): IPublicModelPreference;
```

Related type: [IPublicModelPreference](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/preference.ts)

**@since v1.1.0**

Example

```javascript
import { config } from '@rchh/lowcode-engine';

const panelName = 'outline-master-pane';

// Pin the outline tree panel; takes effect the next time the outline tree is opened
config.getPreference().set(`${panelName}-pinned-status-isFloat`, false, 'skeleton');
```

## Events

### onceGot

Get the value for a given key; if not set yet, wait; if already set, return immediately.
Note: this function returns a Promise.

```typescript
/**
 * Get the value for a given key; if not set yet, wait; if already set, return immediately.
 * Note: this function returns a Promise that fulfills only once.
 * wait until value of certain key is set, will only be
 * triggered once.
 * @param key
 * @returns
 */
onceGot(key: string): Promise<any>;
```

**Example**

```typescript
import { config } from '@rchh/lowcode-engine';

config.onceGot('keyA').then((value) => {
  console.log(`The value of keyA is ${value}`);
});

// or
const value = await config.onceGot('keyA');
```

### onGot

Get the value for a given key via callback; if the value is set multiple times, the callback is invoked multiple times

```typescript
  /**
   * Get the value for a given key via callback; if the value is set multiple times, the callback is invoked multiple times
   * set callback for event of value set for some key
   * this will be called each time the value is set
   * @param key
   * @param fn
   * @returns
   */
  onGot(key: string, fn: (data: any) => void): () => void;
```

**Example**

```typescript
import { config } from '@rchh/lowcode-engine';

config.onGot('keyA', (value) => {
  console.log(`The value of keyA is ${value}`);
});

const.set('keyA', 1); // 'The value of keyA is 1'
const.set('keyA', 2); // 'The value of keyA is 2'
```
