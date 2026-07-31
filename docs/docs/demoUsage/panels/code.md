---
title: 7. Source Code Panel Details
sidebar_position: 3
---

In the source code panel you can write the code portions of your low-code page.

## Panel breakdown

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01pRxmmD1agTBVwCO5x_!!6000000003359-2-tps-2502-1740.png)

### Code editor

Write JavaScript with JSX support.
With Babel, JSX and Chrome 80+ syntax are compiled automatically:

| Before compile                                                                                             | After compile                                                                                               |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![image.png](https://img.alicdn.com/imgextra/i4/O1CN01xI9RVX1yV46HbW02H_!!6000000006583-2-tps-670-190.png) | ![image.png](https://img.alicdn.com/imgextra/i1/O1CN012exYQL1y37wKM7VFT_!!6000000006522-2-tps-2094-110.png) |
| ![image.png](https://img.alicdn.com/imgextra/i4/O1CN01pK2rPi1lhLij4m3o7_!!6000000004850-2-tps-434-120.png) | ![image.png](https://img.alicdn.com/imgextra/i2/O1CN01ti4n9m1ihOupktQow_!!6000000004444-2-tps-2536-120.png) |

> Note: `@babel/runtime` currently interferes with compile output, so `async/await` and spread like `{ ...arr }` are not supported in the panel. Compile `originCode` yourself with Babel after reading the schema if you need those features.

#### Global references

Reference globals via `window`. Asset `packages` are UMD bundles—for example, with Fusion Next (default in the Demo):

```typescript
window.Next.Message.success('Success');
```

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01Fxjd801p4eigEBpb6_!!6000000005307-2-tps-238-114.png)

#### Local references

Inside member functions you can use:

- `this.state`
- `this.setState`
- `this.context.appHelper.utils`
- `this.context.appHelper.constants`
- `this.context.appHelper.requestHandlerMap`
- `this.context.components`

#### Read, write, and errors

- **Read:** on open, loads `originCode` from the schema, or reconstructs code from schema fields
- **Write:** on close (X or click outside) code is saved to the schema; use **Save** while editing to save manually

| In source panel                                                                                                                        | In Schema                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Local state init:![image.png](https://img.alicdn.com/imgextra/i4/O1CN01V6iaTY1gVNHi7gQfK_!!6000000004147-2-tps-370-146.png)            | ![image.png](https://img.alicdn.com/imgextra/i2/O1CN010rhIPa268BEfGmzO6_!!6000000007616-2-tps-2098-826.png) |
| Lifecycle methods:![image.png](https://img.alicdn.com/imgextra/i4/O1CN010Y1TxV1QOvrVLRUjD_!!6000000001967-2-tps-478-260.png)           | ![image.png](https://img.alicdn.com/imgextra/i3/O1CN01pbJzVQ1VSfAL7Lh8G_!!6000000002652-2-tps-2010-836.png) |
| Custom methods:![image.png](https://img.alicdn.com/imgextra/i4/O1CN01S2gjFk1CU3fm61eiD_!!6000000000083-2-tps-660-642.png)              | ![image.png](https://img.alicdn.com/imgextra/i2/O1CN01X35YxU1GUkjj1YWVj_!!6000000000626-2-tps-1862-822.png) |
| Full source before compile:![image.png](https://img.alicdn.com/imgextra/i2/O1CN01sbiK9N1kc1Uxp1OHY_!!6000000004703-2-tps-762-1122.png) | ![image.png](https://img.alicdn.com/imgextra/i3/O1CN01adKSg61QXAzRjQ4bm_!!6000000001985-2-tps-1906-796.png) |

- **Errors:** if parsing fails, code is not saved and the editor shows an error dialog:

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01aSzh8o26rWRu6zXFE_!!6000000007715-2-tps-3068-1638.png)

### Style editor

Write CSS here. It maps to the `css` field on the schema:

| In source panel                                                                                            | In Schema                                                                                                   |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![image.png](https://img.alicdn.com/imgextra/i2/O1CN01cuWt4L27fRcW5WIP9_!!6000000007824-2-tps-634-388.png) | ![image.png](https://img.alicdn.com/imgextra/i4/O1CN01Edu7Gy1MzKsb2iss8_!!6000000001505-2-tps-1646-582.png) |

## Wiring code to the UI

### Lifecycle

View lifecycle methods run at the corresponding render phases. Supported methods are defined in the Alibaba mid/back-end frontend schema spec:

```typescript
{
  componentDidMount(): void;
  constructor(props: Record<string, any>, context: any);
  render(): void;
  componentDidUpdate(prevProps: Record<string, any>, prevState: Record<string, any>, snapshot: Record<string, any>): void;
  componentWillUnmount(): void;
  componentDidCatch(error: Error, info: any): void;
}
```

### Settings panel integration

After defining functions or state, wire them in the right-hand settings panel.

Code is typically used for **variable binding**, **event callbacks**, **conditions**, and **loops**.

#### Variable binding

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01wcgwOI1wOXDtgfrgD_!!6000000006298-2-tps-2738-1464.png)
![image.png](https://img.alicdn.com/imgextra/i4/O1CN01GYVAw41FlrvEyFcCO_!!6000000000528-2-tps-1528-1166.png)

```json
{
  "componentName": "NextBlockCell",
  "id": "node_ockzmje8tf5",
  "props": {
    "bodyPadding": {
      "type": "JSExpression",
      "value": "this.state.text",
      "mock": ""
    }
  }
}
```

#### Event callbacks

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01B0tvgw1O6x58dbbIb_!!6000000001657-2-tps-2734-1452.png)
![image.png](https://img.alicdn.com/imgextra/i1/O1CN01sD9g2n1tQQ0OjQkcY_!!6000000005896-2-tps-1670-1162.png)

```json
{
  "componentName": "Filter",
  "id": "node_ockzmj0cl11w",
  "props": {
    "__events": {
      "eventDataList": [
        {
          "type": "componentEvent",
          "name": "onSearch",
          "relatedEventName": "closeDialog"
        }
      ]
    },
    "onSearch": {
      "type": "JSFunction",
      "value": "function(){this.onSearch.apply(this,Array.prototype.slice.call(arguments).concat([])) }"
    }
  }
}
```

#### Conditional rendering

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01zXqec823EBaCutOY2_!!6000000007223-2-tps-2738-1452.png)
![image.png](https://img.alicdn.com/imgextra/i2/O1CN01Ze3snL24BGfuRIMCl_!!6000000007352-2-tps-1528-1166.png)

```json
{
  "componentName": "Filter",
  "id": "node_ockzmj0cl11w",
  "condition": {
    "type": "JSExpression",
    "value": "this.state.text",
    "mock": true
  }
}
```

#### Loop

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01Kbj6XP297fe0BvhKz_!!6000000008021-2-tps-2746-1460.png)
![image.png](https://img.alicdn.com/imgextra/i1/O1CN018Ogesd1qnN0IOKRDZ_!!6000000005540-2-tps-1528-1166.png)

```json
{
  "componentName": "Filter",
  "id": "node_ockzmj0cl11w",
  "loop": {
    "type": "JSExpression",
    "value": "this.state.text",
    "mock": true
  }
}
```
