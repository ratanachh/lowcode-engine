---
title: Clipboard
sidebar_position: 14
---

> **@types** [IPublicModelClipboard](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/clipboard.ts)<br/> > **@since** v1.1.0

## Methods

### setData

Set clipboard data

```typescript
/**
 * Set clipboard value
 * set data to clipboard
 *
 * @param {*} data
 * @since v1.1.0
 */
setData(data: any): void;
```

### waitPasteData

Set a callback for when clipboard paste data is provided

```typescript
/**
 * Set the callback for clipboard data
 * set callback for clipboard provide paste data
 *
 * @param {KeyboardEvent} keyboardEvent
 * @param {(data: any, clipboardEvent: ClipboardEvent) => void} cb
 * @since v1.1.0
 */
waitPasteData(
    keyboardEvent: KeyboardEvent,
    cb: (data: any, clipboardEvent: ClipboardEvent) => void,
  ): void;
```
