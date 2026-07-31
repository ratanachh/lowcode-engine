---
title: Props
sidebar_position: 4
---

> **@types** [IPublicModelProps](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/props.ts)<br/> > **@since** v1.0.0

## Overview

Properties collection model

## Properties

### id

id

`@type {string}`

### path

Returns the path of the current props

`@type {string[]}`

### node

Returns the node instance that owns this props collection

`@type {IPublicModelNode | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

## Methods

### getProp

Get the property model instance at the specified path

```typescript
/**
 * Get the prop model instance at the specified path
 * get prop by path
 * @param path prop path; supports a / a.b / a.0 formats
 */
getProp(path: string): IPublicModelProp | null;
```

Related types: [IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

### getPropValue

Get the value of the property model instance at the specified path

```typescript
/**
 * Get the prop model value at the specified path
 * get value of prop by path
 * @param path prop path; supports a / a.b / a.0 formats
 */
getPropValue(path: string): any;
```

### getExtraProp

Get the property model instance at the specified path. Note: when exporting, unlike regular properties, this property is not nested under `props` but is a sibling of `props`.

```typescript
/**
 * Get the prop model instance at the specified path,
 *  Note: when exporting, unlike normal props, this field is not under props but at the same level as props
 * get extra prop by path
 * @param path prop path; supports a / a.b / a.0 formats
 */
getExtraProp(path: string): IPublicModelProp | null;
```

Related types: [IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

### getExtraPropValue

Get the value of the property model instance at the specified path. Note: when exporting, unlike regular properties, this property is not nested under `props` but is a sibling of `props`.

```typescript
/**
 * Get the prop model value at the specified path
 *  Note: when exporting, unlike normal props, this field is not under props but at the same level as props
 * get value of extra prop by path
 * @param path prop path; supports a / a.b / a.0 formats
 */
getExtraPropValue(path: string): any;
```

### setPropValue

Set the value of the property model instance at the specified path

```typescript
/**
 * Set the prop model value at the specified path
 * set value of prop by path
 * @param path prop path; supports a / a.b / a.0 formats
 * @param value value
 */
setPropValue(path: string, value: IPublicTypeCompositeValue): void;
```

Related types: [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

### setExtraPropValue

Set the value of the property model instance at the specified path

```typescript
/**
 * Set the prop model value at the specified path
 * set value of extra prop by path
 * @param path prop path; supports a / a.b / a.0 formats
 * @param value value
 */
setExtraPropValue(path: string, value: IPublicTypeCompositeValue): void;
```

Related types: [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

### has

Whether the current props contains the specified prop

```typescript
/**
 * Whether current props contain a given prop
 * check if the specified key is existing or not.
 * @param key
 * @since v1.1.0
 */
has(key: string): boolean;
```

**@since v1.1.0**

### add

Add a prop

```typescript
/**
 * Add a prop
 * add a key with given value
 * @param value
 * @param key
 * @since v1.1.0
 */
add(value: IPublicTypeCompositeValue, key?: string | number | undefined): any;
```

Related types: [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

**@since v1.1.0**
