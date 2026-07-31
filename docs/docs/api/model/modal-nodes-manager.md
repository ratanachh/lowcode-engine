---
title: ModalNodesManager
sidebar_position: 7
---

> **@types** [IPublicModelModalNodesManager](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/modal-nodes-manager.ts)<br/> > **@since** v1.0.0

## Overview

Modal nodes manager model

## Methods

### setNodes

Set modal nodes and trigger internal events

```typescript
/**
 * Set modal node and trigger internal events
 * set modal nodes, trigger internal events
 */
setNodes(): void;
```

### getModalNodes

Get modal node(s)

```typescript
/**
 * Get modal node(s)
 * get modal nodes
 */
getModalNodes(): IPublicModelNode[];
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### getVisibleModalNode

Get the currently visible modal node

```typescript
/**
 * Get the currently visible modal node
 * get current visible modal node
 */
getVisibleModalNode(): IPublicModelNode | null;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### hideModalNodes

Hide modal node(s)

```typescript
/**
 * Hide modal node(s)
 * hide modal nodes
 */
hideModalNodes(): void;
```

### setVisible

Set the specified node to visible

```typescript
/**
 * Set the specified node as visible
 * set specific model node as visible
 * @param node IPublicModelNode
 */
setVisible(node: IPublicModelNode): void;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### setInvisible

Set the specified node to invisible

```typescript
/**
 * Set the specified node as invisible
 * set specific model node as invisible
 * @param node IPublicModelNode
 */
setInvisible(node: IPublicModelNode): void;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
