---
title: Dragon
sidebar_position: 99
---

> **@types** [IPublicModelDragon](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/dragon.ts)<br/> > **@since** v1.0.0

## Overview

Drag object

### Related Interface

```typescript
import { IPublicModelDragon } from '@rchh/lowcode-types';
```

### Supported Version

**@since** v1.1.0

## Properties

### dragging

Whether a drag is in progress

```typescript
/**
 * is dragging or not
 */
get dragging(): boolean;
```

## Methods

### onDragstart

Bind the dragstart event

```typescript
/**
 * Bind dragstart event
 * bind a callback function which will be called on dragging start
 * @param func
 * @returns
 */
onDragstart(func: (e: IPublicModelLocateEvent) => any): () => void;
```

### onDrag

Bind the drag event

```typescript
/**
 * Bind drag event
 * bind a callback function which will be called on dragging
 * @param func
 * @returns
 */
onDrag(func: (e: IPublicModelLocateEvent) => any): () => void;
```

### onDragend

Bind the dragend event

```typescript
/**
 * Bind dragend event
 * bind a callback function which will be called on dragging end
 * @param func
 * @returns
 */
onDragend(func: (o: { dragObject: IPublicModelDragObject; copy?: boolean }) => any): () => void;
```

### from

Set the shell element for drag monitoring and a custom drag transform function (boost)

```typescript
/**
 * Set the drag monitor region shell and custom drag boost function
* set a html element as shell to dragon as monitoring target, and
* set boost function which is used to transform a MouseEvent to type
* IPublicTypeDragNodeDataObject.
 * @param shell drag monitor region
 * @param boost drag boost function
 */
from(shell: Element, boost: (e: MouseEvent) => IPublicTypeDragNodeDataObject | null): any;
```

### boost

Launch a drag object

```typescript
/**
 * Emit a drag object
 * boost your dragObject for dragging(flying)
 *
 * @param dragObject drag object
 * @param boostEvent initial drag event
 */
boost(dragObject: IPublicTypeDragObject, boostEvent: MouseEvent | DragEvent, fromRglNode?: IPublicModelNode): void;
```

### addSensor

Add a drop sensor area

```typescript
/**
 * Add a drop sensor area
 * add sensor area
 */
addSensor(sensor: any): void;
```

### removeSensor

Remove a drop sensor area

```typescript
/**
 * Remove drop sensing
 * remove sensor area
 */
removeSensor(sensor: any): void;
```
