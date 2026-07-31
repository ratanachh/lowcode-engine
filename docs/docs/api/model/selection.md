---
title: Selection
sidebar_position: 6
---

> **@types** [IPublicModelSelection](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/selection.ts)<br/> > **@since** v1.0.0

## Overview

Canvas node selection model

## Properties

### selected

Returns the ids of selected nodes

`@type {string[]}`

### node

Returns the selected node (if multiple nodes are selected, only the first is returned)

`@type {IPublicModelNode | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.1.0**

## Methods

### select

Select the specified node (replace mode)

```typescript
/**
* Select the specified node (overwrite)
* select node with id, this will override current selection
* @param id
*/
select(id: string): void;
```

### selectAll

Select multiple specified nodes in batch

```typescript
/**
* Select the specified nodes in batch
* select node with ids, this will override current selection
*
* @param ids
*/
selectAll(ids: string[]): void;
```

### remove

**Deselect** the specified selected node; does not delete the component

```typescript
/**
* Remove the specified selected node
* remove node from selection with node id
* @param id
*/
remove(id: string): void;
```

### clear

**Deselect** all selected nodes; does not delete components

```typescript
/**
* Clear all selected nodes
* clear current selection
*/
clear(): void;
```

### has

Check whether the specified node is selected

```typescript
/**
* Check whether the specified node is selected
* check if node with specific id is selected
* @param id
*/
has(id: string): boolean;
```

### add

Select the specified node (additive mode)

```typescript
/**
* Select the specified node (incremental)
* add node with specific id to selection
* @param id
*/
add(id: string): void;
```

### getNodes

Get selected node instances

```typescript
/**
* Get selected node instances
* get selected nodes
*/
getNodes(): IPublicModelNode[];
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### getTopNodes

Get top-level nodes in the selection.
For example, if the selected nodes are:

- DivA
  - ChildrenA
- DivB

getNodes returns [DivA, ChildrenA, DivB], while getTopNodes returns [DivA, DivB]. ChildrenA is a second-level node and is not returned by getTopNodes.

```typescript
/**
* Get top-level nodes of the selection
* get seleted top nodes
* for example:
*  getNodes() returns [A, subA, B], then
*  getTopNodes() will return [A, B], subA will be removed
* @since v1.0.16
*/
getTopNodes(includeRoot?: boolean): IPublicModelNode[];
```

**@since v1.0.16**

## Events

### onSelectionChange

Register a callback for selection change events

```typescript
/**
* Register selection change callback
* set callback which will be called when selection is changed
* @since v1.1.0
*/
onSelectionChange(fn: (ids: string[]) => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.0**
