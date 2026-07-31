---
title: History
sidebar_position: 5
---

> **@types** [IPublicModelHistory](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/history.ts)<br/> > **@since** v1.0.0

## Overview

Operation history model

## Methods

### go

Jump to a specific position in the history

```typescript
/**
 * Jump history to the specified cursor
 * go to a specific history
 * @param cursor
 */
go(cursor: number): void;
```

### back

Go back in history

```typescript
/**
 * Go back in history
 * go backward in history
 */
back(): void;
```

### forward

forward()

Go forward in history

```typescript
/**
 * Go forward in history
 * go forward in history
 */
forward(): void;
```

### savePoint

Save the current state

```typescript
/**
 * Save the current state
 * do save current change as a record in history
 */
savePoint(): void;
```

### isSavePoint

Whether the current state is a save point, i.e. whether there are unsaved changes

```typescript
/**
 * Whether the current state is a save point (has unsaved changes)
 * check if there is unsaved change for history
 */
isSavePoint(): boolean;
```

### getState

Get state flags indicating whether undo and redo are available

```typescript
/**
 * Get state to tell whether undo/redo is available
 * get flags in number which indicat current change state
 *
 *  |    1     |     1    |    1     |
 *  | -------- | -------- | -------- |
 *  | modified | redoable | undoable |
 * eg:
 *  7 means : modified && redoable && undoable
 *  5 means : modified && undoable
 */
getState(): number;
```

## Events

### onChangeState

Listen for state change events

```typescript
/**
 * Listen for state change events
 * monitor on stateChange event
 * @param func
 */
onChangeState(func: () => any): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onChangeCursor

Listen for history cursor position change events

```typescript
/**
 * Listen for history cursor position change events
 * monitor on cursorChange event
 * @param func
 */
onChangeCursor(func: () => any): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
