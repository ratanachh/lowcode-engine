---
title: Node
sidebar_position: 1
---

> **@types** [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)<br/> > **@since** v1.0.0

## Overview

Node model

## Properties

### id

Node id

`@type {string}`

### title

Node title

`@type {string | IPublicTypeI18nData | ReactElement}`

Related types: [IPublicTypeI18nData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/i18n-data.ts)

### isContainerNode

Whether this is a container node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isContainer`

### isRootNode

Whether this is the root node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isRoot`

### isEmptyNode

Whether this is an empty node (no children or empty children)

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isEmpty`

### isPageNode

Whether this is a Page node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isPage`

### isComponentNode

Whether this is a Component node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isComponent`

### isModalNode

Whether this is a modal node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isModal`

### isSlotNode

Whether this is a slot node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isSlot`

### isParentalNode

Whether this is a parent/branch node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isParental`

### isLeafNode

Whether this is a leaf node

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isLeaf`

### isLocked

Get the lock state of the current node

**@since v1.0.16**

### isRGLContainerNode

Set as a tile layout node. For usage, see: [Implementation of tile layout in the DingTalk Yida report design engine](https://mp.weixin.qq.com/s/PSTut5ahAB8nlJ9kBpBaxw)

`@type {boolean}`

**@since v1.1.0**

> v1.0.16 - v1.1.0, use `isRGLContainer`

### index

Index

`@type {number}`

### icon

Icon

`@type {IPublicTypeIconType}`

Related types: [IPublicTypeIconType](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/icon-type.ts)

### zLevel

Depth of the node in the tree; root node depth is 0

`@type {number}`

### componentName

Node componentName

`@type {string}`

### componentMeta

Material metadata of the node

`@type {IPublicModelComponentMeta | null}`

Related types: [IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

### document

Get the [Document Model](./document-model) that owns this node

`@type {IPublicModelDocumentModel | null}`

Related types: [IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)

### prevSibling

Get the previous sibling node

`@type {IPublicModelNode | null}`

### nextSibling

Get the next sibling node

`@type {IPublicModelNode | null}`

### parent

Get the parent node

`@type {IPublicModelNode | null}`

### children

Get the children model of the current node

`@type {IPublicModelNodeChildren | null}`

Related types: [IPublicModelNodeChildren](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node-children.ts)

### slots

Slot nodes mounted on this node

`@type {IPublicModelNode[]}`

### slotFor

When the current node is a slot node, returns the corresponding prop instance

`@type {IPublicModelProp | null}`

Related types: [IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

### props

Returns the node's property collection

`@type {IPublicModelProps | null}`

Related types: [IPublicModelProps](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/props.ts)

### propsData

Returns the values of the node's property collection

`@type {IPublicTypePropsMap | IPublicTypePropsList | null}`

Related types:

- [IPublicTypePropsMap](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/props-map.ts)
- [IPublicTypePropsList](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/props-list.ts)

### conditionGroup

Get the condition group

`@type {IPublicModelExclusiveGroup | null}`

Related types: [IPublicModelExclusiveGroup](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/exclusive-group.ts)

**@since v1.1.0**

### schema

Get the node schema structure conforming to the low-code protocol

`@type {IPublicTypeNodeSchema | null}`

Related types: [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

### settingEntry

Get the corresponding setting entry

`@type {IPublicModelSettingTopEntry}`

Related sections: [Setting Top Entry](./setting-top-entry)

Related types: [IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

### visible

Whether the current node is visible

`@type {boolean}`

**@since v1.1.0**

## Methods

### getRect

Return the node's size and position information

```typescript
/**
 * Return node size and position info
 * get rect information for this node
 */
getRect(): DOMRect | null;
```

### hasSlots

Whether slot nodes are mounted

```typescript
/**
 * Whether there are mounted slot nodes
 * check if current node has slots
 */
hasSlots(): boolean;
```

### hasCondition

Whether a render condition is set

```typescript
/**
 * Whether a render condition is set
 * check if current node has condition value set
 */
hasCondition(): boolean;
```

### hasLoop

Whether loop data is set

```typescript
/**
 * Whether loop data is set
 * check if loop is set for this node
 */
hasLoop(): boolean;
```

### getProp

Get the property model instance at the specified path

```typescript
/**
 * Get the prop model instance at the specified path
 * get prop by path
 * @param path prop path; supports a / a.b / a.0 formats
 */
getProp(path: string, createIfNone: boolean): IPublicModelProp | null;
```

Related types: [IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

### getPropValue

Get the value of the property model instance at the specified path

```typescript
/**
 * Get the prop model value at the specified path
 * get prop value by path
 * @param path prop path; supports a / a.b / a.0 formats
 */
getPropValue(path: string): any;
```

### getExtraProp

Get the property model instance at the specified path. Note: when exporting, unlike regular properties, this property is not nested under `props` but is a sibling of `props`.

```typescript
/**
 * Get the prop model instance at the specified path,
 *  Note: when exporting, unlike normal props, this field is not under props but at the same level as props
 *
 * get extra prop by path, an extra prop means a prop not exists in the `props`
 * but as siblint of the `props`
 * @param path prop path; supports a / a.b / a.0 formats
 * @param createIfNone Whether to create a prop when none exists
 */
getExtraProp(path: string, createIfNone?: boolean): IPublicModelProp | null;
```

Related types: [IPublicModelProp](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/prop.ts)

### getExtraPropValue

Get the value of the property model instance at the specified path. Note: when exporting, unlike regular properties, this property is not nested under `props` but is a sibling of `props`.

```typescript
/**
 * Get the prop model instance at the specified path,
 *  Note: when exporting, unlike normal props, this field is not under props but at the same level as props
 *
 * get extra prop value by path, an extra prop means a prop not exists in the `props`
 * but as siblint of the `props`
 * @param path prop path; supports a / a.b / a.0 formats
 * @returns
 */
getExtraPropValue(path: string): any;
```

### setPropValue

setPropValue(path: string, value: CompositeValue)

Set the value of the property model instance at the specified path

```typescript
/**
 * Set the prop model value at the specified path
 * set value for prop with path
 * @param path prop path; supports a / a.b / a.0 formats
 * @param value value
 */
setPropValue(path: string, value: IPublicTypeCompositeValue): void;
```

Related types: [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

### setExtraPropValue

Set the value of the property model instance at the specified path

```typescript
/**
 * Set the prop model value at the specified path
 * set value for extra prop with path
 * @param path prop path; supports a / a.b / a.0 formats
 * @param value value
 */
setExtraPropValue(path: string, value: IPublicTypeCompositeValue): void;
```

Related types: [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)

### importSchema

Import node data

```typescript
/**
 * Import node data
 * import node schema
 * @param data
 */
importSchema(data: IPublicTypeNodeSchema): void;
```

Related types: [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

### exportSchema

Export node data

```typescript
/**
 * Export node data
 * export schema from this node
 * @param stage
 * @param options
 */
exportSchema(stage: IPublicEnumTransformStage, options?: any): IPublicTypeNodeSchema;
```

Related types:

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

### insertBefore

Insert a node before the specified position

```typescript
/**
 * Insert a node before the specified position
 * insert a node befor current node
 * @param node
 * @param ref
 * @param useMutator
 */
insertBefore(
    node: IPublicModelNode,
    ref?: IPublicModelNode | undefined,
    useMutator?: boolean,
  ): void;
```

### insertAfter

Insert a node after the specified position

```typescript
/**
 * Insert a node after the specified position
 * insert a node after this node
 * @param node
 * @param ref
 * @param useMutator
 */
insertAfter(
    node: IPublicModelNode,
    ref?: IPublicModelNode | undefined,
    useMutator?: boolean,
  ): void;
```

### replaceChild

Replace the specified child node

```typescript
/**
 * Replace the specified child node
 * replace a child node with data provided
 * @param node child node to replace
 * @param data replacement node object or node description
 * @returns
 */
replaceChild(node: IPublicModelNode, data: any): IPublicModelNode | null;
```

### replaceWith

Replace the current node with the specified node schema

```typescript
/**
 * Replace the current node with the specified node description
 * replace current node with a new node schema
 * @param schema
 */
replaceWith(schema: IPublicTypeNodeSchema): any;
```

Related types: [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

### select

Select the current node instance

```typescript
/**
 * Select the current node instance
 * select current node
 */
select(): void;
```

### hover

Set hover state

```typescript
/**
 * Set hover state
 * set hover value for current node
 * @param flag
 */
hover(flag: boolean): void;
```

### lock

Set node lock state

```typescript
/**
 * Set node locked state
 * set lock value for current node
 * @param flag
 * @since v1.0.16
 */
lock(flag?: boolean): void;
```

**@since v1.0.16**

### remove

Remove the current node instance

```typescript
/**
 * Delete the current node instance
 * remove current node
 */
remove(): void;
```

### mergeChildren

Perform add, remove, sort, and other operations

```typescript
/**
 * Perform add, remove, sort, and related operations
 * excute remove/add/sort operations on node`s children
 *
 * @since v1.1.0
 */
mergeChildren(
  remover: (node: IPublicModelNode, idx: number) => boolean,
  adder: (children: IPublicModelNode[]) => any,
  sorter: (firstNode: IPublicModelNode, secondNode: IPublicModelNode) => number
): any;
```

**@since v1.1.0**

### contains

Whether the current node contains the given child node

```typescript
/**
 * Whether the current node contains a given child
 * check if current node contains another node as a child
 * @param node
 * @since v1.1.0
 */
contains(node: IPublicModelNode): boolean;
```

**@since v1.1.0**

### canPerformAction

Whether the given action can be performed

```typescript
/**
 * Whether a given action can be executed
 * check if current node can perform certain aciton with actionName
 * @param actionName action name
 * @since v1.1.0
 */
canPerformAction(actionName: string): boolean;
```

**@since v1.1.0**

### isConditionalVisible

Get the ConditionalVisible value of this node

```typescript
/**
 * Get the node's ConditionalVisible value
 * check if current node ConditionalVisible
 * @since v1.1.0
 */
isConditionalVisible(): boolean | undefined;
```

**@since v1.1.0**

### setConditionalVisible

Set ConditionalVisible to true for this node

```typescript
/**
 * Set the node's ConditionalVisible to true
 * make this node as conditionalVisible === true
 * @since v1.1.0
 */
setConditionalVisible(): void;
```

**@since v1.1.0**

### getDOMNode

Get the DOM node corresponding to this node instance

```typescript
/**
 * Get the DOM node for this node instance
 */
getDOMNode(): HTMLElement;

```

### getRGL

Get tile layout related information

```typescript
/**
 * Get magnet/tile related info
 */
getRGL(): {
  isContainerNode: boolean;
  isEmptyNode: boolean;
  isRGLContainerNode: boolean;
  isRGLNode: boolean;
  isRGL: boolean;
  rglNode: IPublicModelNode | null;
}
```
