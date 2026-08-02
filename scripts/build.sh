#!/usr/bin/env bash

set -e

# webpack 4 (via @alib/build-scripts) needs OpenSSL legacy provider on Node 17+
# Disable Node type-stripping so .ts under node_modules is not executed as JS
# (stable flag is --no-strip-types since Node 24.12; old --no-experimental-strip-types is not NODE_OPTIONS-safe)
export NODE_OPTIONS="${NODE_OPTIONS:+${NODE_OPTIONS} }--openssl-legacy-provider --no-strip-types"

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
