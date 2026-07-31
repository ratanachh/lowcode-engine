---
title: Coding Conventions
sidebar_position: 5
---

## Coding Conventions

### Naming

- Use `PascalCase` for type names
- Use `I` as the prefix for interface names
- Use `PascalCase` for enum values
- Use `camelCase` for function names
- Use `camelCase` for properties and local variables
- Do not prefix private property names with `_`
- Prefer full words in names when possible
- Use lowercase for folder and file names, e.g. `get-custom-data.ts`

### Components

- One component or class per file

### Types

- Do not export types/functions casually unless you need to share them across components
- Do not define types/values in the global namespace
- Shared types should be defined in `types.ts`
- Within a file, type definitions should appear at the top
- `interface` and `type` are similar; prefer `interface` when it works, and use `type` only when necessary

### Comments

- Use JSDoc-style comments for functions, interfaces, enums, and classes

### Strings

- Use single quotes `''`

### Unit Tests

- Place unit test files according to the source directory structure
