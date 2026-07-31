---
title: workspace - Application-level API
sidebar_position: 10
---

> **[@experimental](./#experimental)**<br/> > **@types** [IPublicApiWorkspace](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/workspace.ts)<br/> > **@since** v1.1.0

## Module Overview

Use this module to build application-level low-code designers.

## Variables

### isActive

Whether workspace mode is enabled

### window

Current designer window model

```typescript
get window(): IPublicModelWindow
```

Related model: [IPublicModelWindow](./model/window)

### plugins

Application-level plugin registration

```typescript
get plugins(): IPublicApiPlugins
```

Related model: [IPublicApiPlugins](./plugins)

### skeleton

Application-level panel management

```typescript
get skeleton(): IPublicApiSkeleton
```

Related model: [IPublicApiSkeleton](./skeleton)

### windows

Editor windows in the current designer

```typescript
get window(): IPublicModelWindow[]
```

Related model: [IPublicModelWindow](./model/window)

### resourceList

Resource list data for the current designer

```
get resourceList(): IPublicModelResource;
```

Related model: [IPublicModelResource](./model/resource)

## Methods

### registerResourceType

Register a resource type

```typescript
/** Register a resource type */
registerResourceType(resourceTypeModel: IPublicTypeResourceType): void;
```

Related type: [IPublicTypeResourceType](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/resource-type.ts)

### setResourceList

Set designer resource list data

```typescript
setResourceList(resourceList: IPublicResourceList) {}
```

Related type: [IPublicResourceData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/resource-list.ts)

### openEditorWindow

Open an editor window

```typescript
/**
 * Open an editor window
 * @deprecated
 */
openEditorWindow(resourceName: string, id: string, extra: Object, viewName?: string, sleep?: boolean): Promise<void>;

/** Open an editor window */
openEditorWindow(resource: Resource, sleep?: boolean): Promise<void>;
```

### openEditorWindowById

Open a window by view id

```typescript
openEditorWindowById(id: string): void;
```

### removeEditorWindow

Remove an editor window

```typescript
/**
 * Remove an editor window
 * @deprecated
 */
removeEditorWindow(resourceName: string, id: string): void;

/**
 * Remove an editor window
 */
removeEditorWindow(resource: Resource): void;
```

### removeEditorWindowById

Remove a window by view id

```typescript
removeEditorWindowById(id: string): void;
```

## Events

### onChangeWindows

Window add/remove event

```typescript
function onChangeWindows(fn: () => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onChangeActiveWindow

Active window change event

```typescript
function onChangeActiveWindow(fn: () => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onResourceListChange

Designer resource list change event

```typescript
onResourceListChange(fn: (resourceList: IPublicResourceList): void): (): IPublicTypeDisposable;
```

- Related type: [IPublicResourceOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/resource-options.ts)
- Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
