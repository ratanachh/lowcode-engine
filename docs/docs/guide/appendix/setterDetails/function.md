---
title: FunctionSetter
---

## Overview

Binds a function to a material.

## Setter Return Value

The setter returns a Function object. Call `function()` to execute the Function object and get the result.

Below is a typical usage example:

```javascript
export type TestProps = React.ComponentProps<typeof Test> & {
  testFunction?: Function | undefined,
};

const getTestData = () => {
  if (this.props.testFunction === undefined) {
    return undefined;
  } else {
    return this.props.testFunction(); // Return the result of testFunction();
  }
};
```

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

Sometimes newly created functions use a common template. You can define a template in the material protocol's `meta.ts`, as follows:

```TypeScript
{
    name: 'onChange',
    title: {
        label: 'onChange',
        tip: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    },
    propType: 'func',
    setter: [
        {
            componentName: 'FunctionSetter',
            props: {
                template: 'onTableChange(value,${extParams}){\n\n}',
            },
        },
    ],
}
```

`${extParams}` is a placeholder for extended parameters. If the user does not declare extended parameters, the corresponding parameter declaration is removed.
