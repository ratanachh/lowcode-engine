---
title: Low-Code Engine Building Protocol Specification
sidebar_position: 0
---

## 1 Introduction

### 1.1 Problem Domains Covered by This Protocol Specification

- Define the version numbering specification for this protocol
- Define the Level that each sub-specification in this protocol must support
- Define domain terminology related to this protocol
- Define the building foundation protocol version numbering specification (A)
- Define the building foundation protocol component mapping specification (A)
- Define the building foundation protocol component tree description specification (A)
- Define the building foundation protocol internationalization and multi-language support specification (AA)
- Define the building foundation protocol accessibility specification (AAA)

### 1.2 Protocol Draft Authors

- Authors: Yuefei, Kangwei, Lin Yi
- Reviewers: Daguo, Wuliang, Jiushen, Yuanyan, Wuzi, Yifan, Jinchan, Qiandao, Tiansheng, Wuzi, Youlu, Guanghong, Lihao

### 1.3 Version Number

1.1.0

### 1.4 Protocol Version Numbering Specification (A)

This protocol uses semantic versioning. The version number format is `major.minor.patch`.

- **major** is the major version number: used to release protocol format changes that are not backward compatible
- **minor** is the minor version number: used to release backward-compatible protocol feature additions
- **patch** is the patch number: used to release backward-compatible protocol bug fixes

### 1.5 Sub-Specification Level Definitions in the Protocol

| Specification Level | Implementation Requirement                                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A                   | Mandatory specification; must be implemented. Protocol description data that violates such specifications cannot be written to the material center and is not supported for circulation.       |
| AA                  | Recommended specification; recommended for implementation. Complying with such specifications helps improve future business extensibility and cross-team collaborative development efficiency. |
| AAA                 | Reference specification; implement according to actual business scenario requirements; technical implementation guidance encouraged at the group level.                                        |

### 1.6 Terminology

#### 1.6.1 Material System Terminology

- **Basic Component**: A general-purpose basic component in the frontend domain. The basic component library officially designated by the Alibaba Frontend Committee is Fusion Next/AntD.
- **Chart Component**: A general-purpose chart component in the frontend domain. Representative chart component libraries include BizCharts.
- **Business Component**: A component defined on top of basic components within a business domain. It may include interactions or business data specific to a particular business domain, exposes only configurable properties externally, and must be published to the public domain (e.g., Alibaba NPM). It can circulate within the same business domain, but cross-business-domain reusability is not required.
  - **Low-Code Business Component**: Built through a low-code editor, distinct from source-code-developed business components. It is a type of business component and follows the business component definition. Low-code business components can also be edited multiple times through the low-code editor.
- **Layout Component**: A general-purpose component in the frontend domain used to implement various layout relationships among basic components, chart components, and business components, such as a three-column layout component.
- **Block**: Composed by nesting and combining a series of business components and layout components through low-code building. It does not expose configurable properties externally. By wrapping with a block container group, the block internally has complete style, event, lifecycle management, state management, and data flow mechanisms. It can exist and run independently, and can be quickly reused across pages and applications by copying the schema, ensuring normal functionality and data.
- **Page**: Composed of components + blocks. Wrapped by a page container component, it can describe page-level state management and common functions.
- **Template**: Business components and blocks within a specific vertical business domain can be combined into a single page, or combined with routing into a set of multiple pages, collectively referred to as a template.

#### 1.6.2 Low-Code Building System Terminology

- **Building Editor**: Uses a visual approach to implement page building, supporting component UI arrangement, property editing, event binding, and data binding, ultimately producing data that conforms to the building foundation protocol specification.
  - **Property Panel**: An operation panel inside the low-code editor used for property editing, event binding, and data binding of components, blocks, and pages.
  - **Canvas Panel**: An operation panel inside the low-code editor used for UI arrangement.
  - **Outline Panel**: A panel inside the low-code editor used to display the page component tree.
- **Editor Framework**: The foundational framework of the building editor, including theme configuration mechanisms, plugin mechanisms, setter control mechanisms, shortcut key management, extension point management, and other underlying infrastructure.
- **Material Import Module**: Focuses on material integration. It can automatically scan and parse source-code components, and ultimately produce a Schema JSON that conforms to the _Low-Code Engine Material Protocol Specification_.
- **Arrangement Module**: Focuses on Schema visual arrangement. It provides page structure arrangement services through visual interactions, and ultimately produces a Schema JSON that conforms to the _Low-Code Building Foundation Protocol Specification_.
- **Rendering Module**: Focuses on rendering Schema JSON into a UI interface, ultimately presenting an interactive page.
- **Code Generation Module (Schema2Code)**: Focuses on generating high-quality source code through Schema JSON, transforming Schema JSON data that conforms to the _Low-Code Building Foundation Protocol Specification_ into code renderable on terminals such as React / Rax / Alibaba Mini Programs.
- **Event Binding**: Refers to binding relevant event handling actions to a specific event of a component, such as binding **a handler function** or **a response action** (e.g., opening a dialog) to a component's **click event**. The events that each component can bind are defined by the component itself.
- **Data Binding**: Refers to binding data used by a specific property to that property of a component.
- **Lifecycle**: Generally refers to the birth, life, and death of an object. In this document, it refers collectively to key life stages of an entity (component, container, block, etc.), such as creation, loading, display, and destruction.

### 1.7 Background

- **Protocol Goal**: By constraining the building protocol specification of the low-code engine, ensure that the outputs of upper-layer low-code editors (low-code business components, blocks, applications) remain consistent, can circulate across low-code development platforms to improve efficiency, and do not hinder the development of integration among group businesses.
- **Protocol Interoperability**:
  - Unified top-level protocol structure
    - The protocol schema has complete descriptive capability, including version, internationalization, component tree, component mapping relationships, etc.;
    - Top-level property keys and value formats must remain consistent;
  - Unified component tree description
    - Source-code component description;
    - Description of the three container component types: page, block, and low-code business component;
    - Data flow description, including data requests, data state management, and data binding description;
    - Event description, including unified event context and unified building APIs;
- **Material Interoperability**: Refers to materials that can be used directly across different building products within the same domain, such as templates, blocks, and components;

### 1.8 Audience

This protocol applies to all developers who use low-code building platforms to develop pages or components, as well as developers of related tools or engineering solutions built around this protocol. Reading and using this protocol requires a certain understanding of the interactions and implementation of low-code building platforms. Familiarity with relevant frontend development technology stacks will also be helpful. The protocol does not provide further explanation of general frontend-related terminology.

### 1.9 Scope of Use

This protocol describes the schema structure of low-code building platform outputs (applications, pages, blocks, components), and provides completeness in areas such as data state updates (built-in APIs), capability extension, and internationalization. It is only available in low-code building scenarios.

### 1.10 Protocol Goal

A schema specification oriented toward developers, used to standardize and constrain the output of building editors and the input of rendering modules and code generation modules, decoupling building editors, rendering modules, and code generation modules to ensure their independent upgrades.

### 1.11 Design Notes

- **Semantic clarity**: Clear semantics, concise and easy to understand, with strong readability.
- **Progressive description**: The essence of building is nesting and combining **source-code components**, progressively combining from small to large to generate **components, blocks, pages**, and ultimately generating **applications** through cloud build. Therefore, in the building foundation protocol, we need to know how to progressively describe the four entity concepts: component, block, page, and application.
- **Generate standard source code**: Clearly define the conversion relationship between each property and source code, enabling generation of high-quality standard source code indistinguishable from hand-written code.
- **Circulability**: Outputs can circulate across different building products without involving any private-domain data storage.
- **Multi-terminal oriented**: Must not target only React; must also support mini programs and other terminals.
- **Support implementation of internationalization and accessibility standards**

## 2 Protocol Structure

The top-level protocol structure is as follows:

- version { String } Current protocol version number
- componentsMap { Array } Component mapping relationships
- componentsTree { Array } Component tree describing templates/pages/blocks/low-code business components
- utils { Array } Utility extension mapping relationships
- i18n { Object } Internationalization corpus
- constants { Object } Global constants within the application scope
- css { string } Global styles within the application scope
- config: { Object } Current application configuration information
- meta: { Object } Current application metadata information
- dataSource: { Array } Public data sources of the current application
- router: { Object } Routing configuration information of the current application
- pages: { Array } All page information of the current application

Description example:

```json
{
  "version": "1.0.0",                  // Current protocol version number
  "componentsMap": [{                  // Component description
    "componentName": "Button",
    "package": "@alifd/next",
    "version": "1.0.0",
    "destructuring": true,
    "exportName": "Select",
    "subName": "Button"
  }],
  "utils": [{
    "name": "clone",
    "type": "npm",
    "content": {
      "package": "lodash",
      "version": "0.0.1",
      "exportName": "clone",
      "subName": "",
      "destructuring": false,
      "main": "/lib/clone"
    }
  }, {
    "name": "moment",
    "type": "npm",
    "content": {
      "package": "@alifd/next",
      "version": "0.0.1",
      "exportName": "Moment",
      "subName": "",
      "destructuring": true,
      "main": ""
    }
  }],
  "componentsTree": [{                 // Description content, value type Array
    "id": "page1",
    "componentName": "Page",           // Single page, enum type Page|Block|Component
    "fileName": "Page1",
    "props": {},
    "css": "body {font-size: 12px;} .table { width: 100px;}",
    "children": [{
      "componentName": "Div",
      "props": {
        "className": ""
      },
      "children": [{
        "componentName": "Button",
        "props": {
          "prop1": 1234,               // Simple JSON data
          "prop2": [{                  // Simple JSON data
            "label": "Option 1",
            "value": 1
          }, {
            "label": "Option 2",
            "value": 2
          }],
          "prop3": [{
            "name": "myName",
            "rule": {
              "type": "JSExpression",
              "value": "/\w+/i"
            }
          }],
          "valueBind": {               // Variable binding
            "type": "JSExpression",
            "value": "this.state.user.name"
          },
          "onClick": {                 // Action binding
            "type": "JSFunction",
            "value": "function(e) { console.log(e.target.innerText) }"
          },
          "onClick2": {                // Action binding 2
            "type": "JSExpression",
            "value": "this.submit"
          }
        }
      }]
    }]
  }],
  "constants": {
    "ENV": "prod",
    "DOMAIN": "xxx.com"
  },
  "css": "body {font-size: 12px;} .table { width: 100px;}",
  "config": {                                          // Current application configuration information
    "sdkVersion": "1.0.3",                             // Rendering module version
    "historyMode": "hash",                             // Not recommended; prefer configuring in the router field
    "targetRootID": "J_Container",
    "layout": {
      "componentName": "BasicLayout",
      "props": {
        "logo": "...",
        "name": "Test Website"
      },
    },
    "theme": {
      // for Fusion use dpl defined
      "package": "@alife/theme-fusion",
      "version": "^0.1.0",
      // for Antd use variable
      "primary": "#ff9966"
    }
  },
  "meta": {                                           // Application metadata information, keys are business-defined
    "name": "demo application",                        // Application display name
    "git_group": "appGroup",                          // Git group name corresponding to the application
    "project_name": "app_demo",                       // Git project name corresponding to the application
    "description": "This is a test application",      // Application description
    "spma": "spa23d",                                 // Application SPM A-position information
    "creator": "Yuefei",
    "gmt_create": "2020-02-11 00:00:00",              // Creation time
    "gmt_modified": "2020-02-11 00:00:00",            // Modification time
    ...
  },
  "i18n": {
    "zh-CN": {
      "i18n-jwg27yo4": "Hello",
      "i18n-jwg27yo3": "China"
    },
    "en-US": {
      "i18n-jwg27yo4": "Hello",
      "i18n-jwg27yo3": "China"
    }
  },
  "router": {
    "baseUrl": "/",
    "historyMode": "hash",                             // Browser routing: browser  Hash routing: hash
    "routes": [
      {
        "path": "home",
        "page": "page1"
      }
    ]
  },
  "pages": [
    {
      "id": "page1",
      "treeId": "page1"
    }
  ]
}
```

### 2.1 Protocol Version Number (A)

Defines the version number of the current protocol schema. Different version numbers correspond to different rendering SDKs to ensure normal rendering of building protocol outputs across versions.

| Root Property Name | Type   | Description             | Variable Support | Default Value |
| ------------------ | ------ | ----------------------- | ---------------- | ------------- |
| version            | String | Protocol version number | -                | 1.0.0         |

Description example:

```javascript
{
  "version": "1.0.0"
}
```

### 2.2 Component Mapping Relationships (A)

Specification in the protocol used to describe the mapping relationship from componentName to public-domain components.

| Parameter       | Description                                           | Type               | Variable Support | Default Value |
| --------------- | ----------------------------------------------------- | ------------------ | ---------------- | ------------- |
| componentsMap[] | Collection describing component mapping relationships | **ComponentMap**[] | -                | null          |

**ComponentMap structure description** is as follows:

| Parameter     | Description                                                                                                                                                                    | Type    | Variable Support | Default Value |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ---------------- | ------------- |
| componentName | Component name in the protocol; must be unique; corresponds to the component name exported by the package; must be a valid **JS identifier** starting with an uppercase letter | String  | -                | -             |
| package       | npm public-domain package name                                                                                                                                                 | String  | -                | -             |
| version       | package version                                                                                                                                                                | String  | -                | -             |
| destructuring | Export the module using destructuring                                                                                                                                          | Boolean | -                | -             |
| exportName    | Component name exported by the package                                                                                                                                         | String  | -                | -             |
| subName       | Sub-component name by index                                                                                                                                                    | String  | -                |               |
| main          | Entry file path of the package-exported component                                                                                                                              | String  | -                | -             |

Description example:

```json
{
  "componentsMap": [
    {
      "componentName": "Button",
      "package": "@alifd/next",
      "version": "1.0.0",
      "destructuring": true
    },
    {
      "componentName": "MySelect",
      "package": "@alifd/next",
      "version": "1.0.0",
      "destructuring": true,
      "exportName": "Select"
    },
    {
      "componentName": "ButtonGroup",
      "package": "@alifd/next",
      "version": "1.0.0",
      "destructuring": true,
      "exportName": "Button",
      "subName": "Group"
    },
    {
      "componentName": "RadioGroup",
      "package": "@alifd/next",
      "version": "1.0.0",
      "destructuring": true,
      "exportName": "Radio",
      "subName": "Group"
    },
    {
      "componentName": "CustomCard",
      "package": "@ali/custom-card",
      "version": "1.0.0"
    },
    {
      "componentName": "CustomInput",
      "package": "@ali/custom",
      "version": "1.0.0",
      "main": "/lib/input",
      "destructuring": true,
      "exportName": "Input"
    }
  ]
}
```

Code generation result:

```javascript
// Using destructuring, destructuring is true.
import { Button } from '@alifd/next';

// Using destructuring, and exportName differs from componentName
import { Select as MySelect } from '@alifd/next';

// Using destructuring and exporting its sub-component
import { Button } from '@alifd/next';
const ButtonGroup = Button.Group;

import { Radio } from '@alifd/next';
const RadioGroup = Radio.Group;

// Export without destructuring
import CustomCard from '@ali/custom-card';

// Export using a specific path
import { Input as CustomInput } from '@ali/custom/lib/input';
```

### 2.3 Component Tree Description (A)

Specification in the protocol used to describe the structure of the built component tree. The entire component tree description is composed of nested **component structures** and **container structures**.

- Component structure: Describes the structure of a single component's name, properties, and children;
- Container structure: Describes the structure of a single container's data, custom methods, and lifecycle, used to modularly split a complete page.

The conversion relationship corresponding to source code is as follows:

- Component structure: Converts to **jsx** code returned by the render function of a React Class in a .jsx file.
- Container structure: Converts to a standard file, such as a React jsx file, exporting a React Class that includes lifecycle definitions, custom methods, event property bindings, asynchronous data requests, etc.

#### 2.3.1 Basic Structure Description (A)

This section defines the common basic fields of component structures and container structures.

> When reading, you may skip ahead to later sections first and return here for reference when needed

##### 2.3.1.1 Props Structure Description

| Parameter   | Description                    | Type     | Variable Support | Default Value | Notes                                                                        |
| ----------- | ------------------------------ | -------- | ---------------- | ------------- | ---------------------------------------------------------------------------- |
| id          | Component ID                   | String   | ✅               | -             | System property                                                              |
| className   | Component style class name     | String   | ✅               | -             | System property; supports variable expressions                               |
| style       | Component inline style         | Object   | ✅               | -             | System property; single inline style property value                          |
| ref         | Component ref name             | String   | ✅               | -             | Component instance can be obtained via `this.$(ref)`                         |
| extendProps | Component inherited properties | Variable | ✅               | -             | Supports variable binding only; commonly used for inherited property objects |
| ...         | Component private properties   | -        | -                | -             |                                                                              |

##### 2.3.1.2 css/less/scss Style Description

| Parameter     | Description                                                                                                                                      | Type   | Variable Support | Default Value |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------- | ------------- |
| css/less/scss | Used to describe styles of internal nodes of container components; corresponds to generating an independent style file; does not support @import | String | -                | null          |

Description example:

```json
{
  "css": "body {font-size: 12px;} .table { width: 100px; }"
}
```

##### 2.3.1.3 ComponentDataSource Object Description

| Parameter   | Description                           | Type                          | Variable Support | Default Value | Notes                                                                                                                                                        |
| ----------- | ------------------------------------- | ----------------------------- | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| list[]      | Data source list                      | **ComponentDataSourceItem**[] | -                | -             | Each entry is a single request configuration; see [ComponentDataSourceItem Object Description](#2314-componentdatasourceitem-object-description) for details |
| dataHandler | Handler function for all request data | Function                      | -                | -             | See [dataHandler Function Description](#2317-datahandler-function-description)                                                                               |

##### 2.3.1.4 ComponentDataSourceItem Object Description

| Parameter      | Description                                           | Type                                                 | Variable Support | Default Value               | Notes                                                                                                                                                                                                                                                             |
| -------------- | ----------------------------------------------------- | ---------------------------------------------------- | ---------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| id             | Data request ID identifier                            | String                                               | -                | -                           |                                                                                                                                                                                                                                                                   |
| isInit         | Whether it is initial data                            | Boolean                                              | ✅               | true                        | When true, the current data request will be sent automatically during component initialization rendering                                                                                                                                                          |
| isSync         | Whether serial execution is required                  | Boolean                                              | ✅               | false                       | When true, the current request will be executed serially                                                                                                                                                                                                          |
| type           | Data request type                                     | String                                               | -                | fetch                       | Supports four types: fetch/mtop/jsonp/custom                                                                                                                                                                                                                      |
| shouldFetch    | Whether this request can be sent normally             | (options: ComponentDataSourceItemOptions) => boolean | -                | `() => true`                | Function parameter reference: [ComponentDataSourceItemOptions Object Description](#2315-componentdatasourceitemoptions-object-description)                                                                                                                        |
| willFetch      | Single data result request parameter handler function | Function                                             | -                | options => options          | Accepts only one parameter (options); the return value is used as the request options. On processing error, the original options are used. May also return a Promise; the resolved value is used as the request options; on reject, the original options are used |
| requestHandler | Custom extended external request handler              | Function                                             | -                | -                           | Only effective when type='custom'                                                                                                                                                                                                                                 |
| dataHandler    | Callback function after request success               | Function                                             | -                | `response => response.data` | Parameter: the promise value after successful request                                                                                                                                                                                                             |     |
| errorHandler   | Callback function after request failure               | Function                                             | -                | -                           | Parameter: the promise error content after request failure                                                                                                                                                                                                        |
| options {}     | Request parameters                                    | **ComponentDataSourceItemOptions**                   | -                | -                           | Each request type corresponds to different parameters; see [ComponentDataSourceItemOptions Object Description](#2315-componentdatasourceitemoptions-object-description)                                                                                           |

**Detailed notes on dataHandler and errorHandler:**

The request returns a promise. dataHandler and errorHandler follow the Promise object's then method. Actual usage is as follows:

```ts
// Pseudocode
try {
  const result = await request(fetchConfig).then(dataHandler, errorHandler);
  dataSourceItem.data = result;
  dataSourceItem.status = 'success';
} catch (err) {
  dataSourceItem.error = err;
  dataSourceItem.status = 'error';
}
```

**Note:**

- Only one of dataHandler and errorHandler callbacks will be invoked
- Both have the opportunity to modify the promise state, meaning they can modify the final state of the current data source
- The final returned result is considered the final result of the current data source; if caught, the data source request is considered failed
- dataHandler has a default value. Considering that the input parameter is the complete response object, the default returns `response.data`. errorHandler has no default value

##### 2.3.1.5 ComponentDataSourceItemOptions Object Description

| Parameter | Description                       | Type    | Variable Support | Default Value | Notes                                                                                                                                                                    |
| --------- | --------------------------------- | ------- | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| uri       | Request URL                       | String  | ✅               | -             |                                                                                                                                                                          |
| params    | Request parameters                | Object  | ✅               | {}            | Default request parameters of the current data source (replaced at runtime by the actual load method parameters; if load params are absent, the current params are used) |
| method    | Request method                    | String  | ✅               | GET           |                                                                                                                                                                          |
| isCors    | Whether cross-origin is supported | Boolean | ✅               | true          | Corresponds to `credentials = 'include'`                                                                                                                                 |
| timeout   | Timeout duration                  | Number  | ✅               | 5000          | Unit: ms                                                                                                                                                                 |
| headers   | Request header information        | Object  | ✅               | -             | Custom request headers                                                                                                                                                   |

##### 2.3.1.6 ComponentLifeCycles Object Description

Lifecycle object. The schema is multi-terminal oriented; different DSLs have different lifecycle methods:

- React: For mid/back-office PC materials, React has been confirmed as the final rendering framework. Therefore, this proposal adopts [React 16 standard lifecycle methods](https://reactjs.org/docs/react-component.html) to define lifecycle methods, reducing understanding cost. Supported lifecycles are as follows:
  - constructor(props, context)
    - Description: Executed during initialization rendering; commonly used to set state values.
  - render()
    - Description: Executed at the beginning of the container component React Class render method; commonly used to compute variables and attach them to the this object for property binding on props. This render() method does not need to set a return value.
  - componentDidMount()
    - Description: Component has loaded
  - componentDidUpdate(prevProps, prevState, snapshot)
    - Description: Component has updated
  - componentWillUnmount()
    - Description: Component is about to be removed from the DOM
  - componentDidCatch(error, info)
    - Description: Component caught an exception

This object consists of a series of key-value pairs. The key is the lifecycle method name, and the value is a JSFunction description. See the example below:

```json
{
  "componentDidMount": {              // key is the React lifecycle method name from above
    "type": "JSFunction",             // type currently supports JSFunction only
    "value": "function() {\           // value is a javascript function
      console.log('did mount');\
    }"
  },
  "componentWillUnmount": {
    "type": "JSFunction",
    "value": "function() {\
      console.log('will unmount');\
    }"
  }
  ...
},
```

##### 2.3.1.7 dataHandler Function Description

- Parameters: a dataMap object containing the following fields:
  - key: data id
  - value: single request result
- Return value: data object. In the rendering engine and schemaToCode, the returned data object is applied to state by calling `this.setState(...)`. Supports returning a Promise; resolve with the returned data. Commonly used in serial request scenarios.

##### 2.3.1.8 ComponentPropDefinition Object Description

| Parameter    | Description            | Type           | Variable Support | Default Value | Notes                                                                                                                                                                                        |
| ------------ | ---------------------- | -------------- | ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | Property name          | String         | -                | -             |                                                                                                                                                                                              |
| propType     | Property type          | String\|Object | -                | -             | For value content structure, refer to **basic types** and **composite types** described in "2.2.2.3 Component Property Information" in the _Low-Code Engine Material Protocol Specification_ |
| description  | Property description   | String         | -                | ''            |                                                                                                                                                                                              |
| defaultValue | Property default value | Any            | -                | undefined     | When defaultValue and defaultProps both contain a default value for the same prop, defaultValue takes precedence.                                                                            |

Example:

```json
{
  "propDefinitions": [{
    "name": "title",
    "propType": "string",
    "defaultValue": "Default Title"
  }, {
    "name": "onClick",
    "propType": "func"
  }]
  ...
},
```

#### 2.3.2 Component Structure Description (A)

Corresponds to jsx code returned by the render function in the source-code development system. Main properties described are as follows:

| Parameter     | Description                           | Type             | Variable Support | Default Value     | Notes                                                                                                                                                                                                     |
| ------------- | ------------------------------------- | ---------------- | ---------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id            | Unique component identifier           | String           | -                |                   | Optional. Component id is randomly generated by the engine (UUID) and guaranteed unique. Consumer is the upper-layer application platform. The id must remain unchanged when the component is moved, etc. |
| componentName | Component name                        | String           | -                | Div               | Required. First letter uppercase; same requirement as in [componentsMap](#22-component-mapping-relationships-a)                                                                                           |
| props {}      | Component property object             | **Props**        | -                | {}                | Required. See [Props Structure Description](#2311-props-structure-description)                                                                                                                            |
| condition     | Render condition                      | Boolean          | ✅               | true              | Optional. Determines whether to render the material based on expression result; supports variable expressions                                                                                             |
| loop          | Loop data                             | Array            | ✅               | -                 | Optional. No loop rendering by default; supports variable expressions                                                                                                                                     |
| loopArgs      | Loop iteration object and index names | [String, String] |                  | ["item", "index"] | Optional. Supports strings only                                                                                                                                                                           |
| children      | Child components                      | Array            |                  |                   | Optional. Supports variable expressions                                                                                                                                                                   |

Description example:

```json
{
  "componentName": "Button",
  "props": {
    "className": "btn",
    "style": {
      "width": 100,
      "height": 20
    },
    "text": "submit",
    "onClick": {
      "type": "JSFunction",
      "value": "function(e) {\
        console.log('btn click')\
      }"
    }
  },
  "condition": {
    "type": "JSExpression",
    "value": "!!this.state.isshow"
  },
  "loop": [],
  "loopArgs": ["item", "index"],
  "children": []
}
```

#### 2.3.3 Container Structure Description (A)

Containers are a special type of component. On top of component capabilities, they add descriptions of lifecycle objects, custom methods, style files, data sources, and other information. There are three types: **Low-Code Business Component Container (Component)**, **Block Container (Block)**, and **Page Container (Page)**. Main properties described are as follows:

- Component type: componentName
- File name: fileName
- Component properties: props
- State management: state
- Lifecycle hook methods: lifeCycles
- Custom method settings: methods
- Asynchronous data source configuration: dataSource
- Conditional rendering: condition
- Style file: css/less/scss

Detailed description:

| Parameter       | Description                                                  | Type                                                                                                                               | Variable Support | Default Value | Notes                                                                                                                                                                                 |
| --------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| componentName   | Component name                                               | Enum type, including `'Page'` (page container), `'Block'` (block container), `'Component'` (low-code business component container) | -                | 'Div'         | Required. First letter uppercase                                                                                                                                                      |
| fileName        | File name                                                    | String                                                                                                                             | -                | -             | Required. English only                                                                                                                                                                |
| props { }       | Component property object                                    | **Props**                                                                                                                          | -                | {}            | Required. See [Props Structure Description](#2311-props-structure-description)                                                                                                        |
| static          | Static object of the low-code business component class       |                                                                                                                                    |                  |               |                                                                                                                                                                                       |
| defaultProps    | Default properties of the low-code business component        | Object                                                                                                                             | -                | -             | Optional. Used only to define default properties of low-code business components                                                                                                      |
| propDefinitions | Property type definitions of the low-code business component | **ComponentPropDefinition**[]                                                                                                      | -                | -             | Optional. Used only to define property data types of low-code business components. See [ComponentPropDefinition Object Description](#2318-componentpropdefinition-object-description) |
| condition       | Render condition                                             | Boolean                                                                                                                            | ✅               | true          | Optional. Determines whether to render the material based on expression result; supports variable expressions                                                                         |
| state           | Container initial data                                       | Object                                                                                                                             | ✅               | -             | Optional. Supports variable expressions                                                                                                                                               |
| children        | Child components                                             | Array                                                                                                                              | -                |               | Optional. Supports variable expressions                                                                                                                                               |
| css/less/scss   | Style properties                                             | String                                                                                                                             | ✅               | -             | Optional. See [css/less/scss Style Description](#2312-csslessscss-style-description)                                                                                                  |
| lifeCycles      | Lifecycle object                                             | **ComponentLifeCycles**                                                                                                            | -                | -             | See [ComponentLifeCycles Object Description](#2316-componentlifecycles-object-description)                                                                                            |
| methods         | Custom method object                                         | Object                                                                                                                             | -                | -             | Optional. Object members are function types                                                                                                                                           |
| dataSource {}   | Data source object                                           | **ComponentDataSource**                                                                                                            | -                | -             | Optional. Asynchronous data source. See [ComponentDataSource Object Description](#2313-componentdatasource-object-description)                                                        |

#### Complete Description Examples

Description example 1 (normal fetch/mtop/jsonp requests):

```json
{
  "componentName": "Block",
  "fileName": "block-1",
  "props": {
    "className": "luna-page",
    "style": {
      "background": "#dd2727"
    }
  },
  "children": [
    {
      "componentName": "Button",
      "props": {
        "text": {
          "type": "JSExpression",
          "value": "this.state.btnText"
        }
      }
    }
  ],
  "state": {
    "btnText": "submit"
  },
  "css": "body {font-size: 12px;}",
  "lifeCycles": {
    "componentDidMount": {
      "type": "JSFunction",
      "value": "function() {\
        console.log('did mount');\
      }"
    },
    "componentWillUnmount": {
      "type": "JSFunction",
      "value": "function() {\
        console.log('will unmount');\
      }"
    }
  },
  "methods": {
    "testFunc": {
      "type": "JSFunction",
      "value": "function() {\
        console.log('test func');\
      }"
    }
  },
  "dataSource": {
    "list": [
      {
        "id": "list",
        "isInit": true,
        "type": "fetch/mtop/jsonp",
        "options": {
          "uri": "",
          "params": {},
          "method": "GET",
          "isCors": true,
          "timeout": 5000,
          "headers": {}
        },
        "dataHandler": {
          "type": "JSFunction",
          "value": "function(data, err) {}"
        }
      }
    ],
    "dataHandler": {
      "type": "JSFunction",
      "value": "function(dataMap) { }"
    }
  },
  "condition": {
    "type": "JSExpression",
    "value": "!!this.state.isShow"
  }
}
```

Description example 2 (custom extended request handler type):

```json
{
  "componentName": "Block",
  "fileName": "block-1",
  "props": {
    "className": "luna-page",
    "style": {
      "background": "#dd2727"
    }
  },
  ...
  "dataSource": {
    "list": [{
      "id": "list",
      "isInit": true,
      "type": "custom",
      "requestHandler": {
        "type": "JSFunction",
        "value": "this.utils.hsfHandler"
      },
      "options": {
        "uri": "hsf://xxx",
        "param1": "a",
        "param2": "b",
        ...
      },
      "dataHandler": {
        "type": "JSFunction",
        "value": "function(data, err) { }"
      }
    }],
    "dataHandler": {
      "type": "JSFunction",
      "value": "function(dataMap) { }"
    }
  }
}
```

#### 2.3.4 Property Value Type Description (A)

In the **component structure** and **container structure** descriptions above, the value corresponding to each property, in addition to traditional JS value types (String, Number, Object, Array, Boolean), also includes complex types such as **node types**, **event function types**, and **variable types**. The following sections provide detailed descriptions of these complex types.

##### 2.3.4.1 Node Type (A)

Commonly used to describe scenarios where a component property is **ReactNode** or **Function-Return-ReactNode**. Such properties are all described using **JSSlot**. Detailed description is as follows:

**ReactNode** description:

| Parameter | Description            | Value Type                 | Default Value | Notes                                                                                                     |
| --------- | ---------------------- | -------------------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| type      | Value type description | String                     | 'JSSlot'      | Fixed value                                                                                               |
| value     | Specific value         | NodeSchema \| NodeSchema[] | null          | Content is NodeSchema type; see [Component Structure Description](#232-component-structure-description-a) |

Description example: e.g., the **title** property of **Card**

```json
{
  "componentName": "Card",
  "props": {
    "title": {
      "type": "JSSlot",
      "value": [{
        "componentName": "Icon",
        "props": {}
      },{
        "componentName": "Text",
        "props": {}
      }]
    },
    ...
  }
}

```

**Function-Return-ReactNode** description:

| Parameter | Description            | Value Type                 | Default Value | Notes                                                                                                     |
| --------- | ---------------------- | -------------------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| type      | Value type description | String                     | 'JSSlot'      | Fixed value                                                                                               |
| value     | Specific value         | NodeSchema \| NodeSchema[] | null          | Content is NodeSchema type; see [Component Structure Description](#232-component-structure-description-a) |
| params    | Function parameters    | String[]                   | null          | Function input parameters. Child nodes can obtain corresponding parameters via `this[parameterName]`.     |

Description example: e.g., the **cell** property of **Table.Column**

```json
{
  "componentName": "TabelColumn",
  "props": {
    "cell": {
      "type": "JSSlot",
      "params": ["value", "index", "record"],
      "value": [{
        "componentName": "Input",
        "props": {}
      }]
    },
    ...
  }
}

```

##### 2.3.4.2 Event Function Type (A)

Event descriptions within the protocol mainly include three categories: **lifecycle** and **custom methods** in **container structures**, and **event function class properties** in **component structures**. All event functions are described using **JSFunction**, preserving input parameters consistent with the original component properties and lifecycles (React / mini programs), and binding all event functions to a unified context (the **this** object of the container structure where the current component resides).

**Event function type** property value description is as follows:

```json
{
  "type": "JSFunction",
  "value": "function onClick(){\
    console.log(123);\
  }"
}
```

Description example:

```json
{
  "componentName": "Block",
  "fileName": "block1",
  "props": {},
  "state": {
    "name": "lucy"
  },
  "lifeCycles": {
    "componentDidMount": {
      "type": "JSFunction",
      "value": "function() {\
        console.log('did mount');\
      }"
    },
    "componentWillUnmount": {
      "type": "JSFunction",
      "value": "function() {\
        console.log('will unmount');\
      }"
    }
  },
  "methods": {
    "getNum": {
      "type": "JSFunction",
      "value": "function() {\
        console.log('Name is: ' + this.state.name)\
      }"
    }
  },
  "children": [
    {
      "componentName": "Button",
      "props": {
        "text": "Button",
        "onClick": {
          "type": "JSFunction",
          "value": "function(e) {\
          console.log(e.target.innerText);\
        }"
        }
      }
    }
  ]
}
```

##### 2.3.4.3 Variable Type (A)

In the **component structure** or **container structure** above, multiple property value types support variable types. Data is typically bound through variable form. All variable expressions use JSExpression. The context is consistent with event function descriptions. The **this** object is used within expressions to obtain context.

**Variable type** property value descriptions are as follows:

- return number type

  ```json
  {
    "type": "JSExpression",
    "value": "this.state.num"
  }
  ```

- return number type

  ```json
  {
    "type": "JSExpression",
    "value": "this.state.num - this.state.num2"
  }
  ```

- return "80 thousand" string type

  ```json
  {
    "type": "JSExpression",
    "value": "`${this.state.num}0k`"
  }
  ```

- return "80 thousand" string type

  ```json
  {
    "type": "JSExpression",
    "value": "this.state.num + '0k'"
  }
  ```

- return 13 number type

  ```json
  {
    "type": "JSExpression",
    "value": "getNum(this.state.num, this.state.num2)"
  }
  ```

- return true boolean type

  ```json
  {
    "type": "JSExpression",
    "value": "this.state.num > this.state.num2"
  }
  ```

Description example:

```json
{
  "componentName": "Block",
  "fileName": "block1",
  "props": {},
  "state": {
    "num": 8,
    "num2": 5
  },
  "methods": {
    "getNum": {
      "type": "JSFunction",
      "value": "function(a, b){\
        return a + b;\
      }"
    }
  },
  "children": [
    {
      "componentName": "Button",
      "props": {
        "text": {
          "type": "JSExpression",
          "value": "this.getNum(this.state.num, this.state.num2) + '0k'"
        }
      },
      "condition": {
        "type": "JSExpression",
        "value": "this.state.num > this.state.num2"
      }
    }
  ]
}
```

##### 2.3.4.4 Internationalization Multi-Language Type (AA)

For some text value content within the protocol, we want it to be associated with the protocol's global internationalization corpus, using the corresponding corpus according to the global internationalization language environment. All internationalization multi-language values are described using the **i18n** structure. This expresses usage scenarios more clearly and structurally.

**Internationalization multi-language type** property value type description is as follows:

```typescript
type Ti18n = {
  type: 'i18n';
  key: string; // key identifier of the field in the i18n structure
  params?: Record<string, JSDataType | JSExpression>; // input parameters for template-type i18n copy; JSDataType refers to traditional JS value types
};
```

Where `key` corresponds to the corpus key in the protocol `i18n` content, and `params` provides variable content when the corpus is a string template.

Assuming the protocol has the following i18n content:

```json
{
  "i18n": {
    "zh-CN": {
      "i18n-jwg27yo4": "Hello",
      "i18n-jwg27yo3": "Dr. {name}"
    },
    "en-US": {
      "i18n-jwg27yo4": "Hello",
      "i18n-jwg27yo3": "Doctor {name}"
    }
  }
}
```

**Internationalization multi-language type** simple example:

```json
{
  "type": "i18n",
  "key": "i18n-jwg27yo4"
}
```

**Internationalization multi-language type** template example:

```json
{
  "type": "i18n",
  "key": "i18n-jwg27yo3",
  "params": {
    "name": "Strange"
  }
}
```

Description example:

```json
{
  "componentName": "Button",
  "props": {
    "text": {
      "type": "i18n",
      "key": "i18n-jwg27yo4"
    }
  }
}
```

#### 2.3.5 Context API Description (A)

In the **event type description** and **variable type description** above, within functions or JS expressions, the instantiated object of the container (React Class) where the current component resides can be obtained through the **this** object. In rendering module and code generation module implementations in building scenarios, a minimum API set mounted on this instantiated **this** object is uniformly agreed upon to ensure the building protocol has consistent **data flow** and **event context**.

##### 2.3.5.1 Container API:

| Parameter                           | Description                                                                     | Type                         | Notes                                                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **this {}**                         | Instance object of the current block container                                  | Class Instance               | -                                                                                                                                                                                           |
| _this_.state                        | State data object of the three container instance types                         | Object                       | -                                                                                                                                                                                           |
| _this_.setState(newState, callback) | Method to update data of the three container instance types                     | Function                     | This setState is typically executed asynchronously; see [setState](#setstate) below                                                                                                         |
| _this_.customMethod()               | Custom methods of the three container instance types                            | Function                     | -                                                                                                                                                                                           |
| _this_.dataSourceMap {}             | Data source object Map of the three container instance types                    | Object                       | Single request id as key; value see [DataSourceMapItem Structure Description](#datasourcemapitem-structure-description) below                                                               |
| _this_.reloadDataSource()           | Reload initial asynchronous data requests of the three container instance types | Function                     | Returns \<Promise\>                                                                                                                                                                         |
| **this.page {}**                    | Instance object of the current page container                                   | Class Instance               |                                                                                                                                                                                             |
| _this.page_.props                   | Read page routing, parameters, and related information                          | Object                       | Query parameters in { key: value } form; path; uri page unique identifier; other extension fields                                                                                           |
| _this.page_.xxx                     | Inherits all APIs of the this object                                            |                              | Here `xxx` refers to other APIs on `this.page`                                                                                                                                              |
| **this.component {}**               | Instance object of the current low-code business component container            | Class Instance               |                                                                                                                                                                                             |
| _this.component_.props              | Read externally passed props of the low-code business component container       | Object                       |                                                                                                                                                                                             |
| _this.component_.xxx                | Inherits all APIs of the this object                                            |                              | Here `xxx` refers to other APIs on `this.component`                                                                                                                                         |
| **this.$(ref)**                     | Get component reference (single)                                                | Component Instance           | `ref` corresponds to the `ref` property configured on the component, used to uniquely identify a component; if duplicates exist, returns the first match.                                   |
| **this.$$(ref)**                    | Get component references (all with the same name)                               | Array of Component Instances | `ref` corresponds to the `ref` property configured on the component, used to uniquely identify a component; always returns an array containing references to all components matching `ref`. |

##### setState

`setState()` enqueues changes to the container `state` and notifies the low-code engine that this component and its children need to be re-rendered with the updated `state`. This is the primary way to update the user interface in response to event handlers and server data processing.

Treat `setState()` as a request rather than an immediate command to update the component. For better perceived performance, the low-code engine delays calling it and then updates multiple components in a single pass. The low-code engine does not guarantee that state changes take effect immediately.

`setState()` does not always update the component immediately. It batches and defers updates. This makes reading `this.state` immediately after calling `setState()` risky. To eliminate this risk, use the `setState` callback function (`setState(updater, callback)`). The `callback` is triggered after the update is applied. Example:

```js
this.setState(newState, () => {
  // The update has taken effect here
  // You can get the updated state via this.state
  console.log(this.state);
});

// ⚠ Note: This is NOT the updated state; it is still the previous state
console.log(this.state);
```

To set the current `state` based on the previous `state`, pass an `updater` function: `(state, props) => newState`, for example:

```js
this.setState((prevState) => ({ count: prevState.count + 1 }));
```

To conveniently update partial state, `setState` shallow-merges `newState` into the new `state`.

##### DataSourceMapItem Structure Description

| Parameter    | Description                                         | Type         | Notes                                                                                                                                                     |
| ------------ | --------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| load(params) | Invoke a single data source                         | Function     | Current params replace the params content in [ComponentDataSourceItemOptions Object Description](#2315-componentdatasourceitemoptions-object-description) |
| status       | Get the last request status of a single data source | String       | loading, loaded, error, init                                                                                                                              |
| data         | Get data after the last successful request          | Any          |                                                                                                                                                           |
| error        | Get the error object after the last failed request  | Error object |                                                                                                                                                           |

Note: If the component is not inside a block container but directly inside a page, then `this === this.page`

##### 2.3.5.2 Loop Data API

Obtain data objects in loop scenarios. Example: An upper-level component sets loop data and sets `loopArgs: ["item", "index"]`. In property expressions or bound event functions of the current component, the loop data environment can be obtained through the this context. Default value is `['item','index']`. For multi-level loops, customize different loopArgs and obtain corresponding loop data and index via `this[customLoopAlias]`.

| Parameter  | Description                                            | Type   | Optional Values |
| ---------- | ------------------------------------------------------ | ------ | --------------- |
| this.item  | Get loop body data corresponding to the current index; | Any    | -               |
| this.index | Index of the current material in the loop body         | Number | -               |

### 2.4 Utility Extension Description (AA)

Used to describe custom extensions or third-party utility classes (e.g., lodash and moment) introduced during material development, enhancing the extensibility of the building foundation protocol and providing a configuration scheme and invocation API for common utility methods.

| Parameter          | Description                             | Type                                                                                                             | Variable Support | Default Value |
| ------------------ | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------- | ------------- |
| utils[]            | Utility extension mapping relationships | **UtilItem**[]                                                                                                   | -                |               |
| _UtilItem_.name    | Utility extension item name             | String                                                                                                           | -                |               |
| _UtilItem_.type    | Utility extension item type             | Enum: `'npm'` (public npm type) / `'tnpm'` (Alibaba internal npm type) / `'function'` (Javascript function type) | -                |               |
| _UtilItem_.content | Utility extension item content          | [ComponentMap type](#22-component-mapping-relationships-a) or [JSFunction](#2432-event-function-type-a)          | -                |               |

Description example:

```javascript
{
  utils: [
    {
      name: 'clone',
      type: 'npm',
      content: {
        package: 'lodash',
        version: '0.0.1',
        exportName: 'clone',
        subName: '',
        destructuring: false,
        main: '/lib/clone',
      },
    },
    {
      name: 'moment',
      type: 'npm',
      content: {
        package: '@alifd/next',
        version: '0.0.1',
        exportName: 'Moment',
        subName: '',
        destructuring: true,
        main: '',
      },
    },
    {
      name: 'recordEvent',
      type: 'function',
      content: {
        type: 'JSFunction',
        value:
          "function(logkey, gmkey, gokey, reqMethod) {\n  goldlog.record('/xxx.event.' + logkey, gmkey, gokey, reqMethod);\n}",
      },
    },
  ];
}
```

Code generation result:

```javascript
import clone from 'lodash/lib/clone';
import { Moment } from '@alifd/next';

export const recordEvent = function(logkey, gmkey, gokey, reqMethod) {
  goldlog.record('/xxx.event.' + logkey, gmkey, gokey, reqMethod);
}

...
```

Extended utility classes can be obtained by users through the unified context this.utils method for all extended utility classes or custom functions, e.g., this.utils.moment, this.utils.clone. Usage in the building protocol is as follows:

```javascript
{
  componentName: 'Div',
  props: {
    onClick: {
      type: 'JSFunction,
      value: 'function(){ this.utils.clone(this.state.data); }'
    }
  }
}
```

### 2.5 Internationalization Multi-Language Support (AA)

Specification in the protocol used to describe internationalization corpus and component references to internationalization corpus, following the group internationalization platform's internationalization corpus specification definition.

| Parameter | Description                             | Type   | Optional Values | Default Value |
| --------- | --------------------------------------- | ------ | --------------- | ------------- |
| i18n      | Internationalization corpus information | Object | -               | null          |

Description example:

```json
{
  "i18n": {
    "zh-CN": {
      "i18n-jwg27yo4": "Hello",
      "i18n-jwg27yo3": "China"
    },
    "en-US": {
      "i18n-jwg27yo4": "Hello",
      "i18n-jwg27yo3": "China"
    }
  }
}
```

Usage example:

```json
{
  "componentName": "Button",
  "props": {
    "text": {
      "type": "i18n",
      "key": "i18n-jwg27yo4"
    }
  }
}
```

```json
{
  "componentName": "Button",
  "props": {
    "text": "Button",
    "onClick": {
      "type": "JSFunction",
      "value": "function() {\
        console.log(this.i18n('i18n-jwg27yo4'));\
      }"
    }
  }
}
```

Usage example (deprecated)

```json
{
  "componentName": "Button",
  "props": {
    "text": {
      "type": "JSExpression",
      "value": "this.i18n['i18n-jwg27yo4']"
    }
  }
}
```

### 2.6 Global Constants Within Application Scope (AA)

Used to describe global constants common throughout the application, such as API request domains, environments, etc.

### 2.7 Global Styles Within Application Scope (AA)

Used to describe global styles within the application scope, such as reset.css, etc.

### 2.8 Current Application Configuration Information (AA)

Used to describe current application configuration information, such as the application's Shell/Layout, theme, etc.

> Note: This field is an extension field. Consumption is determined by each scenario, including runtime and code generation.

### 2.9 Current Application Metadata Information (AA)

Used to describe current application metadata information, such as application name, Git information, version number, etc.

> Note: This field is an extension field. Consumption is determined by each scenario, including runtime and code generation.

### 2.10 Public Data Sources of the Current Application (AA)

Used to describe public data sources of the current application. The data structure is consistent with ComponentDataSource in container structures.
At runtime / code generation, the API is consistent with application-level data source APIs: `this.dataSourceMap['globalDSName'].load()`

### 2.11 Routing Information of the Current Application (AA)

Used to describe the relationship between application paths and pages. By declaring routing information, the application can display the corresponding page at different paths.

##### 2.11.1 Router (Application Routing Configuration) Structure Description

Routing configuration structure description:

| Parameter   | Description                                    | Type                                   | Optional Values | Default Value | Notes    |
| ----------- | ---------------------------------------------- | -------------------------------------- | --------------- | ------------- | -------- |
| baseName    | Application root path                          | String                                 | -               | '/'           | Optional |
| historyMode | history mode                                   | Enum type, including 'browser', 'hash' | -               | 'browser'     | Optional |
| routes      | Route object group; path-to-page mapping group | Route[]                                | -               | -             | Required |

##### 2.11.2 Route (Route Record) Structure Description

Route record; path-to-page mapping. Route structure description:

| Parameter | Description                                    | Type                         | Optional Values | Default Value | Notes                                                                |
| --------- | ---------------------------------------------- | ---------------------------- | --------------- | ------------- | -------------------------------------------------------------------- |
| name      | Name of this path entry                        | String                       | -               | -             | Optional                                                             |
| path      | Path                                           | String                       | -               | -             | Required. See path rules below                                       |
| query     | Query parameters of the path                   | Object                       | -               | -             | Optional                                                             |
| page      | Page ID corresponding to the path              | String                       | -               | -             | Optional. Either page or redirect must exist                         |
| redirect  | Route information this path should redirect to | String \| Object \| Function | -               | -             | Optional. Either page or redirect must exist. See **redirect** below |
| meta      | Route metadata                                 | Object                       | -               | -             | Optional                                                             |
| children  | Child routes                                   | Route[]                      | -               | -             | Optional                                                             |

The above structure only describes required fields for route records. Additional information fields can be implemented as needed.

Detailed description of the **path** field:

Route records typically declare the path field to match the corresponding browser URL to determine whether matching conditions are met. For example, `path=abc` can match the URL `/abc`.

> When declaring the path field, the leading `/` can be omitted; only the characters after it need to be declared. For example, `/abc` can be declared as `abc`.

path (page path) is part of the browser URL. Most website URLs are also influenced by RESTful principles, so we use a similar form as the basis for path rules.
Path rules are an important part of routing configuration. Basic path configuration capabilities need to support concrete paths (/xxx) and path parameters (/:abc).

Using `/one/:two?/three/:four?/:five?` as an example, it can parse the following paths:

- `/one/three`
- `/one/:two/three`
- `/one/three/:four`
- `/one/three/:five`
- `/one/:two/three/:four`
- `/one/:two/three/:five`
- `/one/three/:four/:five`
- `/one/:two/three/:four/:five`

Additional path rules, such as wildcards in paths and multiple matching capabilities, can be implemented as needed.

Detailed description of the **redirect** field:

The **redirect** field has three input types: `String`, `Object`, and `Function`:

1. In string (`String`) format, it defaults to redirecting to a path. Supports input such as '/xxx', '/xxx?ab=c'.
2. In object (`Object`) format, a route object can be passed, such as { name: 'xxx' }, { path: '/xxx' }, to redirect to the corresponding route object.
3. In function (`Function`) format: `(to) => Route`. Its input is the current route item information. Supports returning a Route object or string. In special cases where the redirected path needs processing, a function declaration is required.

```json
{
  "redirect": {
    "type": "JSFunction",
    "value": "(to) => { return { path: '/a', query: { fromPath: to.path } } }"
  }
}
```

##### Complete Description Example

```json
{
  "router": {
    "baseName": "/",
    "historyMode": "hash",
    "routes": [
      {
        "path": "home",
        "page": "home"
      },
      {
        "path": "/*",
        "redirect": "notFound"
      }
    ]
  },
  "componentsTree": [
    {
      "id": "home",
      ...
    },
    {
      "id": "notFound",
      ...
    }
  ]
}
```

### 2.12 Page Information of the Current Application (AA)

Used to describe page information of the current application, such as the low-code building content corresponding to the page, page title, page configuration, etc.
In more complex scenarios, a page mapping layer is allowed to support declaring more page information and configuration, while supporting different types of outputs.

| Parameter | Description                           | Type   | Optional Values | Default Value | Notes                                                                                                                                                                                                                    |
| --------- | ------------------------------------- | ------ | --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id        | Page id                               | String | -               | -             | Required                                                                                                                                                                                                                 |
| type      | Page type                             | String | -               | -             | Optional. Can be used to distinguish page types                                                                                                                                                                          |
| treeId    | Corresponding id in the low-code tree | String | -               | -             | Optional. id of the corresponding child item in componentsTree                                                                                                                                                           |
| packageId | Corresponding asset package object    | String | -               | -             | Optional. Asset package object corresponding to the page. Generally used in micro-frontend scenarios. When routing matches the current page, the micro-application corresponding to `packageId` is loaded for rendering. |
| meta      | Page metadata                         | Object | -               | -             | Optional. Used to describe configuration information of the current application                                                                                                                                          |
| config    | Page configuration                    | Object | -               | -             | Optional. Used to describe metadata information of the current application                                                                                                                                               |

#### 2.12.1 Micro-Application (Low-Code+) Related Notes

During development, we often encounter special situations, such as a low-code application wanting to integrate pages from other systems, or some pages in a system that can only be developed with source code (pure engineering code form, as opposed to low-code). To satisfy more usage scenarios, the application-level rendering engine introduces the concept of micro-applications (micro-frontends), making it possible to combine low-code pages with other pages.

Micro-application objects are loaded through asset packages and must expose two lifecycle methods:

- mount(container: HTMLElement, props: any)
  - Description: Method called when the micro-application is mounted to container (DOM node); invoked when rendering the micro-application
- unmout(container: HTMLElement, props: any)
  - Description: Method called when the micro-application is unmounted from the container node; invoked when unloading the micro-application

> In micro-application scenarios, multiple pages may route to the same application. The application can be loaded through asset packages, so the corresponding page configuration must point to the corresponding micro-application (asset package) object.

**Description Example**

```json
{
  "router": {
    "baseName": "/",
    "historyMode": "hash",
    "routes": [
      {
        "path": "home",
        "page": "home"
      },
      {
        "page": "guide",
        "page": "guide"
      },
      {
        "path": "/*",
        "redirect": "notFound"
      }
    ]
  },
  "pages": [
    {
      "id": "home",
      "treeId": "home",
      "meta": {
        "title": "Home"
      }
    },
    {
      "id": "notFound",
      "treeId": "notFound",
      "meta": {
        "title": "404 Page"
      }
    },
    {
      "id": "guide",
      "packagId": "microApp"
    }
  ]
}

// Asset package
[
  {
    "id": "microApp",
    "package": "microApp",
    "version": "1.23.0",
    "urls": [
      "https://g.alicdn.com/code/lib/microApp.min.css",
      "https://g.alicdn.com/code/lib/microApp.min.js"
    ],
    "library": "microApp"
  },
]
```

## 3 Application Description

### 3.1 File Directory

The following is the recommended application directory structure, aligned with standard source-code build-scripts. This directory structure helps understand the design of application-level protocol and is not strictly enforced.

```html
├── META/ # Low-code metadata information, used for multi-branch conflict resolution, data rollback,
etc. ├── public/ # Static files; copied to build/ directory during build │ ├── index.html #
Application entry HTML │ └── favicon.png # Favicon ├── src/ │ ├── components/ # Low-code business
components within the application │ │ └── guide-component/ │ │ ├── index.js # Component entry │ │
├── components.js # Other components depended on by the component │ │ ├── schema.js # Schema
description │ │ └── index.scss # CSS styles │ ├── pages/ # Pages │ │ └── home/ # Home page │ │ ├──
index.js # Page entry │ │ └── index.scss # CSS styles │ ├── layouts/ │ │ └── basic-layout/ # Layout
component name │ │ ├── index.js # Layout entry │ │ ├── components.js # Other components depended on
by the layout component │ │ ├── schema.js # Layout schema description │ │ └── index.scss # Layout
CSS styles │ ├── config/ # Configuration information │ │ ├── components.js # All components in the
application context │ │ ├── routes.js # Page route list │ │ └── app.js # Application configuration
file │ ├── utils/ # Utility libraries │ │ └── index.js # Application third-party extension functions
│ ├── locales/ # [Optional] Internationalization resources │ │ ├── en-US │ │ └── zh-CN │ ├──
global.scss # Global styles │ └── index.jsx # Application entry script; dynamically generates routes
based on config/routes.js routing configuration ├── webpack.config.js # Project engineering
configuration, including plugin configuration and custom webpack configuration, etc. ├── README.md
├── package.json ├── .editorconfig ├── .eslintignore ├── .eslintrc.js ├── .gitignore ├──
.stylelintignore └── .stylelintrc.js
```

### 3.2 Application-Level APIs

> In the following, `xxx` refers to any API

#### 3.2.1 Routing Router API

- this.location.`xxx` 「Not recommended; prefer using the this.router API uniformly」
- this.history.`xxx` 「Not recommended; prefer using the this.router API uniformly」
- this.match.`xxx` 「Not recommended; prefer using the this.router API uniformly」
- this.router.`xxx`

##### Router Structure Description

| API              | Function Signature                                                            | Description                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| getCurrentRoute  | () => RouteLocation                                                           | Get the current parsed routing information. See RouteLocation structure below                                   |
| push             | (target: string \| Route) => void                                             | Routing navigation method; navigates to the specified path or Route                                             |
| replace          | (target: string \| Route) => void                                             | Routing navigation method; unlike `push`, does not add a history record but replaces the current history record |
| beforeRouteLeave | (guard: (to: RouteLocation, from: RouteLocation) => boolean \| Route) => void | Route guard method before navigation; see below                                                                 |
| afterRouteChange | (fn: (to: RouteLocation, from: RouteLocation) => void) => void                | Hook function after route navigation; executed after each route change                                          |

##### 3.2.1.1 RouteLocation (Routing Information) Structure Description

**RouteLocation** is an object produced by parsing after the routing controller matches the corresponding route record. Its structure is as follows:

| Parameter      | Description                                     | Type   | Optional Values | Default Value | Notes                                                                                             |
| -------------- | ----------------------------------------------- | ------ | --------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| path           | Current parsed path                             | String | -               | -             | Required                                                                                          |
| hash           | Hash value of the current path, starting with # | String | -               | -             | Required                                                                                          |
| href           | Full current path                               | String | -               | -             | Required                                                                                          |
| params         | Matched path parameters                         | Object | -               | -             | Required                                                                                          |
| query          | Current path query object                       | Object | -               | -             | Required. Object representing the search property of the current address                          |
| name           | Matched route record name                       | String | -               | -             | Optional                                                                                          |
| meta           | Matched route record metadata                   | Object | -               | -             | Optional                                                                                          |
| redirectedFrom | Route record originally pointed to              | Route  | -               | -             | Optional. The address originally intended to be visited before redirecting to the current address |
| fullPath       | Full address including search and hash          | String | -               | -             | Optional                                                                                          |

##### beforeRouteLeave

Route guard methods registered through beforeRouteLeave are executed before each route navigation. This method is commonly used in scenarios such as application authentication and route redirection.

> `beforeRouteLeave` only takes effect when `router.push/replace` methods are called.

Parameters passed to the guard:

- to: Target route about to be entered (RouteLocation)
- from: Route currently being left (RouteLocation)

The guard returns a `boolean` or route object to inform the routing controller of the next action.

- If `false` is returned, navigation stops
- If `true` is returned, navigation continues
- If a route object is returned, redirect to the corresponding route

**Usage Example:**

```json
{
  "componentsTree": [
    {
      "componentName": "Page",
      "fileName": "Page1",
      "props": {},
      "children": [
        {
          "componentName": "Div",
          "props": {},
          "children": [
            {
              "componentName": "Button",
              "props": {
                "text": "Go to Home",
                "onClick": {
                  "type": "JSFunction",
                  "value": "function () { this.router.push('/home'); }"
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

#### 3.2.2 Application-Level Common Functions or Third-Party Extensions

- this.utils.`xxx`

#### 3.2.3 Internationalization-Related APIs

| API            | Function Signature                                                     | Description                                                                                                              |
| -------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| this.i18n      | (i18nKey: string, params?: { [paramName: string]: string; }) => string | i18nKey is the corpus identifier. params is optional and used for template string replacement. Returns the corpus string |
| this.getLocale | () => string                                                           | Returns the current environment language code                                                                            |
| this.setLocale | (locale: string) => void                                               | Sets the current environment language code                                                                               |

**Usage Example:**

```json
{
  "componentsTree": [
    {
      "componentName": "Page",
      "fileName": "Page1",
      "props": {},
      "children": [
        {
          "componentName": "Div",
          "props": {},
          "children": [
            {
              "componentName": "Button",
              "props": {
                "children": {
                  "type": "JSExpression",
                  "value": "this.i18n('i18n-hello')"
                },
                "onClick": {
                  "type": "JSFunction",
                  "value": "function () { this.setLocale('en-US'); }"
                }
              }
            },
            {
              "componentName": "Button",
              "props": {
                "children": {
                  "type": "JSExpression",
                  "value": "this.i18n('i18n-chicken', { count: this.state.count })"
                }
              }
            }
          ]
        }
      ]
    }
  ],
  "i18n": {
    "zh-CN": {
      "i18n-hello": "Hello",
      "i18n-chicken": "I have {count} chickens"
    },
    "en-US": {
      "i18n-hello": "Hello",
      "i18n-chicken": "I have {count} chicken"
    }
  }
}
```
