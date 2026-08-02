---
title: Material Description Details
sidebar_position: 2
---

## Material Description Overview

In admin front-end systems, there are a large number of components. Developers can learn how to use components by reading documentation. However, a building platform cannot understand README files, and README files often do not include property lists. In this case, we need an additional description to tell the low-code building platform which properties a component accepts and how those properties should be configured. Thus, the [**《Low-Code Component Description Protocol for Admin Applications》**](/lowcode-engine/docs/specs/material-spec) was created. The protocol mainly consists of three parts: basic information, property information (`props`), and capability configuration / experience enhancement (`configure`).

Material configuration means producing a JSON Schema that conforms to the [**《Low-Code Component Description Protocol for Admin Applications》**](/lowcode-engine/docs/specs/material-spec). If you need to supplement property descriptions or customize the experience enhancement section (such as modifying setters or adjusting display order), you can do so by modifying this schema. Currently, material description configuration can be generated automatically or configured manually.

## Visually Generating Material Descriptions

Use the Parts platform: [Documentation](/lowcode-engine/docs/guide/expand/editor/parts/partsIntro)

## Automatically Generating Material Descriptions

You can use the official `@rchh/lowcode-material-parser` to parse local components and automatically generate material descriptions. Place the material description in the asset bundle definition so the low-code engine understands how to work with the material. See the previous section "Material Extension" for details.

The following example uses a component code snippet:

```typescript
// /path/to/component
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class FusionForm extends PureComponent {
  static displayName = 'FusionForm';

  static defaultProps = {
    name: 'Zhang San',
    age: 18,
    friends: ['Li Si', 'Wang Wu', 'Zhao Liu'],
  };

  static propTypes = {
    /**
     * Describes the name
     */
    name: PropTypes.string.isRequired,
    /**
     * Describes the age
     */
    age: PropTypes.number,
    /**
     * Describes the friends list
     */
    friends: PropTypes.array,
  };

  render() {
    return <div>dumb</div>;
  }
}
```

Import the parse tool for automatic parsing

```typescript
import parse from '@rchh/lowcode-material-parser';
(async () => {
  const result = await parse({ entry: '/path/to/component' });
  console.log(JSON.stringify(result, null, 2));
})();
```

Because a component may export multiple sub-components, the parse result is an array.

```json
[
  {
    "componentName": "FusionForm",
    "title": "",
    "docUrl": "",
    "screenshot": "",
    "devMode": "proCode",
    "npm": {
      "package": "",
      "version": "",
      "exportName": "default",
      "main": "",
      "destructuring": false,
      "subName": ""
    },
    "props": [
      {
        "name": "name",
        "propType": "string",
        "description": "Describes the name",
        "defaultValue": "Zhang San"
      },
      {
        "name": "age",
        "propType": "number",
        "description": "Describes the age",
        "defaultValue": 18
      },
      {
        "name": "friends",
        "propType": "array",
        "description": "Describes the friends list",
        "defaultValue": ["Li Si", "Wang Wu", "Zhao Liu"]
      }
    ]
  }
]
```

## Manually Configuring Material Descriptions

If automatically generated materials do not meet requirements, you need to manually configure material descriptions. This section describes material configuration by scenario.

### Common Configuration

#### Component Properties Have Limited Values

Add a `size` property that can only be selected from the candidates `'large'`, `'normal'`, and `'small'`.

Using the automatically parsed material above as a base, manually add the `size` property:

```json
[
  {
    "componentName": "FusionForm",
    "title": "",
    "docUrl": "",
    "screenshot": "",
    "devMode": "proCode",
    "npm": {
      "package": "",
      "version": "",
      "exportName": "default",
      "main": "",
      "destructuring": false,
      "subName": ""
    },
    "props": [
      {
        "name": "name",
        "propType": "string",
        "description": "Describes the name",
        "defaultValue": "Zhang San"
      },
      {
        "name": "age",
        "propType": "number",
        "description": "Describes the age",
        "defaultValue": 18
      },
      {
        "name": "friends",
        "propType": "array",
        "description": "Describes the friends list",
        "defaultValue": ["Li Si", "Wang Wu", "Zhao Liu"]
      }
    ],
    // Manually added size prop
    "configure": {
      "isExtend": true,
      "props": [
        {
          "title": "Size",
          "name": "size",
          "setter": {
            "componentName": "RadioGroupSetter",
            "isRequired": true,
            "props": {
              "options": [
                { "title": "Large", "value": "large" },
                { "title": "Medium", "value": "normal" },
                { "title": "Small", "value": "small" }
              ]
            }
          }
        }
      ]
    }
  }
]
```

#### Component Properties Can Be Fixed Values or Bound to Variables

We know that each property form requires a setter. To allow the `value` property to accept string input, set it to `StringSetter`. To allow variable binding, set it to `VariableSetter`. See the [Built-in Setter List](/lowcode-engine/docs/guide/appendix/setters) for setters.

What if you want both? Use `MixedSetter`.

```javascript
{
  // ...
  configure: {
    isExtend: true,
    props: [
      {
        title: 'Input value',
        name: 'activeValue',
        setter: {
          componentName: 'MixedSetter',
          isRequired: true,
          props: {
            setters: [
              'StringSetter',
              'NumberSetter',
              'VariableSetter',
            ],
          },
        }
      }
    ]
  }
}
```

After configuration, a "Switch setter" action item appears.

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01jBqcuK1xYRP00WyVx_!!6000000006455-2-tps-598-252.png)

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01944xqq1PYihvYQb4v_!!6000000001853-2-tps-244-308.png)

#### Enable Component Style Configuration

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01EBStyl24EvqJkAdh1_!!6000000007360-2-tps-820-772.png)

```javascript
{
  configure: {
    // ...,
    supports: {
      style: true,
    },
    // ...
  }
}
```

#### Set Default Component Events

![image.png](https://img.alicdn.com/imgextra/i2/O1CN012gijqt1NERwqF5f6Y_!!6000000001538-2-tps-776-800.png)

```javascript
{
  configure: {
    // ...
    supports: {
      events: ['onPressEnter', 'onClear', 'onChange', 'onKeyDown', 'onFocus', 'onBlur'],
    },
    // ...
  }
}
```

#### Set Prop Title Tips

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01d8TdsY1jhENsKvwAv_!!6000000004579-2-tps-908-176.png)

```javascript
{
  name: 'label',
  setter: 'StringSetter',
  title: {
    label: {
      type: 'i18n',
      zh_CN: 'Label text',
      en_US: 'Label',
    },
    tip: {
      type: 'i18n',
      zh_CN: 'prop: label | description: Label text content',
      en_US: 'prop: label | description: label content',
    },
  },
}
```

#### Configure How a Prop's Setter Is Displayed in the Configuration Panel

##### inline

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01z1sXj420vkP7vbeHj_!!6000000006912-2-tps-790-266.png)

```javascript
{
  configure: {
    props: [
      {
        description: 'Label text',
        display: 'inline',
      },
    ];
  }
}
```

##### block

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01i3MVKF299xchs6kMX_!!6000000008026-2-tps-792-274.png)

```javascript
{
  configure: {
    props: [
      {
        description: 'Advanced',
        display: 'block',
      },
    ];
  }
}
```

##### accordion

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01RePeyy1nhvRiBMm2w_!!6000000005122-2-tps-798-740.png)

```javascript
{
  configure: {
    props: [
      {
        description: 'Form item config',
        display: 'accordion',
      },
    ];
  }
}
```

##### entry

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01zkjBak1YY6igYUO1n_!!6000000003070-2-tps-796-424.png)

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01lmuRTl1LOPKMnsfLJ_!!6000000001289-2-tps-794-632.png)

```javascript
{
  configure: {
    props: [
      {
        description: 'Style',
        display: 'entry',
      },
    ];
  }
}
```

##### plain

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01G0DOfV1jGD0v049gk_!!6000000004520-2-tps-776-438.png)

```javascript
{
  configure: {
    props: [
      {
        description: 'Go back',
        display: 'plain',
      },
    ];
  }
}
```

### Advanced Configuration

#### Component's `children` Property Accepts ReactNode

For example, consider a Tab component where each TabPane's `children` is a component.

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01Cu09HV1m8pTucSc7Q_!!6000000004910-2-tps-2332-334.png)

Simply add the `isContainer` configuration:

```javascript
{
  // ...
  configure: {
    // ...
    component: {
      // New: mark as container so components can be dropped in
      isContainer: true,
    },
  }
}
```

If you want to allow only Table, Button, and similar content to be dragged into TabPane, configure the whitelist `childWhitelist`:

```javascript
{
  // ...
  configure: {
    // ...
    component: {
      isContainer: true,
      nestingRule: {
        // Whitelist of components allowed to drop in
        childWhitelist: ['Table', 'Button'],
        // Likewise, you can set which parent components this component may be dropped into
        parentWhitelist: ['Tab'],
      },
    },
  },
}
```

#### Non-children Properties Accept ReactNode

This requires using `SlotSetter` to enable slots. In the example below, a slot is enabled for Tab's `title`, allowing components to be dragged in.

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01P77m5m1pKEBXTk9Yt_!!6000000005341-2-tps-3016-580.png)

```json
{
  // ...
  "configure": {
    "isExtend": true,
    "props": [
      {
        "title": "Tab Title",
        "name": "title",
        "setter": {
          "componentName": "MixedSetter",
          "props": {
            "setters": ["StringSetter", "SlotSetter", "VariableSetter"]
          }
        }
      }
    ]
  }
}
```

#### Hide Component Action Buttons in the Designer

Normally, components allow copying:

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01925Nyl1a2AKNQ1XCP_!!6000000003271-2-tps-1158-226.png)

To disable component copy behavior:

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01IoLKUu1CXGRb0ileB_!!6000000000090-2-tps-1176-300.png)

```javascript
{
  configure: {
    component: {
      disableBehaviors: ['copy'],
    },
  },
}
```

#### Implement a BackwardSetter

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01GI4VfT23ga8TUCjIh_!!6000000007285-2-tps-776-438.png)

```javascript
{
  name: 'back',
  title: ' ',
  display: 'plain',
  setter: BackwardSetter,
}

// BackwardSetter
import { SettingTarget, DynamicSetter } from '@rchh/lowcode-types';
const BackwardSetter: DynamicSetter = (target: SettingTarget) => {
  return {
    componentName: (
      <Button
        onClick={() => {
          target.getNode().parent.select();
        }}
      >
        <Icon type="arrow-left" /> Go back
      </Button>
    ),
  };
};
```

### Advanced Configuration

#### Hide a Prop Configuration

- Always hide the current prop

```javascript
{
  // Always hide the current prop config
  condition: () => false,
}
```

- Show/hide the current prop based on other prop values

```javascript
{
  // Show the current prop config when direction is hoz
  condition: (target) => {
    return target.getProps().getPropValue('direction') === 'hoz';
  };
}
```

#### Prop Linkage

```javascript
// Dynamically set other props' values from the current prop value
{
  name: 'labelAlign',
  // ...
  extraProps: {
    setValue: (target, value) => {
      if (value === 'inset') {
        target.getProps().setPropValue('labelCol', null);
        target.getProps().setPropValue('wrapperCol', null);
      } else if (value === 'left') {
         target.getProps().setPropValue('labelCol', { fixedSpan: 4 });
         target.getProps().setPropValue('wrapperCol', null);
      }
      return target.getProps().setPropValue('labelAlign', value);
    },
  },
}
// Set the current prop value from other props' values
{
  name: 'status',
  // ...
  extraProps: {
    getValue: (target) => {
      const isPreview = target.getProps().getPropValue('isPreview');
      return isPreview ? 'readonly' : 'editable';
    }
  }
}
```

#### Dynamic Setter Configuration

Through the `target` passed to `DynamicSetter`, you can obtain some data exposed by the engine—for example, which components are loaded into the engine. Use this data as options for `SelectSetter` and let the user choose:

```javascript
{
  setter: (target) => {
    return {
      componentName: 'SelectSetter',
      props: {
        options: target.designer.props.componentMetadatas.filter(
          (item) => item.isFormItemComponent).map(
            (item) => {
              return {
                title: item.title || item.componentName,
                value: item.componentName,
              };
            }
          ),
        ),
      },
    };
  }
}
```
