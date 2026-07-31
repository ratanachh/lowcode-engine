---
title: EventSetter
---

## Overview

Binds events to a material.

## Display

<img src="https://img.alicdn.com/imgextra/i3/O1CN01mAMfxZ20WYca6KqJb_!!6000000006857-2-tps-1202-1014.png" width="300"/>

## Built-in Event List

Declared in `configure.supports.events` in the material protocol:

```json
{
  "configure ": {
    "supports": {
      "style": true,
      "events": [
        {
          "name": "onChange"
        },
        {
          "name": "onExpand"
        },
        {
          "name": "onVisibleChange"
        }
      ]
    }
  }
}
```

## Event Binding

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01Q5gHFy1uSzqUeEqQK_!!6000000006037-2-tps-2540-1242.png)

You can bind to an existing event (from the **methods** node in the schema), or create a new one. Creating a new event appends a `_new` suffix to the name by default. After confirming, the editor navigates to the corresponding section in the code plugin.

## Parameter Configuration

If you need to pass extra parameters, enable extended parameter settings and edit the parameter content in the code panel.

Notes:

- Extra parameters must be wrapped in an object, as shown in the parameter template
- Dynamic variables are supported, for example (`this.items`, `this.state.xxx`)

  ```javascript
  {
  	testKey: this.state.text,
  }
  ```

- These parameters are appended after the original arguments. For example, when adding extended parameters to `onClick`, the handler should consume them as follows:
  ```javascript
  // e is the original onClick args; extParams are custom args
  onClick(e, extParams) {
  	this.setState({
  		isShowDialog: extParams.isShowDialog,
  	});
  }
  ```

## New Function Template for Events

Sometimes newly created functions use a common template. You can define a template in `events.template` in the material protocol, as follows:

```json
{
  "configure ": {
    "supports": {
      "style": true,
      "events": [
        {
          "name": "onChange",
          "template": "templeteTest(e,${extParams}){this.setState({isShowDialog: false})}"
        },
        {
          "name": "onExpand"
        },
        {
          "name": "onVisibleChange"
        }
      ]
    }
  }
}
```

`${extParams}` is a placeholder for extended parameters. If the user does not declare extended parameters, the corresponding parameter declaration is removed. After defining a template, each newly created function automatically generates the template function, as shown below:

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01XUoXnS1XiLxlxXniw_!!6000000002957-2-tps-1292-282.png)
