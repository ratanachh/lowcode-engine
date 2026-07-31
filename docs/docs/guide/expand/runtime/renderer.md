---
title: Using the Renderer Module
sidebar_position: 0
---

## Quick Start

Rendering depends on `schema` and `components`. Schema and components must correspond one-to-one. Every component used in the schema must be declared in `components`; otherwise rendering will fail.

### Simple Example

```jsx
import ReactRenderer from '@rchh/lowcode-react-renderer';
import ReactDOM from 'react-dom';
import { Button } from '@alifd/next';

const schema = {
  componentName: 'Page',
  props: {},
  children: [
    {
      componentName: 'Button',
      props: {
        type: 'primary',
        style: {
          color: '#2077ff',
        },
      },
      children: 'OK',
    },
  ],
};

const components = {
  Button,
};

ReactDOM.render(
  <ReactRenderer schema={schema} components={components} />,
  document.getElementById('root'),
);
```

####

### Project Usage Example

> [Designer demo](https://lowcode-engine.cn/demo/demo-general/index.html)
> Full project code example: [https://github.com/alibaba/lowcode-demo](https://github.com/alibaba/lowcode-demo)

**Step 1: Get the component list from the designer**

```typescript
import { material, project } from '@rchh/lowcode-engine';
const packages = material.getAssets().packages;
```

**Step 2: Get the schema of the currently configured page from the designer**

```typescript
import { material, project } from '@rchh/lowcode-engine';

const schema = project.exportSchema();
```

**Step 3: Store schema and packages in some way**
Here localStorage is used as an example. In real projects, use a database or other storage.

```typescript
window.localStorage.setItem('projectSchema', JSON.stringify(project.exportSchema()));
const packages = await filterPackages(material.getAssets().packages);
window.localStorage.setItem('packages', JSON.stringify(packages));
```

**Step 4: Retrieve stored schema and packages during preview**

```typescript
const packages = JSON.parse(window.localStorage.getItem('packages') || '');
const projectSchema = JSON.parse(window.localStorage.getItem('projectSchema') || '');
const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
```

**Step 5: Render by combining schema and packages information**

```typescript
import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading } from '@alifd/next';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@rchh/lowcode-utils';
import ReactRenderer from '@rchh/lowcode-react-renderer';
import { injectComponents } from '@rchh/lowcode-plugin-inject';

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    // Pre-render: init project schema and assets into schema/components props for the renderer
    const packages = JSON.parse(window.localStorage.getItem('packages') || '');
    const projectSchema = JSON.parse(window.localStorage.getItem('projectSchema') || '');
    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];

    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));

    setData({
      schema,
      components,
    });
  }

  const { schema, components } = data;

  if (!schema || !components) {
    init();
    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('ice-container'));
```

### Internationalization Example

```typescript
class Demo extends PureComponent {
  static displayName = 'renderer-demo';
  render() {
    return (
      <div className="demo">
        <ReactRenderer
          key={schema.fileName}
          schema={schema}
          components={components}
          appHelper={{
            utils,
            constants,
          }}
          locale="zh-CN"
          messages={{
            hello: 'Hello',
            china: 'China',
          }}
        />
      </div>
    );
  }
}
```

## API

| Parameter                            | Description                                                                                                                       | Type      | Required |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| schema                               | Data conforming to the [Building Protocol](https://lowcode-engine.cn/lowcode)                                                     | Object    | Yes      |
| components                           | Component dependency instances                                                                                                    | Object    | Yes      |
| componentsMap                        | Component configuration information                                                                                               | Object    | No       |
| appHelper                            | Renderer module global context                                                                                                    | Object    | No       |
| designMode                           | Design mode. Options: `extend`, `border`, `preview`                                                                               | String    | No       |
| suspended                            | Whether to suspend rendering                                                                                                      | Boolean   | No       |
| onCompGetRef                         | Component ref callback `(schema, ref) => {}`                                                                                      | Function  | No       |
| onCompGetCtx                         | Component ctx update callback `(schema, ctx) => {}`                                                                               | Function  | No       |
| rendererName                         | Renderer type, identifying how the current module renders                                                                         | string    | No       |
| customCreateElement                  | Custom element creation hook                                                                                                      |
| `(Component, props, children) => {}` | Function                                                                                                                          | No        |
| notFoundComponent                    | Custom display when a component is not found                                                                                      | Component | No       |
| thisRequiredInJSE                    | When `true`, JSExpression only supports access via `this`. Set to `false` to support legacy `'state.xxx'`. `true` is recommended. | Boolean   | No       |
| locale                               | Internationalization language type                                                                                                | string    | No       |
| messages                             | Internationalization message object                                                                                               | Object    | No       |

### schema

Building protocol data. The renderer module renders in real time based on the content in the schema.

### messages

Internationalization content. Must be used together with `locale`.
Example `messages` format:

```typescript
{
  'zh-CN': {
    'hello-world': 'Hello, world!',
  },
  'en-US': {
    'hello-world': 'Hello world!',
  },
}
```

### locale

Current language type.
Example: `'zh-CN'` | `'en-US'`

### components

Component dependency instances required by the renderer module to render pages. Keys in the `components` object must correspond to the `componentName` field in the building schema.

### componentsMap

> Not needed in production environments.

See the [《Low-Code Engine Building Protocol Specification》](https://lowcode-engine.cn/lowcode) for configuration standards. Mainly used in building scenarios to improve user building experience.

- **Property configuration validation**: Users can configure `propTypes` for specific component properties. When property values entered by users do not satisfy `propType` configuration in building scenarios, the renderer sets the current property to `undefined` to avoid component errors crashing the editor.
- **`isContainer` flag**: When a component is set as a container and has no other components inside, users can drag components directly into the container.
- **`parentRule` validation**: When a component used by the user is not inside a component configured in `parentRule`, the renderer uses the `visualDom` component as a placeholder to avoid errors while not blocking user configuration in drill-down editing scenarios. Typical cases include `Step.Item`, `Table.Column`, `Tab.Item`, etc.

### appHelper

`appHelper` is mainly used to set the global context of the renderer module. Currently, `appHelper` supports the following contexts:

- `utils`: Global utility functions
- `constants`: Global constants
- `location`: react-router `location` instance
- `history`: react-router `history` instance

After setting `appHelper`, the context is mounted directly on the container component's `this`. Users can use the context in functions and variable expressions in the building protocol as follows:

**schema:**

```javascript
export default {
  componentName: 'Page',
  fileName: 'test',
  props: {},
  children: [
    {
      componentName: 'Div',
      props: {},
      children: [
        {
          componentName: 'Text',
          props: {
            text: {
              type: 'JSExpression',
              value: 'this.location.pathname',
            },
          },
        },
        {
          componentName: 'Button',
          props: {
            type: 'primary',
            style: {
              marginLeft: 10,
            },
            onClick: {
              type: 'JSExpression',
              value: 'function onClick(e) { this.utils.xxx(this.constants.yyy);}',
            },
          },
          children: 'click me',
        },
      ],
    },
  ],
};
```

```typescript
import ReactRenderer from '@rchh/lowcode-react-renderer';
import ReactDOM from 'react-dom';
import { Button } from '@alifd/next';
import schema from './schema';

const components = {
  Button,
};

ReactDOM.render(
  <ReactRenderer
    schema={schema}
    components={components}
    appHelper={{
      utils: {
        xxx: () => {},
      },
    }}
  />,
  document.getElementById('root'),
);
```

### designMode

> Not needed in production environments.

The `designMode` property is mainly used in building scenarios and has the following effects:

- When `designMode` changes, all components in the current schema re-render
- When `designMode` is set to `design`, the renderer wraps components such as `Dialog` and `Overlay` (which have no initial DOM) in a div so borders can be displayed on the canvas for user selection

### suspended

Whether the renderer module is suspended. When set to `true`, the outermost container's `shouldComponentUpdate` always returns `false`. Used in drill-down editing or multi-engine rendering scenarios.

### onCompGetRef

Component ref callback. In building scenarios, the orchestration module can obtain component instances through this callback to implement lifecycle injection or component DOM operations. The callback includes two parameters:

- `schema`: Current component's schema model structure
- `ref`: Current component's ref instance

### onCompGetCtx

Component ctx update callback. A new context environment is constructed for the component on each render cycle, so this callback is triggered on every render. It includes two parameters:

- `schema`: Current component's schema model structure
- `ctx`: Current component's context information, including:
  - `page`: Current page container instance
  - `this`: Container component instance the current component belongs to
  - `item` / `index`: Loop context (property keys can be customized via `loopArgs`)
  - `form`: Form context

### rendererName

Renderer type, identifying how the current module renders.

- `LowCodeRenderer`: Low-code component
- `PageRenderer`: Page

### customCreateElement

Custom element creation hook for processing components before and after rendering, including but not limited to adding or removing props. Includes three parameters:

- `Component`: Component to render
- `props`: Props of the component to render
- `children`: Child elements of the component to render

### thisRequiredInJSE

> Version >= 1.0.11

Default: `true`
When `true`, JSExpression only supports access via `this`. Set to `false` to support legacy `'state.xxx'`. `true` is recommended.
