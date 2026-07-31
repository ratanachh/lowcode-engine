---
title: React Component Import
sidebar_position: 3
---

## Introduction

When building low-code application platforms with the [Low-Code Engine](https://lowcode-engine.cn/), a main challenge is how to quickly and cost-effectively integrate existing React components. This breaks down into two sub-problems:

1. How to [configure material descriptions](/site/docs/specs/material-spec) for existing components,
2. How to build an asset bundle (Assets) that the low-code engine can recognize.

Our product [Parts](https://parts.lowcode-engine.cn/) helps solve this problem. We complete material description configuration through an online visual interface and provide one-click packaging to generate asset bundles the engine can recognize.

## Import Materials

First, import materials for online material description configuration on the [Material Management](/site/docs/specs/material-spec) page.
![image.png](https://img.alicdn.com/imgextra/i1/O1CN01IyZdZf1L1VWWU3dnp_!!6000000001239-2-tps-1399-342.png)

- Click the **Import Existing Material** button at the top-left of the list
- Enter the npm package name in the dialog
- Click **Get Package Info** to fetch basic npm package information
- Click **Confirm** to complete import

![image.png](https://img.alicdn.com/imgextra/i4/O1CN019FwWgs1kqgAXq5UNJ_!!6000000004735-2-tps-640-315.png)

## Configuration Management

Step 2: After importing materials, you can add [material description configuration](/site/docs/specs/material-spec) for imported materials. Click **Component Configuration** on the right to start configuring.

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01kqymdB1nkDQclPk7F_!!6000000005127-2-tps-965-261.png)

### Add Configuration

- Click **Add Configuration** at the top-right of configuration management
  - Select the component version
  - Fill in the component path, usually the same as the `main` field in the npm package's `package.json` (if incorrect, rendering will fail later)
  - The description field adds notes for this configuration.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01i78OhT1cKbVWnXRNu_!!6000000003582-2-tps-596-418.png)

To reduce configuration cost, the first time you add configuration, component code is automatically parsed to generate an initial component material description. Wait briefly for code parsing. After parsing completes, click the configuration button to enter the online configuration interface.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01R24mTl1tJY3oJ5DCi_!!6000000005881-2-tps-963-232.png)

### Component Description Configuration

The operation interface is shown below. The specific configuration flow follows.

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01XjSW9I1u662raRg8E_!!6000000005987-2-tps-1438-938.png)

#### Add Component

If automatic code parsing fails during new configuration, or the parsed component list does not meet development requirements, click the **Add** button in the left component list plugin to add a new component. Refer to the field hints. Example using [react-color](https://github.com/casesandberg/react-color):

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01A9VFfQ1m9kH2Qliz4_!!6000000004912-2-tps-1436-1005.png)

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01klci7y1IUPflKpeVB_!!6000000000896-2-tps-1193-704.png)

#### Add Material Description to Component

- Open the left Setter panel
- Drag the required Setter type for each component property (e.g., for the `width` property in the image, drag in Number Setter)
- See [Built-in Setter List](/site/docs/guide/appendix/setters) for Setter introductions
- Configure basic property information (as shown)
- Click **Save** at the top-right when done

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01gxLKBp1RaDEMPS54O_!!6000000002127-2-tps-1434-967.png)

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01uReCQ825yYuwIfj2J_!!6000000007595-2-tps-925-360.png)

#### Advanced Configuration (Property Linkage)

Example: When the "Setter" configuration item's value is modified, the "Default Value" below should change accordingly.

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01bg7X571bpSZdnXTBW_!!6000000003514-2-tps-371-572.png)

How to use

Component property configuration currently supports three basic linkage functions:

- **Display state**: Returns `true` | `false`. Returns `true` to show the configuration during setup; otherwise hidden.
- **Get value**: Triggered when the configuration node's `getValue` method is called
- **Value change**: Triggered when the configuration node's `setValue` method is called

![image.png](https://img.alicdn.com/imgextra/i3/O1CN018ZJAJO21q57TdWfjM_!!6000000007035-2-tps-316-142.png)

The first parameter of each method is the current configuration node object. Commonly used methods include:

- `getValue()`: Get the current node's value; `undefined` if the current node is a child node
- `setValue()`: Set the current node's value if the current node is a child node
- `parent`: Current node's parent node
- `getPropValue(propName)`: Parent gets a child node's property value; `propName` is the child property name
- `setPropValue(propName, value)`: Parent sets a child node's property value; `propName` is the child property name, `value` is the value to set
- `getConfig`: Get the current node's configuration, such as title, setter, etc.

#### Debug Material Description

Click the **Preview** button at the top-right to debug the properties you just configured. For first-time component preview, there is a component build process (building the UMD package). After the build completes, you can debug your configuration.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN012biqEn1uGAl650nb2_!!6000000006009-2-tps-1431-373.png)

#### Publish Material Description

After material description debugging is complete, you can use it in your project. Publish the material description first.

- Click the **Publish** button at the top-right
- Select components to publish
- Click **Confirm** to complete publishing

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01uwa8RH1QDwM7FN31k_!!6000000001943-2-tps-1431-734.png)

## Asset Bundle

Step 3: After material description publishing, build a usable asset bundle for low-code applications.

#### Asset Bundle Build

There are two ways to build an asset bundle:

- Use the **My Asset Bundles** asset bundle management module for full lifecycle management, including building. See [Asset Bundle Management](./partsassets)
- Use **Asset Bundle Build** in the **My Materials** component management module:

  - Select components to build
  - Click the build asset bundle button
  - Select the material description configuration you just created
  - Start the build. When complete, you get a JSON file (containing material descriptions and UMD packages) ready for use in your project

#### Using the Asset Bundle

See [Asset Bundle Management](./partsassets#using-an-asset-bundle) for details.

## Contact Us

<img src="https://img.alicdn.com/imgextra/i2/O1CN01UF88Xi1jC5SZ6m4wt_!!6000000004511-2-tps-750-967.png" width="300" />
