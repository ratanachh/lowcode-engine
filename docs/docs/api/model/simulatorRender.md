---
title: SimulatorRender
sidebar_position: 6
---

> **@types** [IPublicModelSimulatorRender](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/simulator-render.ts)<br/> > **@since** v1.0.0

## Overview

Canvas simulator render model

## Properties

### components

Canvas component list

```typescript
/**
  * Canvas component list
  */
components: {
  [key: string]: any;
}
```

## Methods

### rerender

Trigger canvas re-render

```typescript
/**
 * Trigger canvas re-render
 */
rerender: () => void;
```
