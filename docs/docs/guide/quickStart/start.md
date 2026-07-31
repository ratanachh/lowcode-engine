---
sidebar_position: 3
title: Quick Start
---

## Prerequisites

We assume you are reasonably familiar with HTML and JavaScript. Even if you have used other languages before, you should be able to follow this tutorial. We also assume you know basic programming concepts such as functions, objects, arrays, and some of class.

If you want a JavaScript refresher, read [this tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript). Note that we also use some ES6 (newer JavaScript) features. In this guide we mainly use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const). You can preview ES6 compilation online with the [Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA).

## Environment setup

### WSL (Windows)

On Windows you need WSL for Low-Code Engine development. Install guide ➡️ [WSL install guide](https://docs.microsoft.com/en-us/windows/wsl/install).<br />**On Windows, every command in this guide should be run in the WSL terminal.**

### Node

Recommended Node version: 16.18.0.

#### Check Node version

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01oCZKNz290LIu8YUTk_!!6000000008005-2-tps-238-70.png)

#### Manage Node versions with n

You can install [n](https://www.npmjs.com/package/n) to manage and switch Node versions.

##### Install n

```bash
npm install -g n
```

##### Switch Node version

```bash
n 14.17.0
```

### React

Low-Code Engine extensions are built with React. Having some React background before continuing is recommended. React learning guide ➡️ [React Getting Started](https://reactjs.org/docs/getting-started.html).

### Download the Demo

Clone the DEMO from GitHub (<https://github.com/alibaba/lowcode-demo>) to your machine.

#### git clone

##### HTTPS

Requires git

```bash
git clone https://github.com/alibaba/lowcode-demo.git
```

##### SSH

Requires an SSH key; if you have one configured:

```bash
git clone git@github.com:alibaba/lowcode-demo.git
```

#### Download Zip

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01iYC7E11phaNwLFUrN_!!6000000005392-2-tps-3584-1794.png)

### Pick a demo project

Taking `demo-general` as an example:

```bash
cd demo-general
```

### Install dependencies

Under `lowcode-demo/demo-general` run:

```bash
npm install
```

### Start the demo

Under `lowcode-demo/demo-general` run:

```bash
npm run start
```

Then open [http://localhost:5556/](http://localhost:5556/) to use the DEMO.

## Understanding the Demo

Our Demo is a **low-code platform designer**. It is the most important part of a low-code platform: users drag, configure, and write code here to build a page. Because audiences, scenarios, and requirements differ, the features of this page vary.

Remember the word **designer** — it refers to the page below; you will see it often.
![image.png](https://img.alicdn.com/imgextra/i1/O1CN014nYXgF20pKrQIG2zV_!!6000000006898-2-tps-3584-1808.png)

### Scenarios

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01nnP60l1dqUhUiNSx6_!!6000000003787-2-tps-2852-1156.png)

The Demo is split into the following 8 scenarios based on **the materials each designer needs**:

- General scenario
- Basic Fusion components
- Basic Fusion components + one custom component
- Basic Ant Design components
- Custom engine initialization
- Extended node action items
- Advanced form low-code materials based on Next
- Ant Design advanced components + Formily form components

Open different scenarios to see which materials they use.
![](https://img.alicdn.com/imgextra/i1/O1CN01EU2jRN1wUwlal17WK_!!6000000006312-2-tps-3110-1974.png)

### Directory layout

Each `demo-xxx-xxx` directory under the repo is a standalone demo project corresponding to the scenarios above.

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01ztxv5Y1mJozBsLdni_!!6000000004934-2-tps-696-958.png)

Directory layouts across scenarios are similar; here we focus on the general scenario.

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01A50oW522S5zg2eDUH_!!6000000007118-2-tps-732-1384.png)

Main pieces:

- Designer entry `src/index.ts` does the following:
  - Registers plugins via `plugins.register`, including official plugins (published npm packages) and sample plugins under `plugins`
  - Initializes the low-code designer via `init`
- `plugins` directory — sample plugins so you can see how a plugin is implemented
- `services` directory — mocks data requests and provides default schema and asset packages; in a real project replace these with real server integrations
- Preview page entry `preview.tsx`

You can learn more from the source.

After that, the low-code designer already has basic capabilities — like what we saw at the start.

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01YJVcOd1PiL1am6bz2_!!6000000001874-2-tps-3248-1970.png)

Next, extend the designer to match the features you need.

## Developing a plugin

### Approach 1: Add a plugin directly in the DEMO

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01pXpSRs1QvRyut2EE3_!!6000000002038-2-tps-718-1144.png)

You can add a plugin under `demo/sample-plugins`. Here the new plugin directory is `plugin-demo`. Add an `index.tsx` and paste the following:

```javascript
import * as React from 'react';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

const LowcodePluginPluginDemo = (ctx: IPublicModelPluginContext) => {
  return {
    // Data and methods exposed by the plugin
    exports() {
      return {
        data: 'You can expose plugin data like this',
        func: () => {
          console.log('Same for methods');
        },
      };
    },
    // Plugin init; called immediately after the engine initializes
    init() {
      // You can access methods and properties exposed by other plugins
      // const { data, func } = ctx.plugins.pluginA;
      // func();

      // console.log(options.name);

      // Add a panel to the engine
      ctx.skeleton.add({
        area: 'leftArea',
        name: 'LowcodePluginPluginDemoPane',
        type: 'PanelDock',
        props: {
          description: 'Demo',
        },
        content: <div>This is a Demo panel</div>,
      });

      ctx.logger.log('Log a message');
    },
  };
};

// Plugin name; unique in the registration environment
LowcodePluginPluginDemo.pluginName = 'LowcodePluginPluginDemo';
LowcodePluginPluginDemo.meta = {
  // Dependent plugins (array of plugin names)
  dependencies: [],
  engines: {
    lowcodeEngine: '^1.0.0', // Requires engine ^1.0.0
  },
};

export default LowcodePluginPluginDemo;
```

Add the following in `src/index.ts`:

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01pNTr4N1kldoYZRzgI_!!6000000004724-2-tps-1976-1250.png)

This adds a Demo panel to the designer.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01wtPIOV1TQiFLz5Vkf_!!6000000002377-2-tps-3584-1806.png)

### Approach 2: Develop the plugin in a new repository

Initialize

```bash
npm init @rchh/element your-plugin-name
```

Choose designer plugin (plugin)

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01sA6sYW1tijqVeQCuq_!!6000000005936-2-tps-730-214.png)

Complete the prompts

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01BzM1Jb1RcxbiJ0tJi_!!6000000002133-2-tps-866-218.png)

The plugin project is initialized

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01iVIAXD1XVWsOdKttI_!!6000000002929-2-tps-3584-2020.png)

Install dependencies in the plugin project

```bash
npm install
```

Start the project

```bash
npm run start
```

Debug the project

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01A4vPqC1xbeAqNxBRM_!!6000000006462-2-tps-3584-1936.png)

Debug in the Demo

Add `"inject": true` under `build.json` to debug on [https://lowcode-engine.cn/demo/demo-general/index.html?debug](https://lowcode-engine.cn/demo/demo-general/index.html?debug).

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01uqSmrX1oqupxeGH1m_!!6000000005277-2-tps-3584-2020.png)

## Developing a custom material

### Initialize the material

```bash
npm init @rchh/element your-material-demo
```

Choose component/material

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01qVJQvG1Yhj2PJhhvk_!!6000000003091-2-tps-824-208.png)

Configure the other options

![image.png](https://img.alicdn.com/imgextra/i3/O1CN017fFT8O1IVmrLYg87F_!!6000000000899-2-tps-800-248.png)

You now have a React material initialized.

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01SU2xn91TZPlzcARVI_!!6000000002396-2-tps-3584-2020.png)

### Start and debug the material

#### Install dependencies

```bash
npm i
```

#### Start

```bash
npm run lowcode:dev
```

Open [http://localhost:3333/](http://localhost:3333/) to see the material under development.

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01JqoHqc1z7zlSWFYJD_!!6000000006668-2-tps-3584-1790.png)

#### Debug in the Demo

```bash
npm i @rchh/build-plugin-alt
```

Edit `build.lowcode.js`

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01K7u7ci1KCfYlBj2yf_!!6000000001128-2-tps-1388-1046.png)

As shown, add:

```javascript
[
  '@rchh/build-plugin-alt',
  {
    type: 'component',
    inject: true,
    library,
    // Page to open; in inject debug mode the browser will not open if this is omitted
    // You can point at the official demo: https://lowcode-engine.cn/demo/index.html
    openUrl: 'https://lowcode-engine.cn/demo/index.html?debug',
  },
],
```

Restart the project and you can find your custom component in the Demo.

![image.png](https://img.alicdn.com/imgextra/i1/O1CN0166WywE26Lv7NuJMus_!!6000000007646-2-tps-3584-1812.png)

### Publish

Build first

```bash
npm run lowcode:build
```

Publish the component

```bash
npm publish
```

The component published here is [my-material-demo](https://www.npmjs.com/package/my-material-demo). After publish you get two important files:

- Low-code description: [https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js](https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js)
- Component code: [https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js](https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js)

You can also find the asset package description at [https://unpkg.com/my-material-demo@0.1.0/build/lowcode/assets-prod.json](https://unpkg.com/my-material-demo@0.1.0/build/lowcode/assets-prod.json).

```bash
{
  "packages": [
    {
      "package": "my-material-demo",
      "version": "0.1.0",
      "library": "BizComp",
      "urls": [
        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js",
        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.css"
      ],
      "editUrls": [
        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/view.js",
        "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/view.css"
      ],
      "advancedUrls": {
        "default": [
          "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.js",
          "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/render/default/view.css"
        ]
      },
      "advancedEditUrls": {}
    }
  ],
  "components": [
    {
      "exportName": "MyMaterialDemoMeta",
      "npm": {
        "package": "my-material-demo",
        "version": "0.1.0"
      },
      "url": "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js",
      "urls": {
        "default": "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js"
      },
      "advancedUrls": {
        "default": [
          "https://unpkg.com/my-material-demo@0.1.0/build/lowcode/meta.js"
        ]
      }
    }
  ],
}
```

### Use it

Put the contents of the published component's `assets-prod.json` into the demo's `src/universal/assets.json`.

> Prefer appending at the end to avoid errors from resource load order.

As shown, add the packages config
![image.png](https://img.alicdn.com/imgextra/i1/O1CN018dnIB91XHmzeTrq3n_!!6000000002899-2-tps-3584-2020.png)

As shown, add the components config

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01UNp89s1vQXKyfsFaL_!!6000000006167-2-tps-3584-2020.png)

Restart the DEMO and the new low-code material appears. Continue extending materials as needed.

## Summary

This is a brief introduction to basic Low-Code Engine capabilities and how to extend the low-code DEMO with new features. There is much more to explore.
