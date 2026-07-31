---
title: SelectSetter
---

## Overview

Used to select a value from a limited set of options. The core capability is selection.

## Display

<img src="https://img.alicdn.com/imgextra/i4/O1CN013arqCy1f1JfwdTGQo_!!6000000003946-2-tps-574-602.png" width="300"/>

## Setter Configuration

| Property     | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| mode         | Selector mode. Allowed values: 'single', 'multiple', 'tag'            |
| defaultValue | Default value                                                         |
| options      | Data source. **Format**: [ {label/title: 'text', value: 'text'}, ...] |

## Return Type

String | Number | Boolean

Returns the `value` from the selected option in `options`.
