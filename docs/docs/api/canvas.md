---
title: canvas - Canvas API
sidebar_position: 10
---

> **@types** [IPublicApiCanvas](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/canvas.ts)<br/> > **@since** v1.1.0

## Module Overview

This module exposes canvas drag-and-drop related capabilities.

## Variables

### dragon

Get the drag operation instance

`@type {IPublicModelDragon | null}`

Related type: [IPublicModelDragon](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/dragon.ts)

### activeTracker

Get the active tracker instance

`@type {IPublicModelActiveTracker | null}`

Related type: [IPublicModelActiveTracker](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/active-tracker.ts)

### isInLiveEditing

Whether LiveEditing mode is active

`@type {boolean}`

### clipboard

Global clipboard instance

`@type {IPublicModelClipboard}`

Related type: [IPublicModelClipboard](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/clipboard.ts)

## Methods

### createLocation

Create a document insertion location object describing where a node will be inserted in the document

```typescript
/**
 * Create a document insertion location object describing where a node will be inserted in the document
 * create a drop location for document, drop location describes a location in document
 * @since v1.1.0
 */
createLocation(locationData: IPublicTypeLocationData): IPublicModelDropLocation;
```

### createScroller

Create a Scroller that gives a view basic scroll capability,

```typescript
/**
 * Create a Scroller that gives a view basic scroll capability,
 * a Scroller is a controller that gives a view (IPublicTypeScrollable) the ability scrolling
 * to some cordination by api scrollTo.
 *
 * when a scroller is inited, will need to pass is a scrollable, which has a scrollTarget.
 * and when scrollTo(options: { left?: number; top?: number }) is called, scroller will
 * move scrollTarget`s top-left corner to (options.left, options.top) that passed in.
 * @since v1.1.0
 */
createScroller(scrollable: IPublicTypeScrollable): IPublicModelScroller;

```

### createScrollTarget

Create a ScrollTarget that works with Scroller — see [createScroller](#createscroller)

```typescript
/**
 * Create a ScrollTarget that works with Scroller — see createScroller
 * this works with Scroller, refer to createScroller`s description
 * @since v1.1.0
 */
createScrollTarget(shell: HTMLDivElement): IPublicModelScrollTarget;
```
