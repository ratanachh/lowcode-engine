---
title: IconSetter
---

## Overview

Used to select an icon.

## Display

<img src="https://img.alicdn.com/imgextra/i1/O1CN01hdJPHx1zwNKa78YgN_!!6000000006778-2-tps-1172-579.png" width="500"/>

## Setter Configuration

| **Property** | **Type**                | **Description**                                                                          |
| ------------ | ----------------------- | ---------------------------------------------------------------------------------------- |
| type         | String                  | Selector return type. **Allowed values**: "string" \| "node"                             |
| defaultValue | String &#124; ReactNode | Default value                                                                            |
| hasClear     | Boolean                 | Whether the selector shows a clear button                                                |
| icons        | Array                   | Custom icon collection; default values are listed in [Available Icons](#available-icons) |
| placeholder  | String                  | Placeholder when no value is set                                                         |

## Return Type

String | ReactNode

## Available Icons

```javascript
[
  'smile',
  'cry',
  'success',
  'warning',
  'prompt',
  'error',
  'help',
  'clock',
  'success-filling',
  'delete-filling',
  'favorites-filling',
  'add',
  'minus',
  'arrow-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-double-left',
  'arrow-double-right',
  'switch',
  'sorting',
  'descending',
  'ascending',
  'select',
  'semi-select',
  'loading',
  'search',
  'close',
  'ellipsis',
  'picture',
  'calendar',
  'ashbin',
  'upload',
  'download',
  'set',
  'edit',
  'refresh',
  'filter',
  'attachment',
  'account',
  'email',
  'atm',
  'copy',
  'exit',
  'eye',
  'eye-close',
  'toggle-left',
  'toggle-right',
  'lock',
  'unlock',
  'chart-pie',
  'chart-bar',
  'form',
  'detail',
  'list',
  'dashboard',
];
```
