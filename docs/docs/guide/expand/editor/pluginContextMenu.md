---
title: Plugin Extension - Orchestration Extension
sidebar_position: 6
---

## Scenario 1: Extend Selected Node Actions

### Add Node Actions

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01J7PrJc1S86XNDBIFQ_!!6000000002201-2-tps-1240-292.png)

After selecting a node, action buttons appear in the top-right of the selection box. In addition to the default view parent, copy, and delete buttons implemented by the orchestration module, you can extend more actions through related APIs:

```typescript
import { plugins } from '@rchh/lowcode-engine';
import { IPublicModelPluginContext, IPublicModelNode } from '@rchh/lowcode-types';
import { Icon, Message } from '@alifd/next';

const addHelloAction = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      ctx.material.addBuiltinComponentAction({
        name: 'hello',
        content: {
          icon: <Icon type="atm" />,
          title: 'hello',
          action(node: IPublicModelNode) {
            Message.show('Welcome to Low-Code engine');
          },
        },
        condition: (node: IPublicModelNode) => {
          return node.componentMeta.componentName === 'NextTable';
        },
        important: true,
      });
    },
  };
};
addHelloAction.pluginName = 'addHelloAction';
await plugins.register(addHelloAction);
```

**_Result:_**

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01O8W2H61ybw2b7K5nV_!!6000000006598-2-tps-1315-343.png)

See API reference: [API Documentation](/lowcode-engine/docs/api/material#addbuiltincomponentaction)

### Remove Node Actions

```typescript
import { plugins } from '@rchh/lowcode-engine';
import { IPublicModelPluginContext } from '@rchh/lowcode-types';

const removeCopyAction = (ctx: IPublicModelPluginContext) => {
  return {
    async init() {
      ctx.material.removeBuiltinComponentAction('copy');
    },
  };
};
removeCopyAction.pluginName = 'removeCopyAction';
await plugins.register(removeCopyAction);
```

**_Result:_**

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01Gfnu8J1O7PTRdoFQZ_!!6000000001658-2-tps-1319-290.png)

See API reference: [API Documentation](/lowcode-engine/docs/api/material#removebuiltincomponentaction)

## Real-World Examples

### Block Management

- Repository: [https://github.com/alibaba/lowcode-plugins](https://github.com/alibaba/lowcode-plugins)
- Source code: [https://github.com/alibaba/lowcode-plugins/tree/main/packages/action-block](https://github.com/alibaba/lowcode-plugins/tree/main/packages/action-block)
- Live replays:
  - [Low-Code Engine Project Practice (9) - Block Management (1) - Save as Block](https://www.bilibili.com/video/BV1YF411M7RK/)
  - [Low-Code Engine Project Practice (10) - Block Management - Block Panel](https://www.bilibili.com/video/BV1FB4y1S7tu/)
  - [Alibaba Low-Code Engine Project Practice (11) - Block Management - Icon Optimization](https://www.bilibili.com/video/BV1zr4y1H7Km/)
  - [Alibaba Low-Code Engine Project Practice (11) - Block Management - Auto Screenshot](https://www.bilibili.com/video/BV1GZ4y117VH/)
  - [Alibaba Low-Code Engine Project Practice (11) - Block Management - Style Optimization](https://www.bilibili.com/video/BV1Pi4y1S7ZT/)
  - [Alibaba Low-Code Engine Project Practice (12) - Block Management (Conclusion) - Submitting a PR to the Engine Plugin](https://www.bilibili.com/video/BV1hB4y1277o/)
