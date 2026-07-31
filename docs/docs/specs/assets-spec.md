---
title: Low-Code Engine Assets Package Protocol Specification
sidebar_position: 2
---

## 1 Introduction

### 1.1 Problem Domain Covered by This Protocol Specification

- Define the version numbering convention for this protocol
- Define the Level that each sub-specification in this protocol must support
- Define domain terminology related to this protocol
- Define the low-code assets package protocol version numbering specification (A)
- Define the low-code assets package protocol component and dependency resource description specification (A)
- Define the low-code assets package protocol component description resource loading specification (A)
- Define the low-code assets package protocol component panel display specification (AA)

### 1.2 Protocol Draft Authors

- Authors: Jinchán, Xuánjī, Bǐyáng
- Reviewers: Lìhào, Xùlí, Guānghóng, Wùzǐ, Wǔliàng, Yóulù

### 1.3 Version Number

1.1.0

### 1.4 Protocol Version Numbering Specification (A)

This protocol uses semantic versioning. The version number format is `major.minor.patch`.

- major is the major version number: used to release protocol format changes that are not backward compatible
- minor is the minor version number: used to release backward-compatible protocol feature additions
- patch is the patch number: used to release backward-compatible protocol bug fixes

### 1.5 Sub-Specification Level Definitions in the Protocol

| Specification Level | Implementation Requirements                                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| A                   | Basic specification; supported by the low-code engine core layer                                                                                 |
| AA                  | Recommended specification; supported by official low-code engine plugins and setters                                                             |
| AAA                 | Reference specification; must be supported by upper-layer building platforms based on the engine; implementation may refer to this specification |

### 1.6 Terminology

- **Assets package**: A dynamic data collection of resources loaded by the low-code engine, mainly including components and their dependent resources, low-code component descriptions, dynamic plugin/setter resources, etc.

### 1.7 Background

Based on the implementation of the low-code engine, for a component to be rendered and configured on the engine, it needs to provide the component's UMD resources and the component's `low-code description`. Components are usually consumed by the engine as a collection. In addition to components, dependent resources of components, dynamic plugins/setters of the engine, and other resources also need to be registered in the engine. Therefore, we define the "low-code assets package" data structure to describe the collection of dynamic resources that the engine needs to load.

### 1.8 Audience

This protocol is intended for developers building building platforms using the "low-code engine". Through the definitions in this protocol, resources are categorized and loaded. Reading and using this protocol requires a certain understanding of the interaction and implementation of low-code building platforms. Familiarity with frontend development technology stacks will also be helpful. This protocol does not provide further explanation of common frontend-related terminology.

## 2 Protocol Structure

The top-level structure of the protocol is as follows, containing 7 aspects of descriptive content:

- version { String } Current protocol version number
- packages { Array } List of resources loaded in the low-code editor
- components { Array } List of description protocols for all components
- sort { Object } Used to describe tabs and categories in the component panel
- plugins { Array } List of designer plugin description protocols
- setters { Array } List of designer setter description protocols
- extConfig { Object } Platform custom extension fields

### 2.1 version (A)

Defines the version number of the current protocol schema;

| Root Property Name | Type   | Description             | Variable Support | Default Value |
| ------------------ | ------ | ----------------------- | ---------------- | ------------- |
| version            | String | Protocol version number | -                | 1.1.0         |

### 2.2 packages (A)

Defines the list of resources loaded in the low-code editor, including common libraries and component (library) CDN resources, etc.;

| Field                          | Field Description                                                                                                                                            | Field Type     | Specification Level | Notes                                                                                                                                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| packages[].id?                 | Unique resource identifier                                                                                                                                   | String         | A                   | Unique resource identifier; if empty, package is used as the unique identifier                                                                                                                                                                                     |
| packages[].title?              | Resource title                                                                                                                                               | String         | A                   | Resource title                                                                                                                                                                                                                                                     |
| packages[].package             | npm package name                                                                                                                                             | String         | A                   | Unique identifier for component resources                                                                                                                                                                                                                          |
| packages[].version             | npm package version number                                                                                                                                   | String         | A                   | Component resource version number                                                                                                                                                                                                                                  |
| packages[].type                | Resource package type                                                                                                                                        | String         | AA                  | Values: proCode (source code), lowCode (low-code; default is proCode)                                                                                                                                                                                              |
| packages[].schema              | Low-code component schema content                                                                                                                            | object         | AA                  | Values: proCode (source code), lowCode (low-code)                                                                                                                                                                                                                  |
| packages[].deps                | List of unique identifiers of dependency resources for the current resource package                                                                          | Array<String\> | A                   | Unique identifier is the value corresponding to id or package                                                                                                                                                                                                      |
| packages[].library             | Name when referenced as a global variable; used to define the global variable name                                                                           | String         | A                   | The low-code engine obtains the component instance through this field                                                                                                                                                                                              |
| packages[].editUrls            | List of CDN URLs for the component edit-mode view bundle, including js and css                                                                               | Array<String\> | A                   | The low-code engine editor loads these URLs                                                                                                                                                                                                                        |
| packages[].urls                | List of CDN URLs for the component render-mode view bundle, including js and css                                                                             | Array<String\> | AA                  | The low-code engine rendering module loads these URLs                                                                                                                                                                                                              |
| packages[].advancedEditUrls    | Collection of CDN URL lists for multiple edit-mode view bundles of the component, including js and css                                                       | Object         | AAA                 | The upper-layer platform extracts edit-mode resources by specific identifier; the low-code engine editor loads these resources, with higher priority than packages[].editUrls                                                                                      |
| packages[].advancedUrls        | Collection of CDN URL lists for multi-end render-mode view bundles of the component, including js and css                                                    | Object         | AAA                 | The upper-layer platform extracts render-mode resources by specific identifier; the low-code engine rendering module loads these resources, with higher priority than packages[].urls                                                                              |
| packages[].external            | Whether the current resource is excluded when used as a dependency of other resources during other dependency bundling (same concept as external in webpack) | Boolean        | AAA                 | Some resources are extracted separately as prerequisite dependencies of other dependencies; this field determines whether to load the resource in advance                                                                                                          |
| packages[].loadEnv             | Specifies the environment in which the current resource is loaded                                                                                            | Array<String\> | AAA                 | Mainly used to specify the loading environment for external resources; values are one or more of design (design mode) and runtime (preview mode)                                                                                                                   |
| packages[].exportSourceId      | Identifies which package the current package content is exported from                                                                                        | String         | AAA                 | urls is invalid in this case                                                                                                                                                                                                                                       |
| packages[].exportSourceLibrary | Identifies which property on window the current package is exported from                                                                                     | String         | AAA                 | exportSourceId has higher priority than exportSourceLibrary; urls is invalid in this case                                                                                                                                                                          |
| packages[].async               | Indicates whether the resource loaded on window.library for the current package is an asynchronous object                                                    | Boolean        | A                   | When async is true, the actual content must be obtained via await                                                                                                                                                                                                  |
| packages[].exportMode          | Indicates the export mode of the current package from other packages                                                                                         | String         | A                   | Currently only supports `"functionCall"`. When exportMode equals `"functionCall"`, the current package content is exported from other packages as a function. The specific export interface is: (library: string, packageName: string, isRuntime?: boolean) => any | Promise<any\>, where library is the library of the current package, packageName is the current package name, and the return value is the exported content of the current package |

Example:

```json
{
  "packages": [
    {
      "title": "Fusion component library",
      "package": "@alifd/next",
      "version": "1.23.0",
      "urls": [
        "https://g.alicdn.com/code/lib/alifd__next/1.23.18/next.min.css",
        "https://g.alicdn.com/code/lib/alifd__next/1.23.18/next-with-locales.min.js"
      ],
      "library": "Next"
    },
    {
      "title": "Fusion premium component library",
      "package": "@alife/fusion-ui",
      "version": "0.1.5",
      "editUrls": [
        "https://g.alicdn.com/code/npm/@alife/fusion-ui/0.1.7/build/lowcode/view.js",
        "https://g.alicdn.com/code/npm/@alife/fusion-ui/0.1.7/build/lowcode/view.css"
      ],
      "urls": [
        "https://g.alicdn.com/code/npm/@alife/fusion-ui/0.1.7/dist/FusionUI.js",
        "https://g.alicdn.com/code/npm/@alife/fusion-ui/0.1.7/dist/FusionUI.css"
      ],
      "library": "FusionUI"
    },
    {
      "title": "Low-code component A",
      "id": "lcc-a",
      "version": "0.1.5",
      "type": "lowCode",
      "schema": {
        "componentsMap": [
          {
            "package": "@ali/vc-text",
            "componentName": "Text",
            "version": "4.1.1"
          }
        ],
        "utils": [
          {
            "name": "dataSource",
            "type": "npm",
            "content": {
              "package": "@ali/vu-dataSource",
              "exportName": "dataSource",
              "version": "1.0.4"
            }
          }
        ],
        "componentsTree": [
          {
            "defaultProps": {
              "content": "This is the default value"
            },
            "methods": {
              "__initMethods__": {
                "compiled": "function (exports, module) { /*set actions code here*/ }",
                "source": "function (exports, module) { /*set actions code here*/ }",
                "type": "js"
              }
            },
            "loopArgs": ["item", "index"],
            "props": {
              "mobileSlot": {
                "type": "JSBlock",
                "value": {
                  "children": [
                    {
                      "condition": true,
                      "hidden": false,
                      "isLocked": false,
                      "conditionGroup": "",
                      "componentName": "Text",
                      "id": "node_ockxiczf4m2",
                      "title": "",
                      "props": {
                        "maxLine": 0,
                        "showTitle": false,
                        "behavior": "NORMAL",
                        "content": {
                          "en-US": "Title",
                          "zh-CN": "Page title",
                          "type": "i18n"
                        },
                        "__style__": {},
                        "fieldId": "text_kxiczgj4"
                      }
                    }
                  ],
                  "componentName": "Slot",
                  "props": {
                    "slotName": "mobileSlot",
                    "slotTitle": "mobile container"
                  }
                }
              },
              "className": "component_k8e4naln",
              "useDevice": false,
              "fieldId": "symbol_k8bnubw4"
            },
            "condition": true,
            "children": [
              {
                "condition": true,
                "loopArgs": [null, null],
                "componentName": "Text",
                "id": "node_ockxiczf4m4",
                "props": {
                  "maxLine": 0,
                  "showTitle": false,
                  "behavior": "NORMAL",
                  "content": {
                    "variable": "props.content",
                    "type": "variable",
                    "value": {
                      "use": "zh-CN",
                      "en-US": "Tips content",
                      "zh-CN": "This is a low-code component",
                      "type": "i18n"
                    }
                  },
                  "fieldId": "text_kxid1d9n"
                }
              }
            ],
            "propTypes": [
              {
                "defaultValue": "This is the default value",
                "name": "content",
                "title": "Text content",
                "type": "string"
              }
            ],
            "componentName": "Component",
            "id": "node_k8bnubvz",
            "state": {}
          }
        ]
      },
      "library": "LCCA"
    },
    {
      "title": "Multi-end component library",
      "package": "@ali/atest1",
      "version": "1.23.0",
      "advancedUrls": {
        "default": [
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.24.0/@ali/atest1/1.0.0/theme.7c897c2.css",
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/atest1/1.0.0/main.3354663.js"
        ],
        "mobile": [
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.24.0/@ali/atest1/1.0.0/theme.7c897c2.css",
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/atest1/1.0.0/main.mobile.3354663.js"
        ],
        "rax": [
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.24.0/@ali/atest1/1.0.0/theme.7c897c2.css",
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/atest1/1.0.0/main.rax.3354663.js"
        ]
      },
      "advancedEditUrls": {
        "design": [
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.24.0/@ali/atest1/1.0.0/theme.7c897c2.css",
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/atest1/1.0.0/editView.design.js"
        ],
        "default": [
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@alife/theme-254/1.24.0/@ali/atest1/1.0.0/theme.7c897c2.css",
          "https://g.alicdn.com/legao-comp/web_bundle_0724/@ali/atest1/1.0.0/editView.js"
        ]
      },
      "library": "Atest1"
    },
    {
      "library": "UiPaaSServerless3",
      "advancedUrls": {
        "default": [
          "https://g.alicdn.com/legao-comp/serverless3/1.1.0/env-staging-d224466e-0614-497d-8cd5-e4036dc50b70/main.js"
        ]
      },
      "id": "UiPaaSServerless3-view",
      "type": "procode",
      "version": "1.0.0"
    },
    {
      "package": "react-color",
      "library": "ReactColor",
      "id": "react-color",
      "type": "procode",
      "version": "2.19.3",
      "async": true,
      "exportMode": "functionCall",
      "exportSourceId": "UiPaaSServerless3-view"
    }
  ]
}
```

### 2.3 components (A)

Defines the collection of low-code descriptions for all components included in the assets package, divided into "ComponentDescription" and "RemoteComponentDescription" (see Section 2.6 TypeScript definitions for details):

- ComponentDescription: Data conforming to the "component description protocol"; see the `2.2.2 Component Description Protocol` section in the material specification for details;
- RemoteComponentDescription: A description of js resources that bundle one or more ComponentDescriptions. After loading this resource in the browser, the specific content of each ComponentDescription contained therein can be obtained;

### 2.4 sort (AA)

Defines component list grouping

| Root Property Name | Type     | Description                                                                                                                                  | Variable Support | Default Value                                    |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------------ |
| sort.groupList     | String[] | Component groups, used for component panel tab display                                                                                       | -                | `['Featured Components', 'Atomic Components']`   |
| sort.categoryList  | String[] | Different sections under the same tab in the component panel are distinguished by category; category ordering follows the categoryList order | -                | `['General', 'Data Display', 'Tables', 'Forms']` |

### 2.5 plugins (AAA)

Custom designer plugin list

| Root Property Name    | Type      | Description                                           | Variable Support | Default Value |
| --------------------- | --------- | ----------------------------------------------------- | ---------------- | ------------- |
| plugins[].name        | String    | Plugin name                                           | -                | -             |
| plugins[].title       | String    | Plugin title                                          | -                | -             |
| plugins[].description | String    | Plugin description                                    | -                | -             |
| plugins[].docUrl      | String    | Plugin documentation URL                              | -                | -             |
| plugins[].screenshot  | String    | Plugin screenshot URL                                 | -                | -             |
| plugins[].tags        | String[]  | Plugin tag categories                                 | -                | -             |
| plugins[].keywords    | String[]  | Plugin search keywords                                | -                | -             |
| plugins[].reference   | Reference | Resource package information referenced by the plugin | -                | -             |

### 2.6 setters (AAA)

Custom setter list

| Root Property Name    | Type      | Description                                           | Variable Support | Default Value |
| --------------------- | --------- | ----------------------------------------------------- | ---------------- | ------------- |
| setters[].name        | String    | Setter component name                                 | -                | -             |
| setters[].title       | String    | Setter title                                          | -                | -             |
| setters[].description | String    | Setter description                                    | -                | -             |
| setters[].docUrl      | String    | Setter documentation URL                              | -                | -             |
| setters[].screenshot  | String    | Setter screenshot URL                                 | -                | -             |
| setters[].tags        | String[]  | Setter tag categories                                 | -                | -             |
| setters[].keywords    | String[]  | Setter search keywords                                | -                | -             |
| setters[].reference   | Reference | Resource package information referenced by the setter | -                | -             |

### 2.7 extConfig (AAA)

Defines platform-related extension content, used to store private protocols implemented by the platform itself, allowing existing platforms to migrate smoothly to the standard protocol. extConfig is a key-value object structure. The protocol does not specify field names or types in extConfig; they are fully customizable.

### 2.8 TypeScript Definitions

_For the meaning of fields related to component low-code descriptions, see the `2.2.2 Component Description Protocol` section in the material specification;_

```TypeScript

/**
 * Assets package protocol
 */
export interface Assets {
  /**
   * Assets package protocol version number
   */
  version: string;
  /**
   * Resource list
   */
  packages?: Array<Package>;
  /**
   * Collection of description protocols for all components
   */
  components: Array<ComponentDescription|RemoteComponentDescription>;
  /**
   * Low-code editor plugin collection
   */
  plugins?: Array<PluginDescription>;
  /**
   * Low-code setter collection
   */
  setters?: Array<SetterDescription>;
  /**
   * Platform extension configuration
   */
  extConfig?: AssetsExtConfig;
  /**
   * Used to describe tabs and categories in the component panel
   */
  sort: ComponentSort;
}

export interface AssetsExtConfig{
  [index: string]: any;
}

/**
 * Describes tab and category layout in the component panel
 */
export interface ComponentSort {
  /**
   * Describes tab items and their ordering in the component panel, e.g.: ["Featured Components", "Atomic Components"]
   */
  groupList?: String[];
  /**
   * Different sections under the same tab in the component panel are distinguished by category; category ordering follows the categoryList order;
   */
  categoryList?: String[];
}

/**
 * Defines assets package dependency information
 */
export interface Package {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Package name
   */
  package: string;
  /**
   * Package version number
   */
  version: string;
  /**
   * Resource type
   */
  type: string;
  /**
   * List of CDN URLs for the component render-mode view bundle, including js and css
   */
  urls?: string[] | any;
  /**
   * List of CDN URLs for multiple render-mode view bundles of the component, including js and css; higher priority than urls
   */
  advancedUrls?: ComplexUrls;
  /**
   * List of CDN URLs for the component edit-mode view bundle, including js and css
   */
  editUrls?: string[] | any;
  /**
   * List of CDN URLs for multiple edit-mode view bundles of the component, including js and css; higher priority than editUrls
   */
  advancedEditUrls?: ComplexUrls;
  /**
   * Schema content of the low-code component
   */
  schema?: ComponentSchema;
  /**
   * List of ids of other resource packages that the current resource depends on
   */
  deps?: string[];
  /**
   * Specifies the environment in which the current resource is loaded
   */
  loadEnv?: LoadEnv[];
  /**
   * Whether the current resource is an external resource
   */
  external?: boolean;
  /**
   * Name when referenced as a global variable; same meaning as the webpack output.library field; used to define the global variable name
   */
  library: string;
  /**
   * Component description export name; the Object content of the component description can be obtained via window[exportName];
   */
  exportName?: string;
  /**
   * Indicates whether the resource loaded on window.library for the current package is an asynchronous object
   */
  async?: boolean;
  /**
   * Indicates the export mode of the current package from other packages
   */
  exportMode?: string;
  /**
   * Identifies which package the current package content is exported from
   */
  exportSourceId?: string;
  /**
   * Identifies which property on window the current package is exported from
   */
  exportSourceLibrary?: string;
}


/**
 * Complex urls structure; compatible with both simple and multi-modal structures
 */
export type ComplexUrls = string[] | MultiModeUrls;

/**
 * Multi-modal resources
 */
export interface MultiModeUrls {
  /**
   * Default resource URLs
   */
  default: string[];
  /**
   * URLs for other modal resources
   */
  [index: string]: string[];
}


/**
 * Resource loading environment types
 */
export enum LoadEnv {
  /**
   * Design mode
   */
	design = "design",
  /**
   * Runtime mode
   */
  runtime = "runtime"
}

/**
 * Low-code setter description
 */
export type SetterDescription = PluginDescription;

/**
 * Low-code plugin description
 */
export interface PluginDescription {
  /**
   * Plugin name
   */
  name: string;
  /**
   * Plugin title
   */
  title: string;
  /**
   * Plugin type
   */
  type?: string;
  /**
   * Plugin description
   */
  description?: string;
  /**
   * Plugin documentation URL
   */
  docUrl: string;
  /**
   * Plugin screenshot
   */
  screenshot: string;
  /**
   * Plugin-related tags
   */
  tags?: string[];
  /**
   * Plugin keywords
   */
  keywords?: string[];
  /**
   * Resource information referenced by the plugin
   */
  reference: Reference;
}

/**
 * Resource reference information; upgraded version of Npm
 */
export interface Reference {
  /**
   * Id identifier of the referenced resource
   */
  id?: string;
  /**
   * Package name of the referenced resource
   */
  package?: string;
  /**
   * Property name in the export object of the referenced resource
   */
  exportName: string;
  /**
   * Sub-object on the referenced exportName
   */
  subName: string;
  /**
   * Main entry of the referenced resource
   */
  main?: string;
  /**
   * Whether to obtain the property value from the export object of the referenced resource
   */
  destructuring: boolean;
  /**
   * Resource version number
   */
  version: string;
}


/**
 * Low-code snippet
 *
 * Contains low-code schema for different component states (may be multiple). When the user drags a component from the component panel into the designer, the component low-code schema defined in snippets is inserted into the page schema
 */
export interface Snippet {
  title: string;
  screenshot?: string;
  schema: ElementJSON;
}

/**
 * Component low-code description
 */
export interface ComponentDescription {
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
  /**
   * Component description under multi-modal mode; higher priority than configure
   */
  advancedConfigures: MultiModeConfigures;
  snippets: Snippet[];
  group: string;
  category: string;
  priority: number;
  /**
   * Resource information referenced by the component
   */
  reference: Reference;
}

export interface MultiModeConfigures {
  default: Configure;
  [index: string]: Configure;
}

/**
 * Remote material description
 */
export interface RemoteComponentDescription {
  /**
   * Component description export name; the Object content of the component description can be obtained via window[exportName];
   */
  exportName?: string;
  /**
   * Resource URL for the component description;
   */
  url?: string;
  /**
   * Resource information for multi-modal component descriptions; higher priority than url
   */
  advancedUrls?: ComplexUrl;
  /**
   * npm information for the component (library);
   */
  package?: {
    npm?: string;
  };
}

export type ComplexUrl = string | MultiModeUrl

export interface MultiModeUrl {
  default: string;
  [index: string]: string;
}

export interface ComponentSchema {
  version: string;
  componentsMap: ComponentsMap;
  componentsTree: [ComponentTree];
  i18n: I18nMap;
  utils: UtilItem[];
}

```

The definition of `ComponentSchema` can be found in [Low-Code Business Component Description](./material-spec.md#221-component-specification)
