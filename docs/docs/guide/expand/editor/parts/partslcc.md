---
title: Low-Code Components
sidebar_position: 2
---

## What Are Low-Code Components

First, let's understand what low-code components are and why to use them.

Low-code components are components produced through visual means. These components can be used in both low-code building systems and ProCode development systems (future iteration).

Why use low-code to develop components:

- <font color="red"><b>First</b></font>: **Light and fast**—low-code components require only browser-based initialization in seconds, without heavy ProCode environment setup; **consistent environment (low-code environment)** ensures the material development environment matches the real runtime environment, avoiding dev/runtime mismatches.
- <font color="red"><b>Second</b></font>: **Common capabilities abstracted visually to improve R&D efficiency**, such as fetching remote data, view development, dependency management, lifecycle, and event binding.

<font color="red">Low-code components are not meant to replace ProCode development</font>. They let developers move away from repetitive ProCode work and abstract more business-vertical capabilities for efficiency gains.

## Creating a Component

Environment setup: Develop using the universal [low-code component development environment](https://parts.lowcode-engine.cn/material#/) provided by Parts.

Click **Develop New Component** → Enter component title → Enter component name → Click **Confirm** to complete component creation.

![](https://img.alicdn.com/imgextra/i2/O1CN01OTQRew25y6WxuONIx_!!6000000007594-2-tps-3396-1696.png)

## Component Development

Overview of low-code component development feature modules. Most features can be referenced in the [Low-Code Engine documentation](/lowcode-engine/docs/guide/quickStart/intro).

![](https://img.alicdn.com/imgextra/i1/O1CN01gx96E121qzv4smV2v_!!6000000007037-2-tps-3456-1930.png)

### Dependency Management

Dependency management manages the low-code component's own dependencies (similar to `dependencies`). Steps: Click **Add Component** → Select component to install → **Save and Build** (wait a few minutes for the build).

![](https://img.alicdn.com/imgextra/i4/O1CN01wC9JPK1J9dKLca9wK_!!6000000000986-2-tps-1438-819.png)

### Property Definition

Used to define `propTypes` the component receives externally. Inside the component, property values can be obtained via <font color="red">this.props.${propertyName}</font>.

Before defining properties, read [Material Description Details](/lowcode-engine/docs/guide/expand/editor/metaSpec) and [Built-in Setters](/lowcode-engine/docs/guide/appendix/setters).

![](https://img.alicdn.com/imgextra/i2/O1CN01wesIJA1nL1eSPrk7U_!!6000000005072-2-tps-1438-821.png)

![](https://img.alicdn.com/imgextra/i3/O1CN01FZIRwv1es9lGplgIB_!!6000000003926-2-tps-1438-821.png)

### Lifecycle

Low-code component development supports `componentDidMount`, `componentDidUpdate`, `componentDidCatch`, and `componentWillUnmount` lifecycles.

![](https://img.alicdn.com/imgextra/i4/O1CN010bnrxJ1oLlujlfFqj_!!6000000005209-2-tps-1438-819.png)

### Component Debugging

We provide an online real-time debugging solution. Click the **Debug** button at the top-right to automatically create a low-code application where you can debug the current low-code component in real time.

![](https://img.alicdn.com/imgextra/i2/O1CN01Tk96vp1xrDeNeIUJD_!!6000000006496-2-tps-1438-820.png)

In the low-code application: Component panel → Low-code components. Find the corresponding low-code component and drag it onto the canvas.

![](https://img.alicdn.com/imgextra/i2/O1CN01oGHLea1lzDAhZQQVO_!!6000000004889-2-tps-1438-819.png)

### Component Publishing

We also provide component publishing for version management. Click the **Publish** button at the top-right to publish the component.

![](https://img.alicdn.com/imgextra/i2/O1CN017suVAD1NXEC8zQgO1_!!6000000001579-2-tps-1438-821.png)

## Using Components

Component consumption is managed through asset bundles. See [Asset Bundle Management](./partsassets) for details.

## Component Export

Developed low-code components can be exported as React components for independent use outside the low-code engine. Export also provides a backup of your component—you can use this product's services with confidence without worrying about service unavailability.

On the material list page, low-code components have an export action.

![](https://img.alicdn.com/imgextra/i2/O1CN016oUByO21spVHZvvw2_!!6000000007041-2-tps-1395-413.png)

After clicking export, the low-code component export process starts. It takes 10+ seconds. When complete, the corresponding zip package downloads automatically.

![](https://img.alicdn.com/imgextra/i1/O1CN01lctpIo1aDcEvu75Mo_!!6000000003296-2-tps-1399-512.png)

After extracting the zip, you get a complete component scaffolding project where you can continue development, debugging, or publish to an appropriate npm registry.

![](https://img.alicdn.com/imgextra/i1/O1CN010aAjsf1xYRPZBAh7d_!!6000000006455-2-tps-2154-1072.png)

Note: Export currently does not support nested low-code components.

## Contact Us

<img src="https://img.alicdn.com/imgextra/i2/O1CN01UF88Xi1jC5SZ6m4wt_!!6000000004511-2-tps-750-967.png" width="300" />
