---
title: init - Initialization API
sidebar_position: 0
---

> **@since** v1.0.0

## Module Overview

Provides methods such as `init`.

## Methods

#### init

Initialize the engine

**Method signature**

```typescript
function init(container?: Element, options?: IPublicTypeEngineOptions): void;
```

[**Engine initialization configuration options**](./configOptions)

## Usage Examples

```typescript
import { init } from '@rchh/lowcode-engine';

init(document.getElementById('engine'), {
  enableCondition: false,
});
```

### Open mobile canvas by default

```typescript
import { init } from '@rchh/lowcode-engine';

init({
  device: 'mobile',
});
```

### Extend with third-party utils

```json
import { init } from '@rchh/lowcode-engine';

init({
  device: 'mobile',
  appHelper: {
    utils: {
      xxx: () => {console.log('123')},
    }
  }
});
```

You can then use it in the engine like this.
![image.png](https://img.alicdn.com/imgextra/i4/O1CN01FWvu051OxAEYrHBy5_!!6000000001771-2-tps-3584-1796.png)
