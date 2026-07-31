---
title: event - Event API
sidebar_position: 10
---

> **@types** [IPublicApiEvent](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/api/event.ts)<br/> > **@since** v1.0.0

## Module Overview

Event handling API supporting custom event listeners and emission.

## Methods

### on

Listen for an event

```typescript
/**
 * Listen for an event
 * add monitor to a event
 * @param event Event name
 * @param listener Event callback
 */
on(event: string, listener: (...args: any[]) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### prependListener

Listen for an event; runs before other callbacks

```typescript
/**
 * Listen for an event; runs before other callbacks
 * @param event Event name
 * @param listener Event callback
 */
prependListener(event: string, listener: (...args: any[]) => void): IPublicTypeDisposable;
```

Related type: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)

### off

Stop listening for an event

```typescript
/**
 * Stop listening for an event
 * cancel a monitor from a event
 * @param event Event name
 * @param listener Event callback
 */
off(event: string, listener: (...args: any[]) => void): void;
```

### emit

Emit an event

```typescript
/**
 * Emit an event
 * emit a message for a event
 * @param event Event name
 * @param args Event arguments
 * @returns
 */
emit(event: string, ...args: any[]): void;
```

## Usage Examples

### Event emission and listening

```typescript
const eventName = 'eventName';

// Event listener
// Events emitted from plugins are prefixed with `common` by default — account for this when listening
event.on(`common:${eventName}`);

// Emit event
event.emit(eventName);
```

### Setter and setter/plugin coordination

Register events in setter A:

```typescript
import { event } from '@rchh/lowcode-engine';

const SETTER_NAME = 'SetterA';

class SetterA extends React.Component {
  componentDidMount() {
    // Multiple setters may exist on the panel; use field.id to identify each setter
    this.emitEventName = `${SETTER_NAME}-${this.props.field.id}`;
    event.on(`common:${this.emitEventName}.bindEvent`, this.bindEvent);
  }

  bindEvent = (eventName) => {
    // do someting
  };

  componentWillUnmount() {
    // Setters are instance-based; unregister events on unmount to avoid an oversized event pool
    event.off(`common:${this.emitEventName}.bindEvent`, this.bindEvent);
  }
}
```

Emit events from setter B to communicate:

```typescript
import { event } from '@rchh/lowcode-engine';

class SetterB extends React.Component {
  bindFunction = () => {
    const { field, value } = this.props;
    // Example of communicating with a plugin; event naming: plugin name + method
    event.emit('eventBindDialog.openDialog', field.name, this.emitEventName);
  };
}
```
