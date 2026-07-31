---
title: NodeChildren
sidebar_position: 2
---

> **@types** [IPublicModelNodeChildren](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node-children.ts)<br/> > **@since** v1.0.0

## Overview

Node children model

## Properties

### owner

Returns the node instance that owns this children instance

`@type {IPublicModelNode | null}`

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### size

Number of node instances in children

`@type {number}`

### isEmptyNode

Whether children is empty

`@type {boolean}`

**@since v1.1.0**

> Before v1.1.0, use `isEmpty`

### notEmptyNode

Whether children is not empty

`@type {boolean}`

**@since v1.1.0**

## Methods

### delete

Delete the specified node

```typescript
/**
 * Delete the specified node
 * delete the node
 * @param node
 */
delete(node: IPublicModelNode): boolean;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### insert

Insert a node

```typescript
/**
 * Insert a node
 * insert the node
 * @param node
 */
insert(node: IPublicModelNode): boolean;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### indexOf

Return the index of the specified node

```typescript
/**
 * Return the index of the specified node
 * get index of node in current children
 * @param node
 * @returns
 */
indexOf(node: IPublicModelNode): number;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### splice

Similar to Array.prototype.splice

```typescript
/**
 * Similar to Array.splice
 * provide the same function with {Array.prototype.splice}
 * @param start
 * @param deleteCount
 * @param node
 */
splice(start: number, deleteCount: number, node?: IPublicModelNode): any;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### get

Return the node at the specified index

```typescript
/**
 * Return the node at the specified index
 * get node with index
 * @param index
 * @returns
 */
get(index: number): IPublicModelNode | null;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### has

Whether children contains the specified node

```typescript
/**
 * Whether it contains the specified node
 * check if node exists in current children
 * @param node
 * @returns
 */
has(node: IPublicModelNode): boolean;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### forEach

Similar to Array.prototype.forEach

```typescript
/**
 * Similar to Array.forEach
 * provide the same function with {Array.prototype.forEach}
 * @param fn
 */
forEach(fn: (node: IPublicModelNode, index: number) => void): void;

```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### reverse

Similar to Array.prototype.reverse

```typescript
/**
 * Similar to Array.reverse
 * provide the same function with {Array.prototype.reverse}
 */
reverse(): IPublicModelNode[];

```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### map

Similar to Array.prototype.map

```typescript
/**
 * Similar to Array.map
 * provide the same function with {Array.prototype.map}
 * @param fn
 */
map<T>(fn: (node: IPublicModelNode, index: number) => T[]): any[] | null;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### every

Similar to Array.prototype.every

```typescript
/**
 * Similar to Array.every
 * provide the same function with {Array.prototype.every}
 * @param fn
 */
every(fn: (node: IPublicModelNode, index: number) => boolean): boolean;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### some

Similar to Array.prototype.some

```typescript
/**
 * Similar to Array.some
 * provide the same function with {Array.prototype.some}
 * @param fn
 */
some(fn: (node: IPublicModelNode, index: number) => boolean): boolean;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### filter

Similar to Array.prototype.filter

```typescript
/**
 * Similar to Array.filter
 * provide the same function with {Array.prototype.filter}
 * @param fn
 */
filter(fn: (node: IPublicModelNode, index: number) => boolean): any;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### find

Similar to Array.prototype.find

```typescript
/**
 * Similar to Array.find
 * provide the same function with {Array.prototype.find}
 * @param fn
 */
find(fn: (node: IPublicModelNode, index: number) => boolean): IPublicModelNode | null;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### reduce

Similar to Array.prototype.reduce

```typescript
/**
 * Similar to Array.reduce
 * provide the same function with {Array.prototype.reduce}
 * @param fn
 */
reduce(fn: (acc: any, cur: IPublicModelNode) => any, initialValue: any): void;
```

Related types: [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)

### importSchema

Import schema

```typescript
/**
 * Import schema
 * import schema
 * @param data
 */
importSchema(data?: IPublicTypeNodeData | IPublicTypeNodeData[]): void;
```

Related types: [IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)

### exportSchema

Export schema

```typescript
/**
 * Export schema
 * export schema
 * @param stage
 */
exportSchema(stage: IPublicEnumTransformStage): IPublicTypeNodeSchema;
```

Related types:

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

### mergeChildren

Perform add, remove, sort, and other operations

```typescript
/**
 * Perform add, remove, sort, and related operations
 * excute remove/add/sort operations
 * @param remover
 * @param adder
 * @param sorter
 */
mergeChildren(
  remover: (node: IPublicModelNode, idx: number) => boolean,
  adder: (children: IPublicModelNode[]) => IPublicTypeNodeData[] | null,
  sorter: (firstNode: IPublicModelNode, secondNode: IPublicModelNode) => number
): any;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)
