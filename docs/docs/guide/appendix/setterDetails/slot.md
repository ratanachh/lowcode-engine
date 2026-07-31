---
title: SlotSetter
---

## Overview

By enabling a slot, you can render one or more nodes at a specific location in a material. Slots are well suited for localized custom rendering in materials.

## Display

<img src="https://img.alicdn.com/imgextra/i3/O1CN01DwFQ221ks3MDXhk36_!!6000000004738-2-tps-588-454.png" width="300"/>

<br/>
<br/>

<img src="https://img.alicdn.com/imgextra/i1/O1CN01pQC6EE1bWDwIkVq2z_!!6000000003472-2-tps-644-164.png" width="300"/>

## Setter Configuration

| Property      | Type    | Description                                                                                                                                                                                                                                                                                                                                                    |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initialValue  | Object  | Default value: `{ "type": "JSSlot", "params": [ "module" ], "value": [] }`. `params`: function parameters passed to the slot; can be consumed directly in slot nodes via `this.module` (where `module` is an example — change it to match your actual function parameters). `value`: defines a node that is filled in by default each time the slot is opened. |
| hideParams    | boolean | Whether to hide parameter inputs. Note: this only hides the parameter input fields (suitable for single-line display). At render time, `params` are still passed — unlike `params: []`.                                                                                                                                                                        |
| checkedText   | string  | Switch label when enabled. Default: "Enable"                                                                                                                                                                                                                                                                                                                   |
| unCheckedText | string  | Switch label when disabled. Default: "Disable"                                                                                                                                                                                                                                                                                                                 |

## Configuration Example

### Configuration

```typescript
{
    name: 'propName',
    title: 'propTitle',
    setter: {
      componentName: 'SlotSetter',
      isRequired: true,
      title: 'Component slot',
      initialValue: {
        type: 'JSSlot',
        value: [],
      },
    }
  }
```

### Component

```typescript
function A(props) {
  return props.propName;
}
```

## Parameterized Slot Example

### Configuration

```typescript
{
  name: 'propName',
  title: 'propTitle',
  setter: {
    componentName: 'SlotSetter',
    isRequired: true,
    title: 'Component slot',
    initialValue: {
      type: 'JSSlot',
      params: [ 'module'],
      value: [],
    },
  }
}
```

### Component

The component must receive parameters for rendering — usage differs from the basic example.

```typescript
function A(props) {
  const module = [];
  return props.propName(module);
}
```

### Param Usage Example

1. Enable the slot

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01RlOXAV1TbFMBZa6xq_!!6000000002400-2-tps-3584-1800.png)

2. Drag components into the slot

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01NNiWLs26961orvk9i_!!6000000007618-2-tps-3584-1806.png)

3. Use variable binding inside slot components — bind to `this.xxx`

Parameter configuration for `xxx`

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01cBn2ym1XF2cDZo5Yp_!!6000000002893-2-tps-3584-1806.png)
