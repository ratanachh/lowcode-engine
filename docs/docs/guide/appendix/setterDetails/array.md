---
title: ArraySetter
---

## Overview

Displays and edits properties whose type is an array.

## Display

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01BXCpnh1OFebSSyeDQ_!!6000000001676-2-tps-584-362.png)

## Configuration Example

```json
"setter": {
	"componentName": "ArraySetter",
	"props": {
		"itemSetter": {
			"componentName": "ObjectSetter",
			"props": {
				"config": {
					"items": [{
							"name": "title",
							"description": "Title",
							"setter": "StringSetter"
						},
						{
							"name": "callback",
							"description": "callback",
							"setter": {
								"componentName": "FunctionSetter"
							}
						}
					]
				}
			},
      "initialValue": {
       	 "title": "I am title",
         "callback": null
      }
		}
	}
}
```

## ArraySetter Configuration

| **Property** | **Type**     | **Description**                                             |
| ------------ | ------------ | ----------------------------------------------------------- |
| itemSetter   | ObjectSetter | ArraySetter child content must be wrapped with ObjectSetter |

## itemSetter Configuration

| **Property**  | **Type** | **Description**                      |
| ------------- | -------- | ------------------------------------ |
| componentName | String   |                                      |
| props         |          |                                      |
| initialValue  | Object   | Initial value when adding a new item |

## ObjectSetter Configuration

| **Property**               | **Type**                     | **Description**                                                                                                                                                                                               |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor                 | String                       | The `item.key` name displayed in the list. Must match a key in `config.items[]`. Default: "Item X" ![image.png](https://img.alicdn.com/imgextra/i4/O1CN01Okz1DY1Q17GGJBPDf_!!6000000001915-2-tps-640-372.png) |
| config                     | Object                       | Configuration                                                                                                                                                                                                 |
| config.items               | Array                        | Child property list                                                                                                                                                                                           |
| config.items[].name        | String                       | Child property name                                                                                                                                                                                           |
| config.items[].description | String                       | Child property description                                                                                                                                                                                    |
| config.items[].setter      | Object &#124; String         | Child property setter configuration &#124; child property setter component name                                                                                                                               |
| config.items[].isRequired  | Boolean                      | Whether to enable quick edit for the child property. At most 4 can be enabled ![image.png](https://img.alicdn.com/imgextra/i1/O1CN01EflYAK1IPpiChvjHz_!!6000000000886-2-tps-614-422.png)                      |
| config.items[].condition   | Boolean &#124; () => Boolean | Whether to display the property                                                                                                                                                                               |
| config.items[].getValue    | (target, value) => value     | Data read hook; can modify retrieved data                                                                                                                                                                     |
| config.items[].setValue    | (target, value) => value     | Data write hook; can modify data being set                                                                                                                                                                    |
