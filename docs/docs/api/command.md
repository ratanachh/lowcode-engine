---
title: command - Command API
sidebar_position: 10
---

## Module Overview

This module enables interaction with the command system, providing a comprehensive way to handle, execute, and manage commands in the application.

## Interfaces

### IPublicApiCommand

Interface for command interaction. Provides methods to register, unregister, execute, and manage commands.

## Methods

### registerCommand

Register a new command and its handler.

```typescript
/**
 * Register a new command and its handler.
 * @param command {IPublicTypeCommand} - The command to register.
 */
registerCommand(command: IPublicTypeCommand): void;
```

### unregisterCommand

Unregister an existing command.

```typescript
/**
 * Unregister an existing command.
 * @param name {string} - The name of the command to unregister.
 */
unregisterCommand(name: string): void;
```

### executeCommand

Execute a command by name with the provided arguments, ensuring arguments match the command definition.

```typescript
/**
 * Execute a command by name with the provided arguments.
 * @param name {string} - The name of the command to execute.
 * @param args {IPublicTypeCommandHandlerArgs} - Arguments for the command.
 */
executeCommand(name: string, args?: IPublicTypeCommandHandlerArgs): void;
```

### batchExecuteCommand

Execute commands in batch; repaints once after all commands run, and records a single history entry.

```typescript
/**
 * Execute commands in batch; repaints once after all commands run, and records a single history entry.
 * @param commands {Array} - Array of command objects with name and optional args.
 */
batchExecuteCommand(commands: { name: string; args?: IPublicTypeCommandHandlerArgs }[]): void;
```

### listCommands

List all registered commands.

```typescript
/**
 * List all registered commands.
 * @returns {IPublicTypeListCommand[]} - Array of registered commands.
 */
listCommands(): IPublicTypeListCommand[];
```

### onCommandError

Register an error handler callback for command execution errors.

```typescript
/**
 * Register a callback for errors during command execution.
 * @param callback {(name: string, error: Error) => void} - Error handler callback.
 */
onCommandError(callback: (name: string, error: Error) => void): void;
```
