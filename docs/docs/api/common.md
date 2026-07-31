---
title: common - Common API
sidebar_position: 10
---

> **@types** [IPublicApiCommon](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/common.ts)<br/> > **@since** v1.0.0

## Module Overview

The common module contains APIs outside the core modules, such as shared utils and panel extension helpers.

> Note: `skeletonCabin` / `designerCabin` naming exists for compatibility with an earlier engine version. These may be reorganized under more meaningful namespaces if needed.

## Variables

#### utils

Common utils — see method signatures below

Related type: [IPublicApiCommonUtils](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/common.ts)

#### skeletonCabin

Panel extension helpers — see method signatures below

## Methods

### utils

#### isNodeSchema

Whether the data is a valid schema structure

```typscript
/**
  * Whether the data is a valid schema structure
  * check if data is valid NodeSchema
  *
  * @param {*} data
  * @returns {boolean}
  */
isNodeSchema(data: any): boolean;
```

#### isFormEvent

Whether the event is a form event type

```typescript
/**
 * Whether the event is a form event type
 * check if e is a form event
 * @param {(KeyboardEvent | MouseEvent)} e
 * @returns {boolean}
 */
isFormEvent(e: KeyboardEvent | MouseEvent): boolean;
```

#### getNodeSchemaById

Find a node by id in a schema structure

```typescript
/**
 * Find a node by id in a schema structure
 * get node schema from a larger schema with node id
 * @param {IPublicTypeNodeSchema} schema
 * @param {string} nodeId
 * @returns {(IPublicTypeNodeSchema | undefined)}
 */
getNodeSchemaById(
    schema: IPublicTypeNodeSchema,
    nodeId: string,
  ): IPublicTypeNodeSchema | undefined;
```

Related type: [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

#### executeTransaction

Batch transaction for performance optimization in specific scenarios

```typescript
/**
 * Batch transaction for performance optimization in specific scenarios
 * excute something in a transaction for performence
 *
 * @param {() => void} fn
 * @param {IPublicEnumTransitionType} type
 * @since v1.0.16
 */
executeTransaction(fn: () => void, type: IPublicEnumTransitionType): void;
```

**@since v1.0.16**

**Example**

```typescript
import { common } from '@rchh/lowcode-engine';
import { IPublicEnumTransitionType } from '@rchh/lowcode-types';

common.utils.startTransaction(() => {
  node1.setProps();
  node2.setProps();
  node3.setProps();
  // ...
}, IPublicEnumTransitionType.repaint);
```

#### getConvertedExtraKey

Props key conversion utility

```typescript
getConvertedExtraKey(key: string): string

```

**@since v1.0.17**

#### createIntl

i18n utilities

```typescript
/**
 * i18n utilities
 * i18n tools
 *
 * @param {(string | object)} instance
 * @returns {{
 *     intlNode(id: string, params?: object): ReactNode;
 *     intl(id: string, params?: object): string;
 *     getLocale(): string;
 *     setLocale(locale: string): void;
 *   }}
 * @since v1.0.17
 */
createIntl(instance: string | object): {
  intlNode(id: string, params?: object): ReactNode;
  intl(id: string, params?: object): string;
  getLocale(): string;
  setLocale(locale: string): void;
};
```

**@since v1.0.17**

**Example**

```typescript
import { common } from '@rchh/lowcode-engine';
import enUS from './en-US.json';
import zhCN from './zh-CN.json';

const { intl, getLocale, setLocale } = common.utils.createIntl({
  'en-US': enUS,
  'zh-CN': zhCN,
});
```

#### intl

i18n conversion method

```typescript
/**
 * i18n conversion method
 */
intl(data: IPublicTypeI18nData | string, params?: object): string;
```

**Example**

```
const title = common.utils.intl(node.title)
```

### skeletonCabin

#### Workbench

Editor framework View

```typescript
/**
 * Editor framework View
 * get Workbench Component
 */
get Workbench(): Component;
```
