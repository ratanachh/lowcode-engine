---
title: logger - Logging API
sidebar_position: 10
---

> **@types** [IPublicApiLogger](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/logger.ts)<br/> > **@since** v1.0.0

## Module Overview

Engine logging module. Customize logs by **log level** and **business type**.

> Note: Log level can be adjusted dynamically via URL query — see [Viewing examples](#viewing-examples) below.<br/>
> Wrapped around [zen-logger](https://web.npm.alibaba-inc.com/package/zen-logger)

## Methods

Logging methods

```typescript
/**
 * debug info
 */
debug(...args: any | any[]): void;

/**
 * normal info output
 */
info(...args: any | any[]): void;

/**
 * warning info output
 */
warn(...args: any | any[]): void;

/**
 * error info output
 */
error(...args: any | any[]): void;

/**
 * log info output
 */
log(...args: any | any[]): void;
```

## Output Example

```typescript
import { Logger } from '@rchh/lowcode-utils';
const logger = new Logger({ level: 'warn', bizName: 'myPlugin:moduleA' });
logger.log('Awesome Low-Code Engine');
```

## Viewing Examples

How to enable viewing:

- Method 1: Each logger has a default output level on creation, default `warn` — only `warn` and `error` are shown
- Method 2: Append `__logConf__` to the URL, for example:

```
https://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn
// Enable warn and error for all bizNames

https://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=debug
// Enable debug, log, info, warn, and error for all bizNames

https://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=log
// Enable log, info, warn, and error for all bizNames

https://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn|*
// Same as __logConf__=warn

https://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn|bizName
// Enable debug, log, info, warn, and error for bizName

https://lowcode-engine.cn/demo/demo-general/index.html?__logConf__=warn|partOfBizName
// Enable debug, log, info, warn, and error for bizNames matching '%partOfBizName%'

```
