---
title: Detecting
sidebar_position: 6
---

> **@types** [IPublicModelDetecting](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/detecting.ts)<br/> > **@since** v1.0.0

## Overview

Canvas node hover model

## Properties

### current

Currently hovered node

`@type {IPublicModelNode | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.0.16**

### enable

Whether hover detection is enabled

`@type {boolean}`

## Methods

### capture

Hover the specified node

```typescript
/**
 * Hover the specified node
 * capture node with nodeId
 * @param id node id
 */
capture(id: string): void;
```

### release

Leave hover on the specified node

```typescript
/**
 * Leave hover on the specified node
 * release node with nodeId
 * @param id node id
 */
release(id: string): void;
```

### leave

Clear all hover state

```typescript
/**
 * Clear hover state
 * clear all hover state
 */
leave(): void;
```

## Events

### onDetectingChange

Event fired when the hovered node changes

```typescript
/**
 * Hover node change event
 * set callback which will be called when hovering object changed.
 * @since v1.1.0
 */
onDetectingChange(fn: (node: IPublicModelNode | null) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.0**
