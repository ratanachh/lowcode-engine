---
title: DropLocation
sidebar_position: 13
---

> **@types** [IPublicModelDropLocation](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/drop-location.ts)<br/> > **@since** v1.1.0

## Overview

Drag-and-drop placement location model

## Properties

### target

Drop target node

`@type {IPublicModelNode | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### detail

Drop location details

`@type {IPublicTypeLocationDetail}`

Related types: [IPublicTypeLocationDetail](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/location-detail.ts)

### event

Event associated with the drop location

`@type {IPublicTypeLocationDetail}`

Related types: [IPublicModelLocateEvent](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/location-event.ts)

## Methods

### clone

Get a clone of the current object

```typescript
/**
 * Get a clone of the current object
 * get a clone object of current dropLocation
 */
clone(event: IPublicModelLocateEvent): IPublicModelDropLocation;
```

Related types: [IPublicModelLocateEvent](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/location-event.ts)
