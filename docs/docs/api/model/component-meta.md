---
title: ComponentMeta
sidebar_position: 15
---

> **@types** [IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)<br/> > **@since** v1.0.0

## Overview

Component metadata model

## Properties

### componentName

Component name

`@type {string}`

### isContainer

Whether this is a container component

`@type {boolean}`

### isMinimalRenderUnit

Whether this is a minimal render unit

When the component needs to re-render:

- If it is a minimal render unit, only the current component is re-rendered.
- If it is not a minimal render unit, the nearest minimal render unit in the parent hierarchy is re-rendered, up to the root node.

`@type {boolean}`

### isModal

Whether this is a modal component

`@type {boolean}`

### configure

Configuration used for display in the settings panel

`@type {IPublicTypeFieldConfig[]}`

Related types: [IPublicTypeFieldConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/field-config.ts)

### title

Title

`@type {string | IPublicTypeI18nData | ReactElement}`

Related types: [IPublicTypeI18nData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/i18n-data.ts)

### icon

Icon

`@type {IPublicTypeIconType}`

Related types: [IPublicTypeIconType](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/icon-type.ts)

### npm

Component npm information

`@type {IPublicTypeNpmInfo}`

Related types: [IPublicTypeNpmInfo](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/npm-info.ts)

### availableActions

Get metadata

`@type {IPublicTypeTransformedComponentMetadata}`

Related types: [IPublicTypeTransformedComponentMetadata](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/transformed-component-metadata.ts)

### advanced

Advanced configuration section in component metadata

`@type {IPublicTypeAdvanced}`

Related types: [IPublicTypeAdvanced](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/advanced.ts)

## Methods

### setNpm

Set npm information

```typescript
/**
 * Set npm info
 * set method for npm inforamtion
 * @param npm
 */
setNpm(npm: IPublicTypeNpmInfo): void;
```

Related types: [IPublicTypeNpmInfo](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/npm-info.ts)

### getMetadata

Get metadata

```typescript
/**
 * Get metadata
 * get component metadata
 */
getMetadata(): IPublicTypeTransformedComponentMetadata;
```

Related types: [IPublicTypeTransformedComponentMetadata](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/transformed-component-metadata.ts)

### checkNestingUp

Check whether the current node can be placed in the parent node

```typescript
/**
 * Check whether the current node can be placed under the parent
 * check if the current node could be placed in parent node
 * @param my current node
 * @param parent parent node
 */
checkNestingUp(my: IPublicModelNode | IPublicTypeNodeData, parent: any): boolean;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)

### checkNestingDown

Check whether the target node(s) can be placed in the current node

```typescript
/**
 * Check whether the target node can be placed under the parent node
 * check if the target node(s) could be placed in current node
 * @param my current node
 * @param parent parent node
 */
checkNestingDown(
    my: IPublicModelNode | IPublicTypeNodeData,
    target: IPublicTypeNodeSchema | IPublicModelNode | IPublicTypeNodeSchema[],
  ): boolean;
```

Related types:

- [IPublicModelNode](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/node.ts)
- [IPublicTypeNodeData](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-data.ts)
- [IPublicTypeNodeSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/node-schema.ts)

### refreshMetadata

Refresh metadata; triggers re-parsing and refresh of metadata

```typescript
/**
 * Refresh metadata; triggers re-parse and refresh of metadata
 * refresh metadata
 */
refreshMetadata(): void;
```
