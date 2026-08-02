# Low-Code Engine documentation site

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

Published site: **https://ratanachh.github.io/lowcode-engine/**

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

### Deploy (GitHub Pages)

Docs deploy automatically via GitHub Actions when changes under `docs/` are pushed to `main`.

Manual run:

1. Open **Actions → Deploy Docs to GitHub Pages → Run workflow**
2. In the repo: **Settings → Pages → Source: GitHub Actions**

Local preview of the production build:

```bash
yarn build && yarn serve
```

## Features

- [x] Offline local search
- [x] Versioned documentation
- [x] Offline static deployment
- [x] GitHub Pages deploy via Actions

## Docusaurus docs

https://docusaurus.io/docs/docs-introduction
