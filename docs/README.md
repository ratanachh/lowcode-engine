# Low-Code Engine documentation site

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Install

```
$ yarn
```

### Local development

```
$ yarn start
```

This command starts a local development server and opens a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

### Deploy

```bash
1. npm run build
2. npm publish # bump the version first, e.g. 1.0.1

# After publish, sync to the uipaas CDN
3. tnpm syncOss

4. Update the Diamond version to 1.0.1
5. The lowcode-engine.cn site picks up the new docs
```

## Features

- [x] Offline local search
- [x] Versioned documentation
- [x] Offline static deployment
- [x] Theme (forked from the Yida developer center)

## Docusaurus docs

https://docusaurus.io/docs/docs-introduction
