---
title: Contributing
sidebar_position: 0
---

### Environment Setup

Developing LowcodeEngine requires Node.js 16+.

We recommend using nvm to manage Node.js. It avoids permission issues and lets you switch Node.js versions at any time.

### Contributing to the Low-Code Engine

#### Clone the project

```
git clone git@github.com:alibaba/lowcode-engine.git
cd lowcode-engine
```

#### Install dependencies and build

```
npm install && npm run setup
```

#### Debug environment configuration

In essence, this proxies the JS/CSS files loaded by the demo page to the engine project. You can use any proxy tool you prefer; [XSwitch](https://chrome.google.com/webstore/detail/xswitch/idkjhjggpffolpidfkikidcokdkdaogg?hl=en-US) is recommended here.

Local development proxy rules:

```json
{
  "proxy": [
    [
      "https://uipaas-assets.com/prod/npm/@rchh/lowcode-engine/(.*)/dist/js/engine-core.js",
      "http://localhost:5555/js/AliLowCodeEngine.js"
    ],
    [
      "https://uipaas-assets.com/prod/npm/@rchh/lowcode-engine/(.*)/dist/css/engine-core.css",
      "http://localhost:5555/css/AliLowCodeEngine.css"
    ],
    [
      "https?://uipaas-assets.com/prod/npm/@rchh/lowcode-engine/(.*)/dist/js/react-simulator-renderer.js",
      "http://localhost:5555/js/ReactSimulatorRenderer.js"
    ],
    [
      "https?://uipaas-assets.com/prod/npm/@rchh/lowcode-engine/(.*)/dist/css/react-simulator-renderer.css",
      "http://localhost:5555/css/ReactSimulatorRenderer.css"
    ]
  ]
}
```

#### Development

```
npm start
```

Choose an environment for debugging, for example the [Low-Code Engine Online DEMO](https://lowcode-engine.cn/demo/demo-general/index.html).

After enabling the proxy, you can develop and debug locally.

### Contributing to Low-Code Engine Documentation

#### Develop documentation

Run the following command in the lowcode-engine directory:

```
cd docs

npm start
```

#### Maintenance

- Official documentation is managed on GitHub; the site docs stay in sync with the [main repository develop branch](https://github.com/alibaba/lowcode-engine/tree/develop/docs).
- Click **Edit this page** at the bottom of each doc to jump to its location on GitHub.
- PRs are welcome. Documentation PRs count as contributions and are included in contribution statistics.
- **Syncing documentation to the official site is handled by the core team.** If needed, reach out via issue or the contributor group.
- To improve reading and usage experience, image files in the docs are periodically converted to trusted CDN URLs.

#### Documentation format

This project's documentation follows the [Chinese Copywriting Guidelines](https://github.com/sparanoid/chinese-copywriting-guidelines).

If you edit with VS Code, install the [huacnlee.autocorrect](https://github.com/huacnlee/autocorrect) extension to help lint documentation.

### Contributing to the Low-Code Engine Ecosystem

See [NPM package source locations](/site/docs/guide/appendix/npms) for related source code.

See [Low-code ecosystem scaffolding & debugging](/site/docs/guide/expand/editor/cli) for development and debugging.

### Release

After your PR is merged, we will publish the related stable or beta release as soon as possible.

### Join the Contributor Group

If you have submitted a Bugfix or Feature PR and are interested in helping maintain LowcodeEngine, we offer a core contributor discussion group.

1. You can join by [filling out the survey](https://survey.taobao.com/apps/zhiliao/4YEtu9gHF).
2. After completing the survey, add WeChat ID `wxidvlalalalal` (include your GitHub ID) and we will add you to the group.

If you are not sure what to contribute, search the source for TODO or FIXME.

To help you get started quickly and learn the contribution workflow, see [good first issues](https://github.com/alibaba/lowcode-engine/issues?q=is:open+is:issue+label:%22good+first+issue%22) — relatively well-scoped issues that are a good place to begin.

### PR Submission Notes

- For the lowcode-engine repository, create branches from develop and open PRs targeting develop.
- For other repositories, create branches from main and open PRs targeting main.
- If you fix a bug or add code that needs tests, please add tests!
- Make sure the test suite passes (`yarn test`).
- Please sign the Contributor License Agreement (CLA).
  > If you have already signed the CLA but are still prompted to sign, see [the solution](/site/docs/faq/faq021).
