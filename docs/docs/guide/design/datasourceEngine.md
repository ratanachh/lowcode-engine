---
title: Data Source Engine Design
sidebar_position: 7
---

## Core principles

For future extensibility and compatibility, the core is split into two kinds of packages: **datasource-engine** and **datasource-engine-x-handler**, where `x` corresponds to the data source `type`. For example, **datasource-engine-mtop-handler**. The actual request tooling lives in handlers; when using the engine, the consumer decides which handlers to register. This serves two purposes: (1) putting all handlers in one package would be too large for clients, wasting resources and hurting performance; (2) when a new data source type appears, you only need to add a handler in the prescribed format, achieving high extensibility.

![](https://img.alicdn.com/imgextra/i3/O1CN011ep9No2ACzrgzgtk0_!!6000000008168-2-tps-720-370.png)

### DataSourceEngine

- engine: There are two main kinds of engines. One is for the render engine, imported from `engine/interpret`; the other is for code generation or standalone data source engine usage, imported from `engine/runtime`. Example:

```typescript
import { createInterpret, createRuntime } from '@rchh/lowcode-datasource-engine';
```

The `create` method is defined as follows:

```typescript
interface IDataSourceEngineFactory {
  create(
    dataSource: DataSource,
    context: Omit<IRuntimeContext, 'dataSourceMap' | 'reloadDataSource'>,
    extraConfig?: {
      requestHandlersMap: RequestHandlersMap;
      [key: string]: any;
    },
  ): IDataSourceEngine;
}
```

`create` accepts three parameters. The first is `DataSource`. For runtime rendering and code generation, `DataSource` is defined as follows:

```typescript
/**
 * Data source object — runtime rendering
 */
export interface DataSource {
  list: DataSourceConfig[];
  dataHandler?: JSFunction;
}

/**
 * Data source object
 */
export interface DataSourceConfig {
  id: string;
  isInit: boolean | JSExpression;
  type: string;
  requestHandler?: JSFunction;
  dataHandler?: JSFunction;
  options?: {
    uri: string | JSExpression;
    params?: JSONObject | JSExpression;
    method?: string | JSExpression;
    isCors?: boolean | JSExpression;
    timeout?: number | JSExpression;
    headers?: JSONObject | JSExpression;
    [option: string]: CompositeValue;
  };
  [otherKey: string]: CompositeValue;
}
```

For code generation, `create` and `DataSource` are defined as follows:

```typescript
export interface IRuntimeDataSourceEngineFactory {
  create(
    dataSource: RuntimeDataSource,
    context: Omit<IRuntimeContext, 'dataSourceMap' | 'reloadDataSource'>,
    extraConfig?: {
      requestHandlersMap: RequestHandlersMap;
      [key: string]: any;
    },
  ): IDataSourceEngine;
}

export interface RuntimeOptionsConfig {
  uri: string;
  params?: Record<string, unknown>;
  method?: string;
  isCors?: boolean;
  timeout?: number;
  headers?: Record<string, unknown>;
  shouldFetch?: () => boolean;
  [option: string]: unknown;
}
export declare type RuntimeOptions = () => RuntimeOptionsConfig; // Supports dynamic values; at runtime this becomes a function

export interface RuntimeDataSourceConfig {
  id: string;
  isInit: boolean;
  type: string;
  requestHandler?: () => {};
  dataHandler: (data: unknown, err?: Error) => {};
  options?: RuntimeOptions;
  [otherKey: string]: unknown;
}

/**
 * Data source object
 */
export interface RuntimeDataSource {
  list: RuntimeDataSourceConfig[];
  dataHandler?: (dataMap: DataSourceMap) => void;
}
```

The difference is clear: one uses JS expression strings; the other is converted into directly runnable JS code. For code generation, converting to executable JS is the code generator's responsibility. For the render engine, it only receives the initial schema JSON, so the data source engine performs the conversion.

- context: The data source engine has expressions that use `this`. Evaluating them requires context, so the current context must be passed to the data source engine. Handlers also use APIs such as `setState` from context when assigning values. This is optional; more on that later.

```typescript
/**
 * Runtime context — currently modeled after React, but you can build your own
 */
export interface IRuntimeContext<TState extends object = Record<string, unknown>> {
  /** Current container state */
  readonly state: TState;
  /** Set state (shallow merge) */
  setState(state: Partial<TState>): void;
  /** Custom methods */
  [customMethod: string]: any;
  /** Data sources, keyed by data source ID */
  dataSourceMap: Record<string, IRuntimeDataSource>;
  /** Reload all data sources */
  reloadDataSource(): Promise<void>;
  /** Page container */
  readonly page: IRuntimeContext & {
    readonly props: Record<string, unknown>;
  };
  /** Low-code business component container */
  readonly component: IRuntimeContext & {
    readonly props: Record<string, unknown>;
  };
}
```

- extraConfig: Reserved for extension. Besides the required field **requestHandlersMap**:

```typescript
export declare type RequestHandler<T = unknown> = (
  ds: RuntimeDataSourceConfig,
  context: IRuntimeContext,
) => Promise<RequestResult<T>>;
export declare type RequestHandlersMap = Record<string, RequestHandler>;
```

`RequestHandlersMap` links data sources to their handlers. Its key corresponds to `DataSourceConfig.type`, such as mtop/http/jsonp. When a data source type is used, the corresponding type handler is called with the current parameters and context.

After `create` completes, you get a `DataSourceEngine` instance:

```typescript
export interface IDataSourceEngine {
  /** Data sources, keyed by data source ID */
  dataSourceMap: Record<string, IRuntimeDataSource>;
  /** Reload all data sources */
  reloadDataSource(): Promise<void>;
}
```
