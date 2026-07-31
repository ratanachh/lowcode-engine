---
title: How to Use Loop Values
sidebar_position: 0
---

1. Set loop data
   ![image.png](https://img.alicdn.com/imgextra/i1/O1CN01Gw1kXO1qaXulQCWap_!!6000000005512-2-tps-3840-1900.png)

2. Bind `this.item` where needed
   ![image.png](https://img.alicdn.com/imgextra/i1/O1CN01RpP2Ev24lRxjqpHdY_!!6000000007431-2-tps-3840-1892.png)

After binding:
![image.png](https://img.alicdn.com/imgextra/i3/O1CN019qa1J31m7ugsXcnaA_!!6000000004908-2-tps-3840-1884.png)

The `item` in `this.item` is configurable. Different keys help distinguish nested loop levels.
![image.png](https://img.alicdn.com/imgextra/i4/O1CN01XQfnYL1P4wxn01oXv_!!6000000001788-2-tps-3840-1896.png)

`this.index` is the current loop index.

3. Use in event handlers

Configure extended parameters on event binding:
![image](https://github.com/alibaba/lowcode-engine/assets/11935995/7274506e-decd-497a-b07f-c95941a706b4)

Use them in the handler:
![image](https://github.com/alibaba/lowcode-engine/assets/11935995/9d52ee5c-9959-4991-91be-9391e639bb7e)

Button click result:
![image](https://github.com/alibaba/lowcode-engine/assets/11935995/6ca590c9-1f5f-4d48-94a5-439130a22e92)
