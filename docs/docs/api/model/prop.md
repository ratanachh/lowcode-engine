---
title: Prop
sidebar_position: 3
---

> **@types** [IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)<br/> > **@since** v1.0.0

## Overview

Property model

## Properties

### id

id

`@type {string}`

### key

Key value

`@type {string | number | undefined}`

### path

Returns the path of the current prop

`@type {string[]}`

### node

Returns the owning node instance

`@type {IPublicModelNode | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### slotNode

When this prop represents a Slot, returns the corresponding slotNode

`@type {IPublicModelNode | undefined | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

## Methods

### setValue

Set value

```typescript
/**
 * Set value
 * set value for this prop
 * @param val
 */
setValue(val: IPublicTypeCompositeValue): void;
```

Related types: [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

### getValue

Get value

```typescript
/**
 * Get value
 * get value of this prop
 */
getValue(): any;
```

### remove

Remove value

```typescript
/**
 * Remove value
 * remove value of this prop
 * @since v1.0.16
 */
remove(): void;
```

**@since v1.0.16**

### exportSchema

Export value

```typescript
/**
 * Export value
 * export schema
 * @param stage
 */
exportSchema(stage: IPublicEnumTransformStage): IPublicTypeCompositeValue;
```

Related types:

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)
