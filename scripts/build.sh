#!/usr/bin/env bash

set -e

lerna run build \
  --scope @rchh/lowcode-types \
  --scope @rchh/lowcode-utils \
  --scope @rchh/lowcode-shell \
  --scope @rchh/lowcode-editor-core \
  --scope @rchh/lowcode-editor-skeleton \
  --scope @rchh/lowcode-designer \
  --scope @rchh/lowcode-plugin-designer \
  --scope @rchh/lowcode-plugin-command \
  --scope @rchh/lowcode-plugin-outline-pane \
  --scope @rchh/lowcode-react-renderer \
  --scope @rchh/lowcode-react-simulator-renderer \
  --scope @rchh/lowcode-renderer-core \
  --scope @rchh/lowcode-workspace \
  --scope @rchh/lowcode-engine \
  --stream

lerna run build:umd \
  --scope @rchh/lowcode-engine \
  --scope @rchh/lowcode-react-simulator-renderer \
  --scope @rchh/lowcode-react-renderer \
  --stream

cp ./packages/react-simulator-renderer/dist/js/* ./packages/engine/dist/js/
cp ./packages/react-simulator-renderer/dist/css/* ./packages/engine/dist/css/
