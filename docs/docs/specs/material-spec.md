---
title: Low-Code Engine Material Protocol Specification
sidebar_position: 1
---

## 1 Introduction

### 1.1 Problem Domains Covered by This Protocol Specification

- Define the version numbering specification for this protocol
- Define the Level that each sub-specification in this protocol must support
- Define the mid/back-office material directory specification (A)
- Define the mid/back-office material API specification (A)
- Define the mid/back-office material registration specification (A)
- Define the mid/back-office material internationalization and multi-language support specification (AA)
- Define the mid/back-office material theme configuration specification (AAA)
- Define the mid/back-office material accessibility specification (AAA)

### 1.2 Protocol Draft Authors

- Authors: Jiushen, Daguo, Yuanyan, Wuzi, Lin Yi, Yifan, Jinchan
- Reviewers: Wuliang, Yuefei, Kangwei, Lihao, Rongbin, Xiaoxian, Ducheng, Jinchan, Wuzi, Lin Yi, Xuli

### 1.3 Version Number

1.0.0

### 1.4 Protocol Version Number Specification (A)

This protocol uses semantic versioning. The version number format is `major.minor.patch`.

- major is the major version number: used to release protocol format changes that are not backward compatible
- minor is the minor version number: used to release backward-compatible protocol feature additions
- patch is the patch number: used to release backward-compatible protocol bug fixes

### 1.5 Sub-Specification Level Definitions in This Protocol

| Specification Level | Implementation Requirement                                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A                   | Mandatory specification, must be implemented; protocol description data that violates such specifications cannot be written to the material center and is not supported for circulation. |
| AA                  | Recommended specification, recommended to implement; complying with such specifications helps improve future business extensibility and cross-team collaborative development efficiency. |
| AAA                 | Reference specification, implement according to actual business scenario requirements; technical implementation guidance encouraged at the group level.                                  |

### 1.6 Terminology

- **Material**: Frontend capabilities that can be preserved and used directly, generally manifested as business components, blocks, and templates.
- **Business Component**: A component defined on top of base components within a business domain. It may include interactions or business data specific to a particular business domain, exposes only configurable properties externally, and must be published to the public domain (e.g., Alibaba NPM). It can circulate within the same business domain, but cross-business-domain reuse is not required.
  - **Low-Code Business Component**: Built through a low-code editor, distinct from source-code-developed business components. It is a type of business component that follows the business component definition. Low-code business components can also be edited multiple times through the low-code editor.
- **Block**: Composed by nesting and combining a series of business components and layout components through low-code building. It does not expose configurable properties externally. Wrapped by a block container component, the interior of a block can have complete styling, events, lifecycle management, state management, and data flow mechanisms. It can exist and run independently, and can be quickly reused across pages and applications by copying schema, ensuring normal functionality and data.
- **Template**: Business components and blocks within a specific vertical business domain can be combined into a single page, or combined with routing into a set of multiple pages, collectively referred to as templates.

### 1.7 Background of the Material Specification

Currently, business integration within the group is frequent, and the lack of unified material specifications brings additional high costs to business integration. On the other hand, frontend materials across various BUs in the group also have varying degrees of duplicate construction. We expect that group-level material circulation will not hinder the development of business integration, while improving material richness through group-level material circulation, improving mid/back-office system development efficiency through rich material reuse, and providing high-quality starter materials for new business scenarios.

### 1.8 Material Specification Definitions

- **Source Code Material Specification**: A directory specification oriented toward developers, used to standardize and constrain code, documentation, and interface specifications during development, to facilitate material circulation within the group.
- **Building Material Specification**: A Schema specification oriented toward developers, used to standardize and constrain code, documentation, and interface specifications during development, to facilitate material circulation within the group.

## 2. Material Specification - Business Component Specification

### 2.1 Source Code Specification

#### 2.1.1 Directory Specification (A)

```
component                       //  Component name, e.g., biz-button
  ├── build                     // [Build output] [Required]
  │   └── index.html            // [Build output] [Required] Directly previewable file
  ├── lib                       // [Build output] [Required]
  │   ├── index.js              // [Build output] [Required] JS entry file
  │   ├── index.scss            // [Build output] [Required] CSS entry file
  │   └── style.js              // [Build output] [Required] JS version of CSS entry file, for deduplication
  ├── demo                      // [Required] Component documentation directory, can have multiple md files
  │   └── basic.md              // [Required] Component documentation example, used to generate component development preview and component documentation
  ├── src                       // [Required] Component source code
  │   ├── index.js              // [Required] Component export file
  │   └── index.scss            // [Required] Source file containing only the component's own styles
  ├── README.md                 // [Required] Component description and API
  └── package.json              // [Required] Component package.json
```

##### README.md

- README.md should contain the business component's source information, usage instructions, and API. Example:

```
# Button                             // This line is the title

Button is used to start an instant action.  // This line is the description

{This section is automatically injected by engineering capabilities; developers do not need to write it
## Installation
npm install @alifd/ice-layout -S
}

## API

| Parameter | Description | Type   | Optional Values     | Default |
| --------- | ----------- | ------ | ------------------- | ------- |
| type      | Type        | String | `primary`, `normal` | `normal` |
```

- README.en-US.md (file naming follows the [bcp47 specification](http://www.rfc-editor.org/rfc/bcp/bcp47.txt)) for multi-language support, optional

```
# Button

Button use to trigger an action.

{This section is automatically injected by engineering capabilities; developers do not need to write it
## Install
npm install @alifd/ice-layout -S
}

## API

| Param | Description | Type   | Enum                | Default |
| ----- | ----------- | ------ | ------------------- | ------- |
| type  | type        | String | `primray`, `normal` | normal  |
```

##### package.json

`package.json` contains dependency information and configuration information. Example:

```json
{
  "name": "@alife/1688-button",
  "description": "Business component description",
  "version": "0.0.1",
  "main": "lib/index.js",
  "stylePath": "lib/style.js", // [Private field] Style file path, referenced by webpack plugin
  "files": [
    "demo/",
    "lib/",
    "build/" // Stores compiled demo; this directory should be generated before publishing
  ],
  "dependencies": {
    "@alifd/next": "1.x" // [Optional] Can be a util-type component; if depending on next, be sure to write semantic version numbers, do not write * like this
  },
  "devDependencies": {
    "react": "^16.5.0",
    "react-dom": "^16.5.0"
  },
  "peerDependencies": {
    "react": "^16.5.0"
  },
  "componentConfig": {
    // [Private field] Component configuration information
    "name": "button", // Component English name
    "title": "Button", // Component Chinese name
    "category": "form" // Component category
  }
}
```

##### src/index.js

Contains the component export file. Example:

```javascript
import Button from './Button.jsx';
import ButtonGroup from './ButtonGroup.jsx';

export const Group = ButtonGroup; // Recommended sub-component pattern

export default Button;
```

Recommended usage

```javascript
import Button, { Group } form '@scope/button';
```

##### src/index.scss

```css
/* Do not import styles of dependent components, e.g., component import { Button } from '@alifd/next'; */
/* No need to import @import '~@alifd/next/lib/button/index.scss'; in index.scss */

/* Import this section if theme variables are needed */
@import '~@alifd/next/variables.scss';

/* Component's own styles */
.custom-component {
  color: $color-brand1-1;
}
```

##### demo

The demo directory stores component documentation. Business components without documentation provide no value, so demo is required. Files under the demo directory use markdown format and can be multiple files. Example (demo/basic.md):

demo/basic.md

````
---
title: {Button Types}
order: {Document sort order, number, 0 is smallest, sorted from small to large}
---

Buttons have three visual levels: primary button, secondary button, and normal button. Different types can be used to distinguish the importance of buttons.

:::lang=en-US
---
title: Container
order: 3
---

Change the default container by passing a function to `container`;
enable `useAbsolute` to use `absolute position` to implement affix component;

:::

```jsx    // The following is recommended to be written in English
import Button from '@alife/1688-button';

ReactDOM.render(<div className="test">
    <Button type="normal">english</Button>
</div>, mountNode);
```

```css
.test {
    background: #CCC;
}
```
````

#### 2.1.2 API Specification (A)

API is the property description of a component, serving as a reference for developers when configuring component properties. To maintain API consistency, we have established this API naming specification. For industry-standard, commonly accepted naming conventions, we follow community conventions. For cases where multiple rules exist in the industry and are difficult to determine, we choose one for everyone to follow.

##### General Rules

- All APIs use lower camelCase naming, such as `onChange`, `direction`, `defaultVisible`.
- Tag names use upper camelCase naming, such as `Menu`, `Slider`, `DatePicker`.

##### Common Naming

| API Name       | Type           | Description                                                                                                  | Common Values                                                      |
| :------------- | :------------- | :----------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| shape          | string         | Shape; use shape when there is a difference in the component's appearance                                    |                                                                    |
| direction      | enum           | Direction; values use abbreviated form.                                                                      | hoz (horizontal), ver (vertical)                                   |
| align          | enum           | Alignment                                                                                                    | tl, tc, tr, cl, cc, cr, bl, bc, br                                 |
| status         | enum           | Status                                                                                                       | normal, success, error, warning                                    |
| size           | enum           | Size                                                                                                         | small, medium, large; larger or smaller can use (xxs, xs, xl, xxl) |
| type           | enum or string | Category: 1. DOM structure unchanged, only skin changes 2. Component type has only a few parallel categories | normal, primary, secondary                                         |
| visible        | boolean        | Whether to display                                                                                           |                                                                    |
| defaultVisible | boolean        | Whether to display (uncontrolled)                                                                            |                                                                    |
| disabled       | boolean        | Disable component                                                                                            |                                                                    |
| closable       | bool/string    | Allowed close methods                                                                                        |                                                                    |
| htmlType       | string         | When native component type conflicts with Fusion component type, native component uses `htmlType`            |                                                                    |
| link           | string         | Link                                                                                                         |                                                                    |
| dataSource     | array          | List data source                                                                                             | [{label, value}, {label, value}]                                   |
| has+'Property' | boolean        | Has a certain property                                                                                       | e.g., `hasArrow`, `hasHeader`, `hasClose`, etc.                    |

##### Multi-Select Enum

When an API interface allows users to specify multiple enum values, we define this interface as a multi-select enum. A typical example is the `closable` property of an overlay component, where we allow closing via: keyboard Esc key, clicking mask, clicking close button, clicking any area outside the component.

Do not have one API value support multiple types. For example, for an overlay component, we allow closing via esc, clicking mask, clicking close button, etc. In this case, API design can be carried by multiple APIs, for example:

```js
closable?: boolean;         // Default is true
closeMode?: CM[] | string;  // Default value is ['close', 'mask', 'esc']
```

true means all trigger rules will close; false means trigger rules will not close.

Examples:

- `<Dialog closable closeMode={['close', 'mask', 'esc']} />`, all valid conditions will close
- `<Dialog closable={false} />`, will not close under any circumstances; can only close by controlled visible setting
- `<Dialog closable closeMode={['close', 'esc']} />`, user pressing esc or clicking close button will close

##### Events

- Standard events or custom events conforming to W3C standards must be named starting with on, i.e., `on` + event name, such as onExpand.

##### Form Specification

- Support [controlled mode](https://reactjs.org/docs/forms.html#controlled-components) (value + onChange) (A)
  - value controls component data display
  - onChange callback function when component changes (first parameter can be value)
- When `value={undefined}`, clear data; field's reset function will send undefined data to all components (AA)
- Throw one onChange event per complete operation `recommended`; for example, if there is Process indicating in-progress state, it is recommended to add API `onProcess`; if there is Start indicating start state, it is recommended to add API `onStart` (AA)

##### Property Passing

**1. Atomic Component**

> The smallest unit that cannot be further decomposed

Examples: Input/Button/NumberPicker

Expected to be used like ordinary HTML tags, passing user-provided parameters through to the actual node.

```jsx
<Input id="my-input" aria-label="this is input" />
```

Rendered DOM structure:

```jsx
<span class="next-input next-medium">
  <input id="my-input"  aria-label="this is input" height="100%" autocomplete="off" value="">
</span>
```

**2. Composite Component**

Composite components are generally composed of two or more atomic components/composite components, e.g., Select consists of Input + popup, Search consists of Select + Button, TreeSelect consists of Tree + Select.

To improve component usability, API property requirements are as follows:

1. Properties of the core atomic component of a composite component (e.g., the core atomic component of Search is Input) and frequently used properties are recommended to be flattened, allowing the composite component to use their properties directly;
2. Non-core atomic components within a composite component pass parameters to the corresponding atomic component via `xxxProps` (e.g., inputProps/btnProps).

**Property Flattening Example**:

For example, the `Search` component consists of `Input` and `Button`, but `Search` is more like `Input`, so `Input` is treated as the primary component with flattened properties. That is, use some `Input` properties directly on the `Search` component. `<Search innerBefore="before text">`

For example, both `Select` and `TreeSelect` have overlay parts. The `visible` property of `Overlay` `Overlay.Popup` has high usage, generally used for popup scroll following under fixed layout. Therefore, expose this property to the outermost layer to simplify usage: `<Select visible={true}>`

**xxxProps Example**:
For example, the `Search` component consists of `Input` and `Button`. `Button` properties are passed to the internal `Button` via `buttonProps`. `<Search buttonProps={{loading: true}}>`

#### 2.1.3 Registration Method (A)

Registration means: publishing the component and storing it in the group material center for unified management and circulation.

step 1: Publish component to tnpm

```bash
$ tnpm publish
```

step 2: Sync to group material center

```bash
# Install tool
$ tnpm i iceworks -g
# Execute sync
$ iceworks sync
```

#### 2.1.4 Internationalization and Multi-Language Support Specification (AA)

File naming follows the [bcp47](https://tools.ietf.org/html/bcp47) specification

##### Directory Specification

Add a `locale` directory under the `src` directory to manage copy for different languages.

```
|- BizHello
|-- src
|---- locale
|------ zh-CN.js
|------ en-US.js
|------ ja-JP.js
```

##### Define Different Languages

```javascript
// zh-CN.js
export default {
  hello: 'Hello, world',
};
```

```javascript
// en-US.js
export default {
  hello: 'hello world',
};
```

```javascript
// ja-JP.js
export default {
  hello: 'Hello, world',
};
```

##### Recommended Multi-Language Support for Components

```jsx
// index.jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zhCN from './locale/zh-CN.js'; // Import default language
export default class BizHello extends Component {
  static componentName = 'BizHello';

  static propTypes = {
    locale: PropTypes.object, // Add locale for configuring copy
  };

  static defaultProps = {
    locale: zhCN,
  };

  render() {
    const { locale } = this.props;
    return <div>{locale.hello}</div>;
  }
}
```

##### Global Replacement of Internationalization Copy for Components

Support global replacement of internationalization copy with ConfigProvider.

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider } from '@alifd/next';
import zhCN from './locale/zh-CN.js'; // Import default language
class BizHello extends Component {
  static propTypes = {
    locale: PropTypes.object, // Add locale for configuring copy
  };

  static defaultProps = {
    locale: zhCN,
  };

  render() {
    const { locale } = this.props;
    return <div>{locale.hello}</div>;
  }
}
export default ConfigProvider.config(BizHello, {
  componentName: 'BizHello', // Specify component name; defaults to component's displayName
});
```

#### 2.1.5 Theme Switching Specification (AA)

If a business component has custom UI that needs to follow theme colors, be sure to introduce variables to increase component circulation.

##### src/index.scss

```css
/* Import this section if theme variables are needed */
@import '~@alifd/next/variables.scss';

/* Component's own styles */
.custom-component {
  color: $color-brand1-1;
}
```

#### 2.1.6 [Deprecated] Design Draft Support (AAA)

The purpose of integrating with the Sketch plugin (FusionCool) is to allow business components produced by development to be used directly by designers, similar to how Fusion Next base components are used now.

Add file `adaptor/index.js`.

```jsx
import BizButton from '@alifd/biz-button';

export default {
  name: 'BizButton',
  editor: () => ({
    props: [
      {
        name: 'level',
        type: 'enum',
        options: ['normal', 'primary', 'secondary'],
      },
      {
        name: 'size',
        type: 'enum',
        options: ['large', 'medium', 'small'],
        default: 'medium',
      },
    ],
    data: {
      default: 'hello',
    },
  }), // Content editor
  adaptor: ({ data, level, size, ...others }) => {
    return (
      <BizButton type={level} size={size}>
        {data}
      </BizButton>
    );
  },
};
```

API property standards reference [https://fusion.design/help.html#/dev-biz](https://fusion.design/help.html#/dev-biz)

#### 2.1.7 Accessibility Specification (AAA)

Accessibility must comply with [WCAG 2.1 Level A standard](https://www.w3.org/TR/WCAG21/). Refer to [W3C Accessibility Best Practices](https://www.w3.org/TR/wai-aria-practices-1.1/), [Fusion Accessibility Guide 2.3.1](https://alibaba-fusion.github.io/next/part1/basics.html), and other chapters.

##### Add a11y.md Accessibility Demo

Components that require API usage to complete accessibility work must provide accessibility usage documentation for developers. Please [refer to](https://fusion.design/pc/component/select?themeid=2#accessibility-container) `ARIA and Keyboard` in component API. It is recommended to add an `a11y.md` file in the `demo` directory to demonstrate component accessibility usage.

```
component
  └─ demo
      ├─ a11y.md
      └─ basic.md
```

For detailed guidance, see the accessibility development guide [https://alibaba-fusion.github.io/next/part1/basics.html](https://alibaba-fusion.github.io/next/part1/basics.html).

##### Keyboard Quick Access

Common keyboard events include Up Arrow/Down Arrow/Enter/Esc/Tab

Example: Select keyboard event description

| Key        | Description                      |
| :--------- | :------------------------------- |
| Up Arrow   | Move focus to previous item      |
| Down Arrow | Move focus to next item          |
| Enter      | Open list or select current item |
| Esc        | Close list                       |

##### Screen Reader Friendly

- For components, we build in `role` and specific `aria-_` attributes for developers. Developers can also pass through non-component API attributes to DOM elements to modify `role` and `aria-_` parameters, but pay attention to the corresponding relationships. Please [refer to](https://alibaba-fusion.github.io/next/part1/WAI-ARIA.html).
- Some special components require passing parameters to support accessibility. Set `id`, `autoFocus`, and pass parameters as follows:
  - id - `Balloon`, `Rating`
  - autoFocus - Overlay auto focus, e.g., `Dialog`, `Overlay`, `Dropdown`
  - Pass parameters - Some components need to implement different accessibility based on specific business. We build in some parameters for developers. When using accessibility, users only need to select corresponding built-in parameters based on existing requirements, e.g., setting aria-label. The following components require user parameters to support accessibility: `NumberPicker`, `Transfer`

### 2.2 Low-Code Specification

#### 2.2.1 Component Specification

Built through a low-code editor, distinct from source-code-developed business components. It is a type of business component that follows the business component definition. Low-code business components can also be edited multiple times through the low-code editor.

| Root Property Description | Description                                                                                                                                                          | Type   |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| version                   | Protocol version number                                                                                                                                              | String |
| componentsMap             | Collection describing component mapping relationships                                                                                                                | Array  |
| componentsTree            | Low-code business component tree description; a fixed-length array of 1, containing only the root container description (low-code business component container type) | Array  |
| utils                     | Utility class extension mapping relationships                                                                                                                        | Array  |
| i18n                      | Internationalization corpus                                                                                                                                          | Object |

Description example:

```json
{
  "version": "1.0.0",
  "componentsMap": [{}],
  "componentsTree": [
    {
      // Low-code business component tree, top level wrapped by low-code business component container;
      "componentName": "Component", // Low-code business component container component name
      "fileName": "SearchComp", // Low-code business component file name; first letter will also be capitalized as low-code business component name
      "props": {}, // Generally not defined; if data exists, used to simulate externally passed property values
      "css": "body {font-size: 12px;}",
      "state": {
        "name": "lucy"
      },
      "static": {}, // Used to define custom component static properties
      "defaultProps": {
        // Default props: optional, only used to define fixed default property object for low-code business component
        "name": "xxx"
      },
      "children": [
        {
          "componentName": "Div",
          "props": {
            "className": "className1"
          },
          "children": [
            {
              "componentName": "Button",
              "props": {
                "text": "Click to show my name",
                "onClick": {
                  "type": "JSFunction",
                  "value": "function(e){\
              alert(this.state.name)\
            }"
                }
              }
            }
          ]
        }
      ]
    }
  ],
  "i18n": {}
}
```

#### 2.2.2 Component Description Protocol

Standardized description of the configuration capabilities and interaction behaviors that source code components possess when used in low-code building platforms, keeping component integration implementations consistent across different platforms, allowing components to use a unified description when integrating with different building platforms, making component circulation across different businesses possible.

##### 2.2.2.1 Protocol Structure

Single component description content is in JSON structure, mainly containing the following three parts:

- **Basic Information (A):** Describes basic component information, usually including package information, component name, title, description, etc.
- **Component Property Information (A):** Describes component property information, usually containing parameter, description, type, and default value.
- **Capability Configuration/Experience Enhancement:** Recommended configuration information for optimizing building product editing experience and customizing editing capabilities.

##### 2.2.2.2 Basic Information (A)

| Field             | Field Description                                                                                                                                                                                                      | Field Type                | Nullable |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------- |
| componentName     | Component name                                                                                                                                                                                                         | String                    | No       |
| title             | Component Chinese name                                                                                                                                                                                                 | String                    | No       |
| description       | Component description                                                                                                                                                                                                  | String                    | Yes      |
| docUrl            | Component documentation link                                                                                                                                                                                           | String                    | No       |
| screenshot        | Component snapshot                                                                                                                                                                                                     | String                    | No       |
| icon              | Component small icon                                                                                                                                                                                                   | String (URL)              | Yes      |
| tags              | Component tags                                                                                                                                                                                                         | String                    | Yes      |
| keywords          | Component keywords for search suggestions                                                                                                                                                                              | String                    | Yes      |
| devMode           | Component development mode                                                                                                                                                                                             | String (proCode, lowCode) | Yes      |
| npm               | Complete npm source import description object                                                                                                                                                                          | Object                    | No       |
| npm.package       | Source code component library name                                                                                                                                                                                     | String                    | No       |
| npm.exportName    | Source code component name                                                                                                                                                                                             | String                    | No       |
| npm.subName       | Sub-component name                                                                                                                                                                                                     | String                    | No       |
| npm.destructuring | Destructuring                                                                                                                                                                                                          | Bool                      | No       |
| npm.main          | Component path                                                                                                                                                                                                         | String                    | No       |
| npm.version       | Source code component version number                                                                                                                                                                                   | String                    | No       |
| snippets          | Content is low-code schema for component in different states (can be multiple). When user drags component from component panel to designer, component low-code schema defined in snippets is inserted into page schema | Object[]                  | No       |
| group             | Describes which tab of the component panel the current component is in                                                                                                                                                 | String                    | No       |
| category          | Describes which area within the same tab of the component panel the component is in                                                                                                                                    | String                    | No       |
| priority          | Describes sorting of component within the same category                                                                                                                                                                | String                    | No       |

##### 2.2.2.3 Component Property Information props (A)

Describes component property information, usually containing name, type, description, and default value.

| Field        | Field Description      | Field Type    | Nullable |
| ------------ | ---------------------- | ------------- | -------- |
| name         | Property name          | String        | No       |
| propType     | Property type          | String/Object | No       |
| description  | Property description   | String        | Yes      |
| defaultValue | Property default value | Any           | Yes      |

propType types reference [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes). There are **basic types** and **composite types**, described as follows:

**Basic Types**

| propType Value                                     | Type Description                      | Reference PropTypes Type  |
| -------------------------------------------------- | ------------------------------------- | ------------------------- |
| 'array'                                            | Array type                            | PropTypes.array           |
| 'bool'                                             | Boolean type                          | PropTypes.bool            |
| 'func'                                             | Function type                         | PropTypes.func            |
| 'number'                                           | Number type                           | PropTypes.number          |
| 'object'                                           | Object type                           | PropTypes.object          |
| 'string'                                           | String type                           | PropTypes.string          |
| 'node'                                             | Node type                             | PropTypes.node            |
| 'element'                                          | Element type                          | PropTypes.element         |
| 'any'                                              | Any value type                        | PropTypes.any             |
| {<br /> type: 'xxx',<br /> isRequired: true<br />} | Specified type, and required property | PropTypes.xxxx.isRequired |

> Note: All the above types support PropTypes.xxx.isRequired chained description to indicate whether the property is **required**.

Description example:

```javascript
// Component source code
export default class FusionForm extends PureComponent {
  static displayName = 'FusionForm';
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    friends: PropTypes.array,
  };
  render(){
    return ...;
  }
}

// Component property description
{
  props: [{
    name: 'name',
    propType: {
      type: 'string',
      isRequired: true,
    },
    description: 'Used to describe name',
    defaultValue: 'Zhang San',
  }, {
    name: 'age',
    propType: 'number',
    description: 'Used to describe age',
    defaultValue: 18,
  }, {
    name: 'friends',
    propType: 'array',
    description: 'Used to describe friend list',
    defaultValue: [ 'Li Si', 'Wang Wu', 'Zhao Liu' ],
  }],
}
```

**Composite Types**

| propType Value                                                                                                                                                                                                  | Type Description                                                           | PropTypes Type           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------ |
| {<br /> type: 'oneOf',<br /> value: ['a', 'b', 'c', '...']<br />}                                                                                                                                               | Enum value type                                                            | PropTypes.oneOf(...)     |
| {<br /> type: 'oneOfType',<br /> value: ['string', 'number', {<br /> type: 'array',<br /> isRequired: true<br /> }]<br />}                                                                                      | One of specified types, supports recursive description                     | PropTypes.oneOfType(...) |
| {<br /> type: 'arrayOf',<br /> value: 'number'<br />}                                                                                                                                                           | Array type with unified member **value type**                              | PropTypes.arrayOf(...)   |
| {<br /> type: 'objectOf',<br /> value: 'string'<br />}                                                                                                                                                          | Object type with unified object property **value type**                    | PropTypes.objectOf(...)  |
| {<br /> type: 'shape',<br /> value: [{<br /> name: 'color',<br /> propType: 'string'<br /> }, {<br /> name: 'fontSize',<br /> propType: {<br /> type: 'number',<br /> isRequied: true <br /> } <br /> }]<br />} | Object type specifying partial **property names** and **value types**      | PropTypes.shape(...)     |
| {<br /> type: 'exact',<br /> value: [{<br /> name: 'name',<br /> propType: 'string' <br /> }, {<br /> name: 'quantity',<br /> propType: 'number'<br /> }]<br />}                                                | Object type strictly specifying all **property names** and **value types** | PropTypes.exact(...)     |

Description example:

```javascript
// Component source code
export default class FusionForm extends PureComponent {
  static displayName = 'FusionForm';
  static propTypes = {
    title: PropTypes.oneOf(['News', 'Photos']),
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Message),
    ]),
    size: PropTypes.arrayOf(PropTypes.number),
    bodyStyle: PropTypes.shape({
      color: PropTypes.string,
      fontSize: PropTypes.number,
    }),
    extraContext: function (props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error(
          'Invalid prop `' + propName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    },
  };
  render() {
    return ...;
  }
}

// Component property description
{
  props: [{
    name: 'title',
    propType: {
      type: 'oneOf',
      value: ['News', 'Photos'],
    },
    description: 'Used to describe title',
    defaultValue: 'Title One',
  }, {
    name: 'message',
    propType: {
      type: 'oneOfType',
      value: ['string', 'number', {
        type: 'array',
        isRequired: true,
      }],
    },
    description: 'Used to describe message content',
    defaultValue: 'xxx',
  }, {
    name: 'size',
    propType: {
      type: 'arrayOf',
      value: 'number',
    },
    description: 'Used to describe size list',
    defaultValue: [1, 2, 3],
  }], {
    name: 'bodyStyle',
    propType: {
      type: 'shape',
      value: [{
        name: 'color',
        propType: 'string',
      }, {
        name: 'fontSize',
        propType: {
          type: 'number',
          isRequied: true,
        }
      }],
    },
    description: 'Used to describe body style',
    defaultValue: [1, 2, 3],
  }],
}
```

##### 2.2.2.4 Editing Experience Enhancement configure

Recommended configuration information for optimizing building product editing experience and customizing editing capabilities. Through capability abstraction classification, it mainly contains configuration items in the following dimensions:

| Field                           | Field Description                                             | Field Type | Notes                                                                                                                                                                                                                          |
| ------------------------------- | ------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| props (A)                       | Property panel configuration                                  | Array      | Used for property panel capability description                                                                                                                                                                                 |
| component(A)                    | Component capability configuration                            | Object     | Descriptions of component-related capabilities, constraints, behaviors, etc.; some information can be obtained directly from component view instances                                                                          |
| supports (AA)                   | General extension configuration capability support            | Object     | Used for general extension panel capability description                                                                                                                                                                        |
| advanced (AAA)                  | Advanced feature configuration                                | Object     | Users can control component behavior in the designer through engine context in these configurations, e.g., auto-initializing component sub-components, intercepting component operation events for personalized handling, etc. |
| [Deprecated] experimental (AAA) | Place some experimental engine features in this configuration | Object     | Users can experience these features in advance                                                                                                                                                                                 |

###### 2.2.2.4.1 Property Panel Configuration props (A)

Object field descriptions under props array:

| Field               | Field Description                                                                                                                     | Field Type                                     | Notes                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| type                | Specify type                                                                                                                          | Enum                                           | Optional values are `'field'                                                                                   | 'group'`, default is 'field' |
| display             | Specify type                                                                                                                          | Enum                                           | Optional values are `'accordion' \| 'inline' \| 'block' \| 'plain' \| 'popup' \| 'entry'`, default is 'inline' |
| title               | Category title                                                                                                                        | Property title                                 | String                                                                                                         |                              |
| items               | Property list under category                                                                                                          | Array\<Object\>                                | Effective when type = 'group'                                                                                  |
| name                | Property name                                                                                                                         | String                                         | Effective when type = 'field'                                                                                  |
| defaultValue        | Default value                                                                                                                         | Any (depends on field type)                    | Effective when type = 'field'                                                                                  |
| supportVariable     | Whether variable configuration is supported                                                                                           | Boolean                                        | Effective when type = 'field'                                                                                  |
| condition           | Configure whether current prop is displayed                                                                                           | (target: IPublicModelSettingField) => boolean; | -                                                                                                              |
| ignoreDefaultValue  | Configure whether current prop ignores default value handling logic; if return value is true, engine will not handle default value    | (target: IPublicModelSettingField) => boolean; | -                                                                                                              |
| setter              | Single control (setter) description, building base protocol component description object, supports JSExpression / JSFunction / JSSlot | `String\|Object\|Function`                     | Effective when type = 'field'                                                                                  |
| extraProps          | Other configuration properties (not required for circulation)                                                                         | Object                                         | Other configuration                                                                                            |
| extraProps.getValue | Called when setter renders; setter sets current setter value based on return value of this function                                   | Function                                       | (target: IPublicModelSettingField, value: any) => any;                                                         |
| extraProps.setValue | Called when setter content changes; developers can modify node schema or perform other operations inside this function                | Function                                       | (target: IPublicModelSettingField, value: any) => void;                                                        |

Determine corresponding control type (setter) based on property value type propType.

###### 2.2.2.4.2 General Extension Panel Support Configuration supports (AA)

Style configuration panel capability description, describing whether industry style editing is supported, whether class name setting is supported, etc.

```json
{
  "configure": {
    // Supported event enum
    "supports": {
      // Supported event list
      "events": ["onClick", "onChange"],
      // Supports loop setting
      "loop": true,
      // Supports condition setting
      "condition": true,
      // Supports style setting
      "style": true
    }
  }
}
```

###### 2.2.2.4.3 Component Capability Configuration component

Descriptions of component-related capabilities, constraints, behaviors, etc.; some information can be obtained directly from component view instances. Contains the following fields:

| Field                           | Purpose                                                                                                                                                                                                                                           | Type               |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| isContainer(A)                  | Whether it is a container component                                                                                                                                                                                                               | Boolean            |
| isModal(A)                      | Whether component has overlay; overlay components block canvas area when dragged into designer, auxiliary interactions should be provided to prevent blocking                                                                                     | Boolean            |
| descriptor(A)                   | Component tree description information                                                                                                                                                                                                            | String             |
| nestingRule(A)                  | Nesting control: prevents incorrect node nesting, e.g., a nesting a, FormField only under Form container, Column only under Table, etc.                                                                                                           | Object             |
| nestingRule.childWhitelist      | Child node type whitelist                                                                                                                                                                                                                         | `String\|Function` |
| nestingRule.parentWhitelist     | Parent node type whitelist                                                                                                                                                                                                                        | `String\|Function` |
| nestingRule.descendantBlacklist | Descendant node type blacklist                                                                                                                                                                                                                    | `String\|Function` |
| nestingRule.ancestorWhitelist   | Ancestor node type whitelist                                                                                                                                                                                                                      | `String\|Function` |
| isNullNode(AAA)                 | Whether there is a rendered root node                                                                                                                                                                                                             | Boolean            |
| isLayout(AAA)                   | Whether it is a layout component                                                                                                                                                                                                                  | Boolean            |
| rootSelector(AAA)               | CSS selector for component selection box                                                                                                                                                                                                          | String             |
| disableBehaviors(AAA)           | Used to disable operation items provided when selecting component in designer; default operations are copy, hide, remove                                                                                                                          | String[]           |
| actions(AAA)                    | Used to configure the content of the above operation items in detail                                                                                                                                                                              | Object             |
| isMinimalRenderUnit             | Whether it is the minimal render unit; component rendering and updates under minimal render unit start from the unit's root node. If multiple layers of minimal render units are nested, rendering starts from the outermost minimal render unit. | Boolean            |

Description example:

```js
{
  configure: {
    component: {
      isContainer: true,
      isModal: false,
      descriptor: 'title',
      nestingRule: {
        childWhitelist: ['SelectOption'],
        parentWhitelist: ['Select', 'Table'],
      },
      rootSelector: '.next-dialog',
      disableBehaviors: ['copy', 'remove'],
      actions: {
        name: 'copy', // string;
        content: '＋', // string | ReactNode | ActionContentObject;
        items: [], // ComponentAction[];
        condition: 'always', // boolean | ((currentNode: any) => boolean) | 'always';
        important: true, // boolean;
      },
    },
  },
}
```

###### 2.2.2.4.4 Advanced Feature Configuration advanced (AAA)

Event callbacks and hooks and other advanced feature configurations for components in the low-code engine designer. Contains the following fields:

| Field                       | Purpose                                                                                                               | Type                           | Notes                                               |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------- | --- | --- | --- | ---- | ---- | ---- | --------------------------------------------------------------------------- | ------------- | ---------- | ------------------------------ |
| initialChildren             | Automatically generate children node schema according to this configuration when component is dragged into "designer" | NodeData[]/Function NodeData[] | ((target: IPublicModelSettingField) => NodeData[]); |
| getResizingHandlers         | Used to configure style and content of component resize operation tools in designer                                   | Function                       | (currentNode: any) => Array<{ type: 'N'             | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SE' | 'SW'; content?: ReactElement; propTarget?: string; appearOn?: 'mouse-enter' | 'mouse-hover' | 'selected' | 'always'; }> / ReactElement[]; |
| callbacks                   | Configure callbacks to capture some events thrown by engine, e.g., onNodeAdd, onResize, etc.                          | Callback                       | -                                                   |
| callbacks.onNodeAdd         | Event callback triggered when dragging component into container                                                       | Function                       | (e: MouseEvent, currentNode: any) => any            |
| callbacks.onNodeRemove      | Event callback triggered when deleting component in container                                                         | Function                       | (e: MouseEvent, currentNode: any) => any            |
| callbacks.onResize          | Event callback triggered when adjusting container size, often used with getResizingHandlers                           | Function                       | See Types definition                                |
| callbacks.onResizeStart     | Event callback triggered when container resize starts, often used with getResizingHandlers                            | Function                       | See Types definition                                |
| callbacks.onResizeEnd       | Event callback triggered when container resize ends, often used with getResizingHandlers                              | Function                       | See Types definition                                |
| callbacks.onSubtreeModified | Callback triggered when container node structure tree changes                                                         | Function                       | (currentNode: any, options: any) => void;           |
| callbacks.onMouseDownHook   | Mouse down operation callback                                                                                         | Function                       | (e: MouseEvent, currentNode: any) => any;           |
| callbacks.onClickHook       | Mouse click operation callback                                                                                        | Function                       | (e: MouseEvent, currentNode: any) => any;           |
| callbacks.onDblClickHook    | Mouse double-click operation callback                                                                                 | Function                       | (e: MouseEvent, currentNode: any) => any;           |
| callbacks.onMoveHook        | Node drag callback                                                                                                    | Function                       | (currentNode: any) => boolean;                      |
| callbacks.onHoverHook       | Node hover callback                                                                                                   | Function                       | (currentNode: any) => boolean;                      |
| callbacks.onChildMoveHook   | Container node child node drag callback                                                                               | Function                       | (childNode: any, currentNode: any) => boolean;      |

Description example:

```js
{
  configure: {
    advanced: {
      callbacks: {
        onNodeAdd: (dragment, currentNode) => {

        }
      },
      getResizingHandlers: () => {
        return [ 'E' ];
      },
      initials: [
        {
          name: 'linkType',
          initial: () => 'link'
        },
      ]
    },
  }
}
```

##### 2.2.2.5 TypeScript Definitions

```TypeScript

export interface ConfigureProp {
  /**
   * Whether panel configuration belongs to a single field or a group
   */
  type?: 'field' | 'group';
  /**
   * the name of this setting field, which used in quickEditor
   */
  name: string | number;
  /**
   * the field title
   * @default sameas .name
   */
  title?: TitleContent;
  /**
   * Setter configuration for a single property
   *
   * the field body contains when .type = 'field'
   */
  setter?: SetterType | DynamicSetter;
  /**
   * the setting items which group body contains when .type = 'group'
   */
  items?: ConfigureProp[];
  /**
   * extra props for field
   * Other configuration properties (not required for circulation)
   */
  extraProps?: ExtraProps;
}

export interface ConfigureSupport {
  /**
   * Supported event list
   */
  events?: ConfigureSupportEvent[];
  /**
   * Supports className setting
   */
  className?: boolean;
  /**
   * Supports style setting
   */
  style?: boolean;
  /**
   * Supports lifecycle setting
   */
  lifecycles?: any[];
  // general?: boolean;
  /**
   * Supports loop setting
   */
  loop?: boolean;
  /**
   * Supports conditional rendering setting
   */
  condition?: boolean;
}

export interface ConfigureComponent {
  /**
   * Whether it is a container component
   */
  isContainer?: boolean;
  /**
   * Whether component has overlay; overlay components block canvas area when dragged into designer, auxiliary interactions should be provided to prevent blocking
   */
  isModal?: boolean;
  /**
   * Whether there is a rendered root node
   */
  isNullNode?: boolean;
  /**
   * Component tree description information
   */
  descriptor?: string;
  /**
   * Nesting control: prevents incorrect node nesting
   * e.g., a nesting a, FormField only under Form container, Column only under Table, etc.
   */
  nestingRule?: NestingRule;

  /**
   * Whether it is the minimal render unit
   * Component rendering and updates under minimal render unit start from the unit's root node. If multiple layers of minimal render units are nested, rendering starts from the outermost minimal render unit.
   */
  isMinimalRenderUnit?: boolean;

  /**
   * CSS selector for component selection box
   */
  rootSelector?: string;
  /**
   * Disabled behaviors, can be `'copy'`, `'move'`, `'remove'`, or an array of them
   */
  disableBehaviors?: string[] | string;
  /**
   * Used to configure the content of the above operation items in detail
   */
  actions?: ComponentAction[];
}

export interface Advanced {
  /**
   * @todo Documentation to be added
   */
  context?: { [contextInfoName: string]: any };
  /**
   * @todo Documentation to be added
   */
  view?: ComponentType<any>;
  /**
   * @todo Documentation to be added
   */
  transducers?: any;
  /**
   * @todo Documentation to be added
   */
  filters?: FilterItem[];
  /**
   * @todo Documentation to be added
   */
  autoruns?: AutorunItem[];
  /**
   * Configure callbacks to capture some events thrown by engine, e.g., onNodeAdd, onResize, etc.
   */
  callbacks?: Callbacks;
  /**
   * Automatically bring in children list when dragging into container
   */
  initialChildren?: NodeData[] | ((target: IPublicModelSettingField) => NodeData[]);
  /**
   * @todo Documentation to be added
   */
  isAbsoluteLayoutContainer?: boolean;
  /**
   * @todo Documentation to be added
   */
  hideSelectTools?: boolean;

  /**
   * Style and position; handle must have clear identification for event routing judgment, or actively set event exclusive mode
   * NWSE is calculated and placed by engine; ReactElement must control initial position itself
   */
  /**
   * Used to configure style and content of component resize operation tools in designer
   * - Highlight handle on hover
   * - Request exclusive on mousedown
   * - Request general resizing control and hud display on dragstart
   * - Calculate and set effect on drag, update handle position
   */
  getResizingHandlers?: (
    currentNode: any,
  ) => (
    | Array<{
      type: 'N' | 'W' | 'S' | 'E' | 'NW' | 'NE' | 'SE' | 'SW';
      content?: ReactElement;
      propTarget?: string;
      appearOn?: 'mouse-enter' | 'mouse-hover' | 'selected' | 'always';
    }>
    | ReactElement[]
  );

  /**
   * Live Text Editing: if children content is plain text, supports double-click to edit directly
   */
  liveTextEditing?: LiveTextEditingConfig[];
}

export interface Configure {
  /**
   * Property panel configuration
   */
  props?: ConfigureProp[];
  /**
   * Component capability configuration
   */
  component?: ConfigureComponent;
  /**
   * General extension panel support configuration
   */
  supports?: ConfigureSupport;
  /**
   * Advanced feature configuration
   */
  advanced?: Advanced;
}

export interface Snippet {
  /**
   * Component category title
   */
  title?: string;
  /**
   * Snippet screenshot
   */
  screenshot?: string;
  /**
   * Snippet label
   *
   * @deprecated Not yet used
   */
  label?: string;
  /**
   * Schema to be inserted
   */
  schema?: NodeSchema;
}

export interface ComponentDescription { // Component description protocol; mapped to package via exportName in npm
  componentName: string;
  title: string;
  description?: string;
  docUrl: string;
  screenshot: string;
  icon?: string;
  tags?: string[];
  keywords?: string[];
  devMode?: 'proCode' | 'lowCode';
  npm: Npm;
  props: Prop[];
  configure: Configure;
  snippets: Snippet[];
  group: string;
  category: string;
  priority: number;
}
```

#### 2.2.3 Asset Package Protocol

##### 2.2.3.1 Protocol Structure

The top-level protocol structure is as follows, containing 5 aspects of description:

- version { String } Current protocol version number
- packages { Array } Resource list loaded in low-code editor
- components { Array } List of all component description protocols
- sort { Object } Used to describe tabs and categories in component panel

##### 2.2.3.2 version (A)

Defines the version number of the current protocol schema;

| Root Property Name | Type   | Description             | Variable Support | Default |
| ------------------ | ------ | ----------------------- | ---------------- | ------- |
| version            | String | Protocol version number | -                | 1.0.0   |

##### 2.2.3.3 packages (A)

Defines the resource list loaded in the low-code editor, including public library and component (library) CDN resources, etc.;

| Field                   | Field Description                                                             | Field Type      | Notes                                                         |
| ----------------------- | ----------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------- |
| packages[].title? (A)   | Resource title                                                                | String          | Resource title                                                |
| packages[].package (A)  | npm package name                                                              | String          | Unique identifier for component resource                      |
| packages[].version(A)   | npm package version number                                                    | String          | Component resource version number                             |
| packages[].library(A)   | Name when referenced as global variable, used to define global variable name  | String          | Low-code engine obtains component instance through this field |
| packages[].editUrls (A) | CDN url list after component edit-mode view is bundled, includes js and css   | Array\<String\> | Low-code engine editor will load these urls                   |
| packages[].urls (AA)    | CDN url list after component render-mode view is bundled, includes js and css | Array\<String\> | Low-code engine render module will load these urls            |

Description example:

```json
{
  "packages": [
    {
      "package": "moment",
      "version": "2.24.0",
      "urls": ["https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js"],
      "library": "moment"
    },
    {
      "package": "lodash",
      "library": "_",
      "urls": ["https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js"]
    },
    {
      "title": "fusion component library",
      "package": "@alifd/next",
      "version": "1.24.18",
      "urls": [
        "https://g.alicdn.com/code/lib/alifd__next/1.24.18/next.min.css",
        "https://g.alicdn.com/code/lib/alifd__next/1.24.18/next-with-locales.min.js"
      ],
      "library": "Next"
    },
    {
      "package": "@rchh/lowcode-materials",
      "version": "1.0.0",
      "library": "AlilcLowcodeMaterials",
      "urls": [
        "https://alifd.alicdn.com/npm/@rchh/lowcode-materials@1.0.0/dist/AlilcLowcodeMaterials.js",
        "https://alifd.alicdn.com/npm/@rchh/lowcode-materials@1.0.0/dist/AlilcLowcodeMaterials.css"
      ],
      "editUrls": [
        "https://alifd.alicdn.com/npm/@rchh/lowcode-materials@1.0.0/build/lowcode/view.js",
        "https://alifd.alicdn.com/npm/@rchh/lowcode-materials@1.0.0/build/lowcode/view.css"
      ]
    },
    {
      "package": "@alifd/fusion-ui",
      "version": "1.0.0",
      "library": "AlifdFusionUi",
      "urls": [
        "https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.0/build/lowcode/view.js",
        "https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.0/build/lowcode/view.css"
      ],
      "editUrls": [
        "https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.0/build/lowcode/view.js",
        "https://alifd.alicdn.com/npm/@alifd/fusion-ui@1.0.0/build/lowcode/view.css"
      ]
    }
  ]
}
```

##### 2.2.3.4 components (A)

Defines the list of all component description protocols. Component description protocols follow the definition in section 2.2.2 of this specification;

##### 2.2.3.5 sort (A)

Defines component list grouping

| Root Property Name | Type     | Description                                                                                                                           | Variable Support | Default                                      |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------- |
| sort.groupList     | String[] | Component groups, used for component panel tab display                                                                                | -                | ['Featured Components', 'Atomic Components'] |
| sort.categoryList  | String[] | Different areas within the same tab of the component panel are distinguished by category; category sorting follows categoryList order | -                | ['General', 'Data Display', 'Table', 'Form'] |

##### 2.2.3.6 TypeScript Definitions

```TypeScript
export interface ComponentSort {
  groupList?: String[]; // Used to describe tab items and their sorting in component panel, e.g.: ["Featured Components", "Atomic Components"]
  categoryList?: String[]; // Different areas within the same tab of the component panel are distinguished by category; category sorting follows categoryList order;
}

export interface Assets {
  version: string; // Asset package protocol version number
  packages?: Array<Package>; // Large package list; external and package concepts are similar and merged together
  components: Array<ComponentDescription> | Array<RemoteComponentDescription>; // List of all component description protocols
  componentList?: ComponentCategory[]; // [To be deprecated] Component category list, used to describe material panel
  sort: ComponentSort; // New field, used to describe tabs and categories in component panel
}

export interface RemoteComponentDescription {
  exportName: string; // Component description export name; component description Object content can be obtained via window[exportName];
  url: string; // Component description resource link;
  package: { // npm information of component (library);
    npm: string;
  }
}
```

## 3 Material Specification - Block Specification

### 3.1 Source Code Specification

English: block. Reusable code snippets; each block corresponds to one npm package.

#### 3.1.1 Directory (A)

```html
block/ ├── build │ ├── index.css // [Build output] │ ├── index.html // [Build output] [Required]
Directly previewable file │ ├── index.js // [Build output] │ └── views // [3A Build output]
html2sketch │ ├── block_view1.html // [3A Build output] HTML for sketch │ └── block_view1.png // [3A
Build output] Screenshot ├── src // [Required] Block source code │ ├── index.jsx // [Required] Entry
│ └── index.module.scss // [Optional] If styles exist, use CSS Modules to avoid conflicts ├──
README.md // [Optional] No format requirements └── package.json // [Required]
```

#### 3.1.2 package.json (A)

```json
{
  "name": "",
  "version": "",
  "description": "",
  "files": ["src/", "build/", "screenshot.png"],
  "blockConfig": {
    "name": "user-landing",
    "title": "User Welcome Message",
    "category": "form",
    "screenshot": "https://unpkg.com/@icedesign/user-landing-block/screenshot.png"
  }
}
```

#### 3.1.3 html2sketch (3A)

##### 3.1.3.1 blockConfig Structure in package.json

```json
{
  "blockConfig": {
    "name": "user-landing",
    "title": "User Welcome Message",
    "category": "form",
    "screenshot": "https://unpkg.com/@icedesign/user-landing-block/screenshot.png",
    "views": [
      {
        // Block views; configuring this enters fusion cool
        "title": "View 1 Title", // Block view title
        "props": {
          // Props supported by block
          "type": "primary"
        },
        "screenshot": "build/views/block_view1.png", // [Auto-filled on build] View screenshot, automatically generated during build
        "html": "build/views/block_view1.html" // [Auto-filled on build] Rendered HTML structure of view, automatically generated during build
      },
      {
        "title": "View 2 Title", // Block view title
        "props": {
          // Props supported by block
          "type": "sencondary"
        },
        "screenshot": "build/views/block_view2.png", // [Auto-filled on build] View screenshot, automatically generated during build
        "html": "build/views/block_view2.html" // [Auto-filled on build] Rendered HTML structure of view, automatically generated during build
      }
    ]
  }
}
```

### 3.2 Low-Code Specification

Composed by nesting and combining business components and layout components. Does not expose configurable properties externally. Wrapped by a **block container component**, the interior of the container can have complete styling, events, lifecycle management, state management, and data flow mechanisms. Can exist and run independently, enabling quick reuse across pages and applications, ensuring normal functionality and data.

| Root Property Description | Description                                                                     | Type   |
| ------------------------- | ------------------------------------------------------------------------------- | ------ |
| version                   | Protocol version number                                                         | String |
| componentsMap             | Collection describing component mapping relationships                           | Array  |
| componentsTree            | Block component tree description; top level is not restricted to component type | Array  |
| utils                     | Utility class extension mapping relationships                                   | Array  |
| i18n                      | Internationalization corpus                                                     | Object |

Description example 1:

```json
{
  "version": "1.0.0",
  "componentsMap": [{}],
  "componentsTree": [
    {
      // Block component tree, top level wrapped by block container component;
      "componentName": "Block", // Block container component name
      "fileName": "block1", // Block container 1
      "props": {},
      "css": "body {font-size: 12px;}",
      "state": {
        "name": "lucy"
      },
      "children": [
        {
          "componentName": "Div",
          "props": {
            "className": "className1"
          },
          "children": [
            {
              "componentName": "Button",
              "props": {
                "text": "Click to show my name",
                "onClick": {
                  "type": "JSFunction",
                  "value": "function(e){\
              alert(this.state.name)\
            }"
                }
              }
            }
          ]
        }
      ]
    }
  ],
  "i18n": {}
}
```

Description example 2:

```json
{
  "version": "1.0.0",
  "componentsMap": [{}],
  "componentsTree": [
    {
      // Block component tree, composed of ordinary component descriptions; no block container
      "componentName": "Input",
      "props": {
        "placeholder": "Enter search keywords"
      }
    },
    {
      "componentName": "Button",
      "props": {
        "text": "Search",
        "onClick": {
          "type": "JSFunction",
          "value": "\
        // some comments \
        function(e){\
          //...\
        }"
        }
      }
    }
  ],
  "i18n": {}
}
```

## 4 Material Specification - Template Specification

### 4.1 Source Code Specification

#### 4.1.1 Directory Specification (A)

Aligned with standard source code build-scripts

```html
├── META/ # Low-code metadata information, used for multi-branch conflict resolution, data rollback,
etc. ├── build │ ├── index.css # [Build output] │ ├── index.html # [Build output] [Required]
Directly previewable file │ ├── index.js # [Build output] │ └── views # [3A Build output]
html2sketch │ ├── page1.html # [3A Build output] HTML for sketch │ └── page1.png # [3A Build output]
Screenshot ├── public/ # Static files; copied to build/ directory during build │ ├── index.html #
Application entry HTML │ └── favicon.png # Favicon ├── src/ │ ├── components/ # Low-code business
components within the application │ │ └── GuideComponent/ │ │ ├── index.js # Component entry │ │ ├──
components.js # Other components depended on by the component │ │ ├── schema.js # Schema description
│ │ └── index.scss # CSS styles │ ├── pages/ # Pages │ │ └── HomePage/ # Home page │ │ ├── index.js
# Page entry │ │ └── index.scss # CSS styles │ ├── layouts/ │ │ └── BasicLayout/ # Layout component
name │ │ ├── index.js # Layout entry │ │ ├── components.js # Other components depended on by layout
component │ │ ├── schema.js # Layout schema description │ │ └── index.scss # Layout CSS styles │ ├──
config/ # Configuration information │ │ ├── components.js # All components in application context │
│ ├── routes.js # Page route list │ │ └── constants.js # Global constant definitions │ │ └── app.js
# Application configuration file │ ├── utils/ # Utility library │ │ └── index.js # Application
third-party extension functions │ ├── stores/ # [Optional] Global state management │ │ └── user.js │
├── locales/ # [Optional] Internationalization resources │ │ ├── en-US │ │ └── zh-CN │ ├──
global.scss # Global styles │ └── index.jsx # Application entry script; dynamically generates routes
based on config/routes.js routing configuration; ├── webpack.config.js # Project engineering
configuration, includes plugin configuration and custom `webpack` configuration, etc. ├── README.md
├── package.json ├── .editorconfig ├── .eslintignore ├── .eslintrc.js ├── .gitignore ├──
.stylelintignore └── .stylelintrc.js
```

##### Entry File

(/src/index.jsx)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import pkg from '../package.json';
import router from './router';
import './index.scss';
const App = hot(router);

ReactDOM.render(
  <App />,
  document.getElementById((pkg.config && pkg.config.targetRootID) || 'root'),
);
```

##### Application Parameter Configuration File

(/src/config/app.js)

- Supports routing mode configuration: historyMode
  - Supports 2 routing modes:
    - Browser routing: browser
    - Hash routing: hash
  - Supports passing routing-generated parameters to all components' context this object
    - history object: this.history
    - location object: this.location
      - Supports built-in query parameter parsing: this.location.query
    - match object: this.match
- Supports render target node ID: targetRootID
- Supports application Fusion theme style configuration: theme
- Supports layout component name and property configuration: layout
- Supports render module version number configuration: sdkVersion
- Supports fixed dependency component list configuration: compDependencies

```javascript
export default {
  sdkVersion: '1.0.3',
  historyMode: 'hash', // Browser routing: browser  Hash routing: hash
  targetRootID: 'ice-container',
  layout: {
    componentName: 'BasicLayout',
    props: {},
  },
  theme: {
    package: '@alife/theme-fusion',
    version: '^0.1.0',
  },
  compDependencies: [],
};
```

##### Application Extension Configuration Specification:

(/src/utils/index.js)

- Supports npm package third-party extensions;
- Supports application-scoped custom extension functions;

```javascript
import { Message, Dialog } from '@alifd/next';
import moment from 'moment';

export default {
  Message,                // npm package dependency
  Dialog,
  moment,
  xxx: function(item) {   // Custom function
    return ...
  }
}
```

##### Application Constant Configuration

(/src/config/constants.js)

```javascript
export default {
  ISIDE: false,
};
```

##### Application Style Configuration

(/src/global.scss)

```css
a {
  color: #2077ff;
  text-decoration: none;
}

.transparent {
  opacity: 0;
}
```

#### 4.1.2 html2sketch (AAA)

##### 4.1.2.1 scaffoldConfig Structure in package.json

```json
{
  "scaffoldConfig": {
    "name": "user-landing",
    "title": "User Welcome Message",
    "category": "form",
    "screenshot": "https://unpkg.com/@icedesign/user-landing-block/screenshot.png",
    "views": [
      {
        // Template views; configuring this enters fusion cool
        "title": "View 1 Title", // Template view title
        "path": "#/dashboard/monitor", // Generated from route list; hash routes must include #
        "screenshot": "build/views/page0.png", // [Auto-filled on build] View screenshot, automatically generated during build
        "html": "build/views/page0.html" // [Auto-filled on build] Rendered HTML structure of view, automatically generated during build
      },
      {
        "title": "View 2 Title", // Block view title
        "path": "#/dashboard/list", // Generated from route list; hash routes must include #
        "screenshot": "build/views/page1.png", // [Auto-filled on build] View screenshot, automatically generated during build
        "html": "build/views/page1.html" // [Auto-filled on build] Rendered HTML structure of view, automatically generated during build
      }
    ]
  }
}
```
