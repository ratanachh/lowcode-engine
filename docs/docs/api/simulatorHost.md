---
title: simulatorHost - Simulator API
sidebar_position: 10
---

> **@types** [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)<br/> > **@since** v1.0.0

## Module Overview

Simulator-related APIs, including canvas size, locale, and more.

## Methods

### set

Set host configuration values

```typescript
/**
 * Set variables used for canvas rendering, such as canvas size, locale, etc.
 * set config for simulator host, eg. device locale and so on.
 * @param key
 * @param value
 */
set(key: string, value: any): void;
```

**Example**
Set variables used for canvas rendering, such as canvas size, locale, etc.

Example — setting canvas size:
Three customization approaches are supported:

```typescript
// Use built-in device types directly
project.simulatorHost.set('device', 'mobile' / 'iphonex' / 'iphone6' / 'default');
// Customize canvas style class
project.simulatorHost.set('deviceClassName', 'my-canvas-class');
// Most flexible: set canvas / viewport styles directly (canvas is the outer frame, viewport is the inner frame; set phone/tablet background on canvas)
project.simulatorHost.set('deviceStyle', {
  canvas: { width: '300px', backgroundColor: 'red' },
  viewport: { width: '280px' },
});
```

### get

Get variables set in the simulator, such as canvas size, locale, etc.

```typescript
/**
 * Get variables set in the simulator, such as canvas size, locale, etc.
 * set config value by key
 * @param key
 * @returns
 */
get(key: string): any;

```

### rerender

Trigger component build and refresh the canvas

```typescript
/**
 * Trigger component build and refresh the canvas
 * make simulator render again
 */
rerender(): void;
```

### scrollToNode

Scroll to a specific node

```typescript
/**
 * Scroll to a specific node
 * scroll to specific node
 * @param node
 * @since v1.1.0
 */
scrollToNode(node: IPublicModelNode): void;
```

**@since v1.1.0**
