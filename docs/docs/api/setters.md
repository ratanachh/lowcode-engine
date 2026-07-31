---
title: setters - Setter API
sidebar_position: 10
---

> **@types** [IPublicApiSetters](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/setters.ts)<br/> > **@since** v1.0.0

## Module Overview

API for registering and managing setters. After registering custom setters, they can be used in material definitions.

## Methods

### getSetter

Get a setter by type

```typescript
/**
 * Get a setter by type
 * get setter by type
 * @param type
 * @returns
 */
getSetter(type: string): IPublicTypeRegisteredSetter | null;
```

Related type: [IPublicTypeRegisteredSetter](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/registerd-setter.ts)

### getSettersMap

Get all registered setters map

```typescript
/**
 * Get all registered setters map
 * get map of all registered setters
 * @returns
 */
getSettersMap(): Map<string, IPublicTypeRegisteredSetter & {
  type: string;
}>;
```

Related type: [IPublicTypeRegisteredSetter](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/registerd-setter.ts)

### registerSetter

Register a setter

```typescript
/**
 * Register a setter
 * register a setter
 * @param typeOrMaps
 * @param setter
 * @returns
 */
registerSetter(
  typeOrMaps: string | { [key: string]: IPublicTypeCustomView | IPublicTypeRegisteredSetter },
  setter?: IPublicTypeCustomView | IPublicTypeRegisteredSetter | undefined
): void;
```

Related types:

- [IPublicTypeRegisteredSetter](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/registerd-setter.ts)
- [IPublicTypeCustomView](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/custom-view.ts)

## Usage Examples

### Register built-in setters in the designer

```typescript
import { setters, skeleton } from '@rchh/lowcode-engine';
import { setterMap, pluginMap } from '@rchh/lowcode-engine-ext';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

const SetterRegistry = (ctx: IPublicModelPluginContext) => {
  return {
    name: 'ext-setters-registry',
    async init() {
      // Register setterMap
      setters.registerSetter(setterMap);
      // Register plugins
      // Register event binding panel
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: pluginMap.EventBindDialog,
        name: 'eventBindDialog',
        props: {},
      });

      // Register variable binding panel
      skeleton.add({
        area: 'centerArea',
        type: 'Widget',
        content: pluginMap.VariableBindDialog,
        name: 'variableBindDialog',
        props: {},
      });
    },
  };
};

SetterRegistry.pluginName = 'SetterRegistry';
await plugins.register(SetterRegistry);
```

### Develop a custom Setter

AltStringSetter code:

```typescript
import * as React from 'react';
import { Input } from '@alifd/next';

import './index.scss';
interface AltStringSetterProps {
  // Current value
  value: string;
  // Default value
  initialValue: string;
  // Setter output callback
  onChange: (val: string) => void;
  // AltStringSetter-specific config
  placeholder: string;
}
export default class AltStringSetter extends React.PureComponent<AltStringSetterProps> {
  componentDidMount() {
    const { onChange, value, defaultValue } = this.props;
    if (value == undefined && defaultValue) {
      onChange(defaultValue);
    }
  }

  // Declare Setter displayName
  static displayName = 'AltStringSetter';

  render() {
    const { onChange, value, placeholder } = this.props;
    return (
      <Input
        value={value}
        placeholder={placeholder || ''}
        onChange={(val: any) => onChange(val)}
      ></Input>
    );
  }
}
```

After development, register AltStringSetter in the designer:

```typescript
import AltStringSetter from './AltStringSetter';
import { setters } from '@rchh/lowcode-engine';
const { registerSetter } = setters;
registerSetter('AltStringSetter', AltStringSetter);
```

After registration, use it in material definitions. Core configuration:

```typescript
{
  "props": {
    "isExtends": true,
    "override": [
      {
        "name": "type",
        "setter": "AltStringSetter"
      }
    ]
  }
}
```

Full configuration:

```typescript
{
  "componentName": "Message",
  "title": "Message",
  "props": [
    {
      "name": "title",
      "propType": "string",
      "description": "Title",
      "defaultValue": "Title"
    },
    {
      "name": "type",
      "propType": {
        "type": "oneOf",
        "value": [
          "success",
          "warning",
          "error",
          "notice",
          "help",
          "loading"
        ]
      },
      "description": "Feedback type",
      "defaultValue": "success"
    }
  ],
  "configure": {
    "props": {
      "isExtends": true,
      "override": [
        {
          "name": "type",
          "setter": "AltStringSetter"
        }
      ]
    }
  }
}
```
