#!/usr/bin/env bash

rm -rf node_modules package-lock.json yarn.lock
lerna clean -y
find ./packages -type f -name "package-lock.json" -exec rm -f {} \;

lerna bootstrap

lerna exec --stream \
  --scope @rchh/lowcode-editor-core \
  --scope @rchh/lowcode-types \
  --scope @rchh/lowcode-utils \
  -- npm run build
