---
title: 5. Canvas Details
sidebar_position: 1
---

## Component operations

### Canvas interactions

Click a component to show its properties in the right panel.
![Dec-17-2021 19-28-28.gif](https://img.alicdn.com/imgextra/i1/O1CN01flb5tL1inM47Gdo3a_!!6000000004457-1-tps-1468-754.gif)

Drag to reorder components.
![Dec-17-2021 19-29-40.gif](https://img.alicdn.com/imgextra/i3/O1CN01UJ1x731NBFB4eELV0_!!6000000001531-1-tps-1468-754.gif)

While dragging, the component tree is shown on the right.
![Dec-17-2021 19-31-30.gif](https://img.alicdn.com/imgextra/i1/O1CN01jLUYQE1h4dmcfYhZB_!!6000000004224-1-tps-1468-754.gif)

### Component controls

Use the copy button or `ctrl + c` then `ctrl + v` to duplicate.
Use the delete button or `Delete` to remove.
![Dec-17-2021 19-33-20.gif](https://img.alicdn.com/imgextra/i2/O1CN01QT1pq621gvCVpoOm6_!!6000000007015-1-tps-1468-754.gif)

### Changing selection

Use arrow keys to move selection:

- `↑` select component above
- `↓` select component below
- `←` select component to the left
- `→` select component to the right

Hover the first item in the component action bar to select the parent:
![Feb-22-2022 14-42-30.gif](https://img.alicdn.com/imgextra/i4/O1CN01RWbgGJ1TM8HoOpQ7V_!!6000000002367-1-tps-1536-790.gif)

### Extensibility

Shortcuts and the action bar can be extended.

## Slot regions

In React, a prop can be `JSXElement` or `(...args) => JSXElement`. In the low-code canvas this is a **Slot**—you can drop components inside for intuitive composition.
![Feb-22-2022 14-46-02.gif](https://img.alicdn.com/imgextra/i4/O1CN01geivkn1csUog5gZbm_!!6000000003656-1-tps-1534-790.gif)

### Lock a Slot

Lock a Slot so inner content cannot be selected:
![Feb-22-2022 14-50-03.gif](https://img.alicdn.com/imgextra/i3/O1CN01eBD3WY1rPNsZt8UVL_!!6000000005623-1-tps-1534-790.gif)

Unlock from the component tree.

## Design mode

The engine lets components behave differently while editing. The Demo layout components use this API for advanced layout editing.

Two approaches:

- **Intrusive:** in design mode the engine passes `__designMode: 'design'` into the component:

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01Xh3o891gvTrNBMMy2_!!6000000004204-2-tps-3066-1642.png)

- **Dual entry:** configure `editUrls` on the material to load design-only bundles. `pro-layout` uses this:

```json
{
  "package": "@alifd/pro-layout",
  "version": "1.0.1-beta.6",
  "library": "AlifdProLayout",
  "urls": [
    "https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/dist/AlifdProLayout.js",
    "https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/dist/AlifdProLayout.css"
  ],
  "editUrls": [
    "https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/build/lowcode/view.js",
    "https://alifd.alicdn.com/npm/@alifd/pro-layout@1.0.1-beta.6/build/lowcode/view.css"
  ]
}
```
