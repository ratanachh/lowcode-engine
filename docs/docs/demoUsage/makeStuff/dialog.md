---
title: 3. Show or Hide a Dialog from a Button
sidebar_position: 1
---

> Note: This depends on whether the dialog material exposes the needed APIs. Materials differ; this guide uses the integrated dialog material.

## 1. Drag a button

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01kLaWA31D6WwTui9VW_!!6000000000167-2-tps-3584-1812.png)

## 2. Drag a dialog

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01rfRzLa1quEwUyulPc_!!6000000005555-2-tps-3578-1622.png)

## 3. Find the dialog refId

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01rEgPnW1cSqdWpG0YE_!!6000000003600-2-tps-3574-1588.png)

- Click the dialog
- Open **Advanced** in the right panel
- Find **refId**

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01MXMfqn1rj4uKzlOh2_!!6000000005666-2-tps-3584-1796.png)

Here the refId is `pro-dialog-entryl32xgrus`.

## 4. Hide the dialog

Click the hide icon in the toolbar to hide the dialog on the canvas.
![image.png](https://img.alicdn.com/imgextra/i3/O1CN017Kamt71HFvWkpeK8j_!!6000000000729-2-tps-3578-1568.png)

## 5. Bind a button event

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01SwJ0xx1u3LfX2h8yt_!!6000000005981-2-tps-3584-1814.png)

**Open the dialog with:**

```typescript
this.$('pro-dialog-entryl32xgrus').open();
```

####
