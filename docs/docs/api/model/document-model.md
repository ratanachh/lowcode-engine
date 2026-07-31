---
title: DocumentModel
sidebar_position: 0
---

> **@types** [IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)<br/> > **@since** v1.0.0

## Overview

Document model

## Properties

### id

Unique ID

`@type {string}`

### selection

Canvas node selection model instance

`@type {IPublicModelSelection}`

Related sections: [Node Selection Model](./selection)

Related types: [IPublicModelSelection](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/selection.ts)

### detecting

Canvas node hover model instance

`@type {IPublicModelDetecting}`

Related sections: [Canvas Node Hover Model](./detecting)

Related types: [IPublicModelDetecting](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/detecting.ts)

### history

Operation history model instance

`@type {IPublicModelHistory}`

Related sections: [Operation History Model](./history)

Related types: [IPublicModelHistory](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/history.ts)

### project

Get the project that owns the current document model

`@type {IPublicApiProject}`

Related types: [IPublicApiProject](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/project.ts)

### root

Get the root node of the document

`@type {IPublicModelNode | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### nodesMap

Get a Map of all nodes in the document, keyed by nodeId

`@type {Map<string, IPublicModelNode>} `

Related sections: [Node Model](./node)

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### modalNodesManager

Modal nodes manager

`@type {IPublicModelModalNodesManager | null}`

Related sections: [Modal Nodes Manager](./modal-nodes-manager)

Related types: [IPublicModelModalNodesManager](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/modal-nodes-manager.ts)

### dropLocation

The document's dropLocation

`@type {IPublicModelDropLocation | null}`

Related types: [IPublicModelDropLocation](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/drop-location.ts)

**@since v1.1.0**

## Methods

### getNodeById

Return a [Node](./node) instance by nodeId

```typescript
/**
 * Return Node instance by nodeId
 * get node by nodeId
 * @param nodeId
 * @returns
 */
getNodeById(nodeId: string): IPublicModelNode | null;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### importSchema

Import schema

```typescript
/**
 * Import schema
 * import schema data
 * @param schema
 */
importSchema(schema: IPublicTypeRootSchema): void;
```

Related types: [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

### exportSchema

Export schema

```typescript
/**
 * Export schema
 * export schema
 * @param stage
 * @returns
 */
exportSchema(stage: IPublicEnumTransformStage): IPublicTypeRootSchema | undefined;
```

Related types:

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

### insertNode

Insert a node

```typescript
/**
 * Insert a node
 * insert a node
 */
insertNode(
  parent: IPublicModelNode,
  thing: IPublicModelNode,
  at?: number | null | undefined,
  copy?: boolean | undefined
): IPublicModelNode | null;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### createNode

Create a node

```typescript
/**
 * Create a node
 * create a node
 * @param data
 * @returns
 */
createNode(data: any): IPublicModelNode | null;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### removeNode

Remove the specified node or node id

```typescript
/**
 * Remove the specified node / node id
 * remove a node by node instance or nodeId
 * @param idOrNode
 */
removeNode(idOrNode: string | IPublicModelNode): void;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### checkNesting

Check whether the drop target node can accept the dragged object

```typescript
/**
 * Check whether the drop target can accept the drag object
 * check if dragOjbect can be put in this dragTarget
 * @param dropTarget drop target node
 * @param dragObject drag object
 * @returns boolean whether drop is allowed
 * @since v1.0.16
 */
checkNesting(
  dropTarget: IPublicModelNode,
  dragObject: IPublicTypeDragNodeObject | IPublicTypeDragNodeDataObject
): boolean;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDragNodeObject](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/drag-node-object.ts)
- [IPublicTypeDragNodeDataObject](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/drag-node-object-data.ts)

**@since v1.0.16**

### isDetectingNode

Check whether the given node is currently being detected (hovered)

```typescript
/**
 * Check whether the current node is being detected
 * check is node being detected
 * @param node
 * @since v1.1.0
 */
isDetectingNode(node: IPublicModelNode): boolean;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.1.0**

## Events

### onAddNode

Event fired when a new node is added to the current document

```typescript
/**
 * Current document node-added event
 * set callback for event on node is created for a document
 */
onAddNode(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onMountNode

Event fired when a new node is added to the current document and has been mounted to the document

```typescript
/**
 * Current document node-added event; node is already mounted on the document
 * set callback for event on node is mounted to canvas
 */
onMountNode(fn: (payload: { node: IPublicModelNode }) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onRemoveNode

Event fired when a node is removed from the current document

```typescript
/**
 * Current document node-removed event
 * set callback for event on node is removed
 */
onRemoveNode(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onChangeDetecting

Event fired when hover state changes in the current document

```typescript
/**
 * Current document hover change event
 *
 * set callback for event on detecting changed
 */
onChangeDetecting(fn: (node: IPublicModelNode) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onChangeSelection

Event fired when selection changes in the current document

```typescript
/**
 * Current document selection change event
 * set callback for event on selection changed
 */
onChangeSelection(fn: (ids: string[]) => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onChangeNodeVisible

Event fired when a node's visibility changes in the current document

```typescript
/**
 * Current document node visibility change event
 * set callback for event on visibility changed for certain node
 * @param fn
 */
onChangeNodeVisible(fn: (node: IPublicModelNode, visible: boolean) => void): IPublicTypeDisposable;
```

- Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onChangeNodeChildren

Event fired when a node's children change in the current document

```typescript
onChangeNodeChildren(fn: (info?: IPublicTypeOnChangeOptions) => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onChangeNodeProp

Event fired when a node property is modified in the current document

```typescript
onChangeNodeProp(fn: (info: IPublicTypePropChangeOptions) => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onImportSchema

Event fired when a new schema is imported into the current document

```typescript
/**
 * import schema event
 * @param fn
 * @since v1.0.15
 */
onImportSchema(fn: (schema: IPublicTypeRootSchema) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

**@since v1.0.15**

### onFocusNodeChanged

Set a callback for when the focused node changes

```typescript
/**
 * Set callback for focus node changes
 * triggered focused node is set mannually from plugin
 * @param fn
 * @since v1.1.0
 */
onFocusNodeChanged(
  fn: (doc: IPublicModelDocumentModel, focusNode: IPublicModelNode) => void,
): IPublicTypeDisposable;
```

Related types:

- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

**@since v1.1.0**

### onDropLocationChanged

Set a callback for when DropLocation changes

```typescript
/**
 * Set callback for DropLocation changes
 * triggered when drop location changed
 * @param fn
 * @since v1.1.0
 */
onDropLocationChanged(fn: (doc: IPublicModelDocumentModel) => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.1.0**
