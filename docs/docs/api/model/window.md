---
title: Window
sidebar_position: 12
---

> **[@experimental](./#experimental)**<br/> > **@types** [IPublicModelWindow](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/window.ts)<br/> > **@since** v1.1.0

## Overview

Low-code designer window model

## Properties

### id

Unique window id

`@type {string}`

### title

Window title

`@type {string}`

### icon

`@type {ReactElement}`

### resource

Resource associated with the window

`@type {IPublicModelResource}`

Related model: [IPublicModelResource](./resource)

### currentEditorView

Current view of the window

`@type {IPublicModelEditorView}`

Related model: [IPublicModelEditorView](./editor-view)

**@since v1.1.7**

### editorViews

All views of the window

`@type {IPublicModelEditorView[]}`

Related model: [IPublicModelEditorView](./editor-view)

**@since v1.1.7**

## Methods

### importSchema

Import schema into the current window; invokes the import hook of the resource associated with the window

```typescript
function importSchema(schema: IPublicTypeNodeSchema): void;
```

Related types: [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

### changeViewType

Change the current window view type

```typescript
function changeViewType(viewName: string): void;
```

### save

Save the current window; invokes the save hook of the resource associated with the window

```typescript
function save(): Promise(void)
```

## Events

### onChangeViewType

Window view change event

```
onChangeViewType(fn: (viewName: string) => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onSave

Window save event

```
onSave(fn: () => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.7**
