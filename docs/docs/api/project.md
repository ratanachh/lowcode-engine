---
title: project - Model API
sidebar_position: 10
---

## Module Overview

The orchestration module includes several models:

- [Document Model DocumentModel](./model/document-model)
- [Node Model Node](./model/node)
- [Node Children Model NodeChildren](./model/node-children)
- [Property Model Prop](./model/prop)
- [Property Set Model Props](./model/props)

Their relationships are shown below:
![image.png](https://img.alicdn.com/imgextra/i3/O1CN01B1bAZi1asNU3KaSUJ_!!6000000003385-2-tps-1650-1352.png)

Within the document model, there are additional derived models:

- [History](./model/history)
- [Canvas Selection Selection](./model/selection)
- [Canvas Hover Detecting](./model/detecting)
- [Modal Node Manager ModalNodesManager](./model/modal-nodes-manager)

The entire model system is accessed through the `project` API. All model instances must be obtained via `project`, e.g. `project.currentDocument` for the current document model, or `project.currentDocument.nodesMap` for all nodes in the current document.

Below is a detailed introduction to the project API.

## Variables

### currentDocument

Get the current document instance

```typescript
/**
 * Get the current document
 * get current document
 */
get currentDocument(): IPublicModelDocumentModel | null;
```

Related type: [IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)

### documents

Get all documents in the current project

```typescript
/**
 * Get all documents in the current project
 * get all documents of this project
 * @returns
 */
get documents(): IPublicModelDocumentModel[];
```

Related type: [IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)

### simulatorHost

Get the simulator host

```typescript
/**
 * Get the simulator host
 * get simulator host
 */
get simulatorHost(): IPublicApiSimulatorHost | null;
```

Related type: [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

## Methods

### openDocument

Open a document

```typescript
/**
 * Open a document
 * @param doc
 * @returns
 */
openDocument(doc?: string | IPublicTypeRootSchema | undefined): IPublicModelDocumentModel | null;
```

Related types:

- [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

### createDocument

Create a document

```typescript
/**
 * Create a document
 * create a document
 * @param data
 * @returns
 */
createDocument(data?: IPublicTypeRootSchema): IPublicModelDocumentModel | null;
```

Related types:

- [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)
- [IPublicTypeRootSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/root-schema.ts)

### removeDocument

Remove a document

```typescript
/**
 * Remove a document
 * remove a document
 * @param doc
 */
removeDocument(doc: IPublicModelDocumentModel): void;
```

Related type: [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

### getDocumentByFileName

Get a document by fileName

```typescript
/**
 * Get a document by fileName
 * get a document by filename
 * @param fileName
 * @returns
 */
getDocumentByFileName(fileName: string): IPublicModelDocumentModel | null;
```

Related type: [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

### getDocumentById

Get a document by id

```typescript
/**
 * Get a document by id
 * get a document by id
 * @param id
 * @returns
 */
getDocumentById(id: string): IPublicModelDocumentModel | null;
```

Related type: [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)

### exportSchema

Export project schema

```typescript
/**
 * Export project
 * export project to schema
 * @returns
 */
exportSchema(stage: IPublicEnumTransformStage): IPublicTypeProjectSchema;
```

Related types:

- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)
- [IPublicTypeProjectSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/project-schema.ts)

### importSchema

Import project schema

```typescript
/**
 * Import project schema
 * import schema to project
 * @param schema Project data to import
 */
importSchema(schema?: IPublicTypeProjectSchema): void;
```

Related type: [IPublicTypeProjectSchema](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/project-schema.ts)

### addPropsTransducer

Add a property transducer function

```typescript
/**
 * Add a property transducer function
 * add a transducer to process prop
 * @param transducer
 * @param stage
 */
addPropsTransducer(
    transducer: IPublicTypePropsTransducer,
    stage: IPublicEnumTransformStage,
  ): void;
```

Related types:

- [IPublicTypePropsTransducer](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/props-transducer.ts)
- [IPublicEnumTransformStage](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/enum/transform-stage.ts)

**Example**
Remove `props.hidden` from every component on save

```typescript
import { project } from '@rchh/lowcode-engine';
import {
  IPublicTypeCompositeObject,
  IPublicEnumTransformStage,
  IPublicModelPluginContext,
} from '@rchh/lowcode-types';

export const DeleteHiddenTransducer = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      const { project } = ctx;
      project.addPropsTransducer(
        (props: IPublicTypeCompositeObject): IPublicTypeCompositeObject => {
          delete props.hidden;
          return props;
        },
        IPublicEnumTransformStage.Save,
      );
    },
  };
};

DeleteHiddenTransducer.pluginName = 'DeleteHiddenTransducer';
```

### setI18n

Set i18n locale data

```typescript
/**
 * Set i18n locale data
 * Data format reference: https://github.com/alibaba/lowcode-engine/blob/main/specs/lowcode-spec.md#2434%E5%9B%BD%E9%99%85%E5%8C%96%E5%A4%9A%E8%AF%AD%E8%A8%80%E7%B1%BB%E5%9E%8Baa
 *
 * set I18n data for this project
 * @param value object
 * @since v1.0.17
 */
setI18n(value: object): void;
```

**@since v1.0.17**

### setConfig

Set current project configuration

```typescript
/**
 * Set current project configuration
 * set config for this project
 * @param value object
 * @since v1.1.4
 */
  setConfig(value: IPublicTypeAppConfig): void;
  setConfig<T extends keyof IPublicTypeAppConfig>(key: T, value: IPublicTypeAppConfig[T]): void;
```

**@since v1.1.4**

#### How to extend project configuration

```typescript
// shims.d.ts
declare module '@rchh/lowcode-types' {
  export interface IPublicTypeAppConfig {
    customProp: CustomPropType;
  }
}

export {};
```

## Events

### onRemoveDocument

Bind document removal event

```typescript
/**
 * Bind document removal event
 * set callback for event onDocumentRemoved
 * @param fn
 * @since v1.0.16
 */
onRemoveDocument(fn: (data: { id: string }) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

**@since v1.0.16**

### onChangeDocument

Document change event within the current project

```typescript
/**
 * Document change event within the current project
 * set callback for event onDocumentChanged
 */
onChangeDocument(fn: (doc: IPublicModelDocumentModel) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicModelDocumentModel](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/document-model.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onSimulatorHostReady

Simulator ready event for the current project

```typescript
/**
 * Simulator ready event for the current project
 * set callback for event onSimulatorHostReady
 */
onSimulatorHostReady(fn: (host: IPublicApiSimulatorHost) => void): IPublicTypeDisposable;
```

Related types:

- [IPublicApiSimulatorHost](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/simulator-host.ts)
- [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### onSimulatorRendererReady

Renderer ready event for the current project

```typescript
/**
 * Renderer ready event for the current project
 * set callback for event onSimulatorRendererReady
 */
onSimulatorRendererReady(fn: () => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
