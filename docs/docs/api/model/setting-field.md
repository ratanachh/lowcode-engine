---
title: SettingField
sidebar_position: 6
---

> **@types** [IPublicModelSettingField](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-field.ts)<br/>

## Overview

Setter setting field operation object

## Properties

#### isGroup

Get the isGroup flag of the setting field

`@type {boolean}`

#### id

Get the id of the setting field

`@type {string}`

#### name

Get the name of the setting field

`@type {string | number | undefined}`

#### key

Get the key of the setting field

`@type {string | number | undefined}`

#### path

Get the path of the setting field

`@type {(string | number)[]}`

#### title

Get the title of the setting field

`@type {string}`

#### setter

Get the setter of the setting field

`@type {IPublicTypeSetterType | null}`

#### expanded

Get the expanded state of the setting field

`@type {boolean}`

#### extraProps

Get the extraProps of the setting field

`@type {IPublicTypeFieldExtraProps}`

#### props

`@type {IPublicModelSettingTopEntry}`

Related sections: [Setting Top Entry](./setting-top-entry)

Related types: [IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

#### node

Get the node instance corresponding to the setting field

`@type {IPublicModelNode | null}`

#### parent

Get the parent setting field

`@type {IPublicModelSettingTopEntry | IPublicModelSettingField}`

Related sections: [Setting Top Entry](./setting-top-entry)

Related types: [IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

#### top

Get the top-level setting field

`@type {IPublicModelSettingTopEntry}`

Related sections: [Setting Top Entry](./setting-top-entry)

Related types: [IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

#### isSettingField

Whether this is a SettingField instance

`@type {boolean}`

#### componentMeta

`@type {IPublicModelComponentMeta}`

Related types: [IPublicModelComponentMeta](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/component-meta.ts)

#### items

Get the items of the setting field

`@type {Array<IPublicModelSettingField | IPublicTypeCustomView>}`

Related types: [IPublicTypeCustomView](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/custom-view.ts)

## Methods

#### setKey

Set the key value

```
/**
  * Set key
  * @param key
  */
setKey(key: string | number): void;
```

#### setValue

Set value

```
/**
  * Set value
  * @param val value
  */
setValue(val: IPublicTypeCompositeValue, extraOptions?: IPublicTypeSetValueOptions): void;
```

Related types:

- [IPublicTypeCompositeValue](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/composite-value.ts)
- [IPublicTypeSetValueOptions](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/set-value-options.ts)

#### setPropValue

Set a child property value

```
/**
  * Set nested prop value
  * @param propName child prop name
  * @param value value
  */
setPropValue(propName: string | number, value: any): void;
```

#### clearPropValue

Clear the specified property value

```
/**
  * Clear the specified prop value
  * @param propName
  */
clearPropValue(propName: string | number): void;
```

#### getDefaultValue

Get the configured default value

```
/**
  * Get configured default value
  * @returns
  */
getDefaultValue(): any;
```

#### getValue

Get value

```
/**
  * Get value
  * @returns
  */
getValue(): any;
```

#### getPropValue

Get a child property value

```
/**
  * Get nested prop value
  * @param propName child prop name
  * @returns
  */
getPropValue(propName: string | number): any;
```

#### getExtraPropValue

Get a top-level extra property value

```
/**
  * Get top-level extra prop value
  */
getExtraPropValue(propName: string): any;
```

#### setExtraPropValue

Set a top-level extra property value

```
/**
  * Set top-level extra prop value
  */
setExtraPropValue(propName: string, value: any): void;
```

#### getProps

Get the setting props collection

```
/**
  * Get setting field set
  * @returns
  */
getProps(): IPublicModelSettingTopEntry;
```

Related sections: [Setting Top Entry](./setting-top-entry)

Related types: [IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)

#### isUseVariable

Whether a variable is bound

```
/**
  * Whether a variable is bound
  * @returns
  */
isUseVariable(): boolean;
```

#### setUseVariable

Set variable binding

```
/**
  * Set bound variable
  * @param flag
  */
setUseVariable(flag: boolean): void;
```

#### createField

Create a setting field instance

```
/**
  * Create a setting field instance
  * @param config
  * @returns
  */
createField(config: IPublicTypeFieldConfig): IPublicModelSettingField;
```

Related types: [IPublicTypeFieldConfig](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/field-config.ts)

#### getMockOrValue

Get value; when bound to a variable, returns the mock value

```
/**
  * Get value; when it is a variable, return mock
  * @returns
  */
getMockOrValue(): any;

```

#### purge

Destroy the current field instance

```
/**
  * Destroy the current field instance
  */
purge(): void;
```

#### remove

Remove the current field instance

```
/**
  * Remove the current field instance
  */
remove(): void;
```

## Events

#### onEffect

Set autorun

```
/**
  * Set autorun
  * @param action
  * @returns
  */
onEffect(action: () => void): IPublicTypeDisposable;
```

Related types: [IPublicTypeDisposable](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/type/disposable.ts)
