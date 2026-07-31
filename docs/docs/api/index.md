---
title: API Overview
sidebar_position: 0
---

The engine's public APIs fall into two categories: `namespaces` and `models`. `Namespaces` group related APIs; `models` are the object models used by those APIs.

## Namespaces

The engine directly provides the following API categories:

- skeleton — panel API
- material — material API
- project — model API
- simulator-host — simulator API
- hotkey — hotkey API
- setters — setter API
- event — event API
- config — configuration API
- common — common API
- logger — logging API
- init — initialization API

## Models

The following models are exposed indirectly through the APIs above (e.g., as return values).

- document-model — document
- node — node
- node-children — node children
- props — property set
- prop — property
- setting-field — setting property
- setting-top-entry — setting property set
- component-meta — material metadata
- selection — canvas selection
- detecting — canvas hover
- history — operation history
- window — low-code designer window model
- detecting — canvas node hover model
- modal-nodes-manager — modal node manager model
- plugin-instance — plugin instance
- drop-location — drag-and-drop placement model

## API Design Conventions

Some API design conventions:

1. All API namespaces are organized as variables / functions / events
2. Event naming follows: on[Will|Did]VerbNoun? — see [https://code.visualstudio.com/api/references/vscode-api#events](https://code.visualstudio.com/api/references/vscode-api#events)
3. Based on the Disposable pattern: binding events or hotkeys returns an unbind function
4. Exported properties use `.xxx` getter style; (prefer) not `.getXxx()`

## experimental

This module is in public beta; APIs may change.
