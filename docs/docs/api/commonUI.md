---
title: commonUI - UI Component Library
sidebar_position: 10
---

## Overview

CommonUI API is a component UI library designed for the low-code engine. Plugins built with it stay consistent and compatible across projects and theme switches.

## Component List

### Tip

Tooltip component

| Parameter | Description   | Type                                   | Default |
| --------- | ------------- | -------------------------------------- | ------- |
| className | className     | string (optional)                      |         |
| children  | Tip content   | IPublicTypeI18nData \| ReactNode       |         |
| direction | Tip direction | 'top' \| 'bottom' \| 'left' \| 'right' |         |

### HelpTip

Tooltip component with a help icon

| Parameter | Description | Type                              | Default |
| --------- | ----------- | --------------------------------- | ------- |
| help      | Description | IPublicTypeHelpTipConfig          |         |
| direction | Direction   | IPublicTypeTipConfig['direction'] | 'top'   |
| size      | Size        | IconProps['size']                 | 'small' |

### Title

Title component

| Parameter | Description   | Type                    | Default |
| --------- | ------------- | ----------------------- | ------- |
| title     | Title content | IPublicTypeTitleContent |         |
| className | className     | string (optional)       |         |
| onClick   | Click handler | () => void (optional)   |         |

### ContextMenu

| Parameter | Description                   | Type                           | Default |
| --------- | ----------------------------- | ------------------------------ | ------- |
| menus     | Array of context menu actions | IPublicTypeContextMenuAction[] |         |
| children  | Child elements                | React.ReactElement[]           |         |

**IPublicTypeContextMenuAction Interface**

| Parameter | Description                                                                             | Type                                                                                                                                       | Default                              |
| --------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| name      | Unique identifier for the action                                                        | string                                                                                                                                     |                                      |
| title     | Display title, can be a string or internationalized data                                | string \| IPublicTypeI18nData (optional)                                                                                                   |                                      |
| type      | Menu item type                                                                          | IPublicEnumContextMenuType (optional)                                                                                                      | IPublicEnumContextMenuType.MENU_ITEM |
| action    | Action to execute on click, optional                                                    | (nodes: IPublicModelNode[]) => void (optional)                                                                                             |                                      |
| items     | Sub-menu items or function to generate child nodes, optional; only two levels supported | Omit<IPublicTypeContextMenuAction, 'items'>[] \| ((nodes: IPublicModelNode[]) => Omit<IPublicTypeContextMenuAction, 'items'>[]) (optional) |                                      |
| condition | Function to determine display condition                                                 | (nodes: IPublicModelNode[]) => boolean (optional)                                                                                          |                                      |
| disabled  | Function to determine disabled condition, optional                                      | (nodes: IPublicModelNode[]) => boolean (optional)                                                                                          |                                      |

**ContextMenu Example**

```typescript
const App = () => {
  const menuItems: IPublicTypeContextMenuAction[] = [
    {
      name: 'a',
      title: 'Option 1',
      action: () => console.log('Option 1 clicked'),
    },
    {
      name: 'b',
      title: 'Option 2',
      action: () => console.log('Option 2 clicked'),
    },
  ];

  const ContextMenu = ctx.commonUI.ContextMenu;

  return (
    <div>
      <ContextMenu menus={menuItems}>
        <div>Right-click here</div>
      </ContextMenu>
    </div>
  );
};

export default App;
```

**ContextMenu.create Example**

```typescript
const App = () => {
  const menuItems: IPublicTypeContextMenuAction[] = [
    {
      name: 'a',
      title: 'Option 1',
      action: () => console.log('Option 1 clicked'),
    },
    {
      name: 'b',
      title: 'Option 2',
      action: () => console.log('Option 2 clicked'),
    },
  ];

  const ContextMenu = ctx.commonUI.ContextMenu;

  return (
    <div>
      <div
        onClick={(e) => {
          ContextMenu.create(menuItems, e);
        }}
      >
        Click here
      </div>
    </div>
  );
};

export default App;
```

### Balloon

See: [Balloon Documentation](https://fusion.design/pc/component/balloon)

### Breadcrumb

See: [Breadcrumb Documentation](https://fusion.design/pc/component/breadcrumb)

### Button

See: [Button Documentation](https://fusion.design/pc/component/button)

### Card

See: [Card Documentation](https://fusion.design/pc/component/card)

### Checkbox

See: [Checkbox Documentation](https://fusion.design/pc/component/checkbox)

### DatePicker

See: [DatePicker Documentation](https://fusion.design/pc/component/datepicker)

### Dialog

See: [Dialog Documentation](https://fusion.design/pc/component/dialog)

### Dropdown

See: [Dropdown Documentation](https://fusion.design/pc/component/dropdown)

### Form

See: [Form Documentation](https://fusion.design/pc/component/form)

### Icon

See: [Icon Documentation](https://fusion.design/pc/component/icon)

Icons supported by the engine default theme: https://fusion.design/64063/component/icon?themeid=20133

### Input

See: [Input Documentation](https://fusion.design/pc/component/input)

### Loading

See: [Loading Documentation](https://fusion.design/pc/component/loading)

### Message

See: [Message Documentation](https://fusion.design/pc/component/message)

### Overlay

See: [Overlay Documentation](https://fusion.design/pc/component/overlay)

### Pagination

See: [Pagination Documentation](https://fusion.design/pc/component/pagination)

### Radio

See: [Radio Documentation](https://fusion.design/pc/component/radio)

### Search

See: [Search Documentation](https://fusion.design/pc/component/search)

### Select

See: [Select Documentation](https://fusion.design/pc/component/select)

### SplitButton

See: [SplitButton Documentation](https://fusion.design/pc/component/splitbutton)

### Step

See: [Step Documentation](https://fusion.design/pc/component/step)

### Switch

See: [Switch Documentation](https://fusion.design/pc/component/switch)

### Tab

See: [Tab Documentation](https://fusion.design/pc/component/tab)

### Table

See: [Table Documentation](https://fusion.design/pc/component/table)

### Tree

See: [Tree Documentation](https://fusion.design/pc/component/tree)

### TreeSelect

See: [TreeSelect Documentation](https://fusion.design/pc/component/treeselect)

### Upload

See: [Upload Documentation](https://fusion.design/pc/component/upload)

### Divider

See: [Divider Documentation](https://fusion.design/pc/component/divider)

## Notes

If you need other components, please open an issue.
