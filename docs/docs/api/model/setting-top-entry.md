---
title: SettingTopEntry
sidebar_position: 6
---

> **@types** [IPublicModelSettingTopEntry](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-top-entry.ts)<br/>

## Overview

Setter top-level operation object

## Properties

#### node

Returns the owning node instance

`@type {IPublicModelNode | null}`

## Methods

#### get

Get a child property object

```
/**
  * Get child prop object
  * @param propName
  * @returns
  */
get(propName: string | number): IPublicModelSettingField | null;
```

Related sections: [Setting Field](./setting-field)

Related types: [IPublicModelSettingField](https://github.com/alibaba/lowcode-engine/blob/main/packages/types/src/shell/model/setting-field.ts)

#### getPropValue

Get the value for the specified propName

```
/**
  * Get value of the specified propName
  * @param propName
  * @returns
  */
getPropValue(propName: string | number): any;
```

#### setPropValue

Set the value for the specified propName

```
/**
  * Set value of the specified propName
  * @param propName
  * @param value
  */
setPropValue(propName: string | number, value: any): void;
```

#### clearPropValue

Clear the value for the specified propName

```
/**
  * Clear value of the specified propName
  * @param propName
  */
clearPropValue(propName: string | number): void;
```
