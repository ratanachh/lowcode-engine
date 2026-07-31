---
title: 1. Try the Low Code Engine Demo
sidebar_position: 0
---

The low-code editor is organized into these main areas:
![image.png](https://img.alicdn.com/imgextra/i2/O1CN01aGQull1RVdGs7Pt6x_!!6000000002117-2-tps-3384-1784.png)

## Feature overview by area

### Left: panels and actions

#### Component panel

Search for components and drag them onto the editor canvas.
![Dec-17-2021 19-12-46.gif](https://img.alicdn.com/imgextra/i1/O1CN01pEu7811SlwzxraLHG_!!6000000002288-1-tps-1468-754.gif)

#### Outline panel

Adjust the component tree on the page:
![Dec-17-2021 19-14-34.gif](https://img.alicdn.com/imgextra/i1/O1CN013DDLqt1GH0rAlajqi_!!6000000000596-1-tps-1468-754.gif)
You can show or hide modal overlays here:
![Dec-17-2021 19-19-18.gif](https://img.alicdn.com/imgextra/i2/O1CN01bQfS8W1JitokHRinC_!!6000000001063-1-tps-1468-754.gif)

#### Source code panel

Edit page-level JavaScript and CSS.
![Feb-11-2022 14-51-59.gif](https://img.alicdn.com/imgextra/i1/O1CN01d11kK71Q223eWvL5F_!!6000000001917-1-tps-1532-614.gif)

#### Schema editor

**For developers:** edit the underlying Schema data for the page.
![image.png](https://img.alicdn.com/imgextra/i3/O1CN01lcQOER23Q5sjA0Gn5_!!6000000007249-2-tps-3070-1648.png)
Together with **Save to local** and **Reset page** in the top toolbar, you can experiment with how different schemas affect the low-code page.

The data relationships are:

- **Schema in the page:** the Schema stored in the low-code engine. Clicking **Save Schema** in the Schema panel updates the engine value. All other engine operations may also modify the Schema.
- **localStorage data:** saved by **Save to local** and read on page init and in preview.
- **Default Schema:** the default Schema in the Demo project (`public/schema.json`). Used on init when localStorage is empty, and when you click **Reset page**.

#### Language switch

Switch the editor language. Note: component configuration must support i18n.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN019ORknX1M5SYg7eSJ3_!!6000000001383-2-tps-3018-1512.png)
![image.png](https://img.alicdn.com/imgextra/i2/O1CN01R7g7pW21rSJEHd2AI_!!6000000007038-2-tps-3016-1510.png)

## Center: visual page canvas

Click a component to show its property settings in the right panel.
![Dec-17-2021 19-28-28.gif](https://img.alicdn.com/imgextra/i1/O1CN01uBU3lR1CuAFTTq4RS_!!6000000000140-1-tps-1468-754.gif)

Drag to reorder components.
![Dec-17-2021 19-29-40.gif](https://img.alicdn.com/imgextra/i3/O1CN01DAAYKd1bycUq1C4JV_!!6000000003534-1-tps-1468-754.gif)

Drag components into container components. While dragging, the component tree is shown on the right.
![Dec-17-2021 19-31-30.gif](https://img.alicdn.com/imgextra/i2/O1CN01TzJosP1FIYZe6xIQ5_!!6000000000464-1-tps-1468-754.gif)

## Right: component-level configuration

### Selected component breadcrumb

From the page root to the current selection—click a name to select that component.
![Dec-17-2021 19-35-25.gif](https://img.alicdn.com/imgextra/i4/O1CN01EbImy425R80OeblSD_!!6000000007522-1-tps-1468-754.gif)

### Selected component settings

Top-level tabs for the current component. Sub-tabs depend on component type:

#### Properties

Basic property values.
![Dec-17-2021 19-37-26.gif](https://img.alicdn.com/imgextra/i2/O1CN01ziBI9T1nQynFKqCp2_!!6000000005085-1-tps-1468-754.gif)

#### Style

Style settings, e.g. typography:
![Dec-17-2021 19-38-55.gif](https://img.alicdn.com/imgextra/i4/O1CN017DQv2R1OEjoawXmKJ_!!6000000001674-1-tps-1468-754.gif)

#### Events

Bind events exposed by the component.
![Dec-17-2021 19-41-17.gif](https://img.alicdn.com/imgextra/i2/O1CN01mhVutF24I8cLde0zy_!!6000000007367-1-tps-1468-754.gif)

#### Advanced

Loop, conditional rendering, and key settings.
![Dec-17-2021 19-46-26.gif](https://img.alicdn.com/imgextra/i4/O1CN01xTjXQX1jMcYwuTGKZ_!!6000000004534-1-tps-1468-754.gif)

## Top: toolbar

### Undo and redo

![Dec-17-2021 19-52-23.gif](https://img.alicdn.com/imgextra/i3/O1CN019VWkbr1jsgHoGKf6g_!!6000000004604-1-tps-1468-754.gif)
