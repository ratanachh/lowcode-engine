---
title: 2. How to Build a Table
sidebar_position: 0
---

## Step-by-step

### Drag in components

A typical table page has a filter, table, and pagination. Fusion UI provides these—find them in the left component panel.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01UU8pVT26XN1A0ExVG_!!6000000007671-2-tps-3032-1648.png)

Drag them onto the canvas:
![Feb-16-2022 16-58-59.gif](https://img.alicdn.com/imgextra/i3/O1CN01UAsQ8124HgDptzPrn_!!6000000007366-1-tps-1534-792.gif)

### Configure components

Select the filter component you dropped and configure it:
![Feb-14-2022 17-59-47.gif](https://img.alicdn.com/imgextra/i2/O1CN01RiDUy31aufSeVk8IN_!!6000000003390-1-tps-1532-792.gif)

For array fields you can add/remove items, edit fields, and reorder.

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01eWOK0d1fOfsF9PZu9_!!6000000003997-2-tps-3060-1476.png)

With that, you can configure a typical filter:
![Feb-21-2022 18-05-52.gif](https://img.alicdn.com/imgextra/i1/O1CN0138fb0P1CTbHKWDBeo_!!6000000000082-1-tps-1532-790.gif)

### Bind data

Low-code pages need dynamic data. Use the source panel on the left to define state and handlers:

![image.png](https://img.alicdn.com/imgextra/i1/O1CN015Bw2aQ1jaMRWoYzv5_!!6000000004564-2-tps-2976-1478.png)

Add sample data to state:

```json
    "companies": [
      { company: 'Test Company1', id: 1, createTime: +new Date() },
      { company: 'Test Company2', id: 2, createTime: +new Date() },
      { company: 'Test Company3', id: 3, createTime: +new Date() },
    ]
```

Then bind it to component props:

![image.png](https://img.alicdn.com/imgextra/i3/O1CN013Cu5OE1CXGRhyEmbJ_!!6000000000090-2-tps-3546-1792.png)

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01iaK15j1bgIeO65svI_!!6000000003494-2-tps-3428-1640.png)

Use an expression:

```javascript
this.state.companies;
```

Together with component configuration, you can set up the table body:

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01p8QJ5C1buxKDTS1cU_!!6000000003526-2-tps-3058-1640.png)

### Dynamic requests

Use a lifecycle method to fetch data. Example API: [http://rap2api.taobao.org/app/mock/250089/testCompanies](http://rap2api.taobao.org/app/mock/250089/testCompanies)

```typescript
class LowcodeComponent extends Component {
  state = {
    text: 'outer',
    isShowDialog: false,
    loading: false,
    companies: [
      { company: 'Test Company 1', id: 1, createTime: +new Date() },
      { company: 'Test Company 2', id: 2, createTime: +new Date() },
      { company: 'Test Company 3', id: 3, createTime: +new Date() },
    ],
  };
  componentDidMount() {
    this.setState({ loading: true });
    window
      .fetch('http://rap2api.taobao.org/app/mock/250089/testCompanies')
      .then((res) => res.json())
      .then((companies) => {
        this.setState({
          companies,
        });
      })
      .catch((err) => console.error(err))
      .then(() => {
        this.setState({ loading: false });
      });
  }
}
```

On `componentDidMount`, the page requests the API and updates `loading` and `companies`.

After save or closing the source panel, the code takes effect:

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01lqjW8e1f39G8Zm7hQ_!!6000000003950-2-tps-3058-1634.png)

### Configure slots

Bind `loading` to the loading indicator:

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01K3Pwjo1PKWQcoBl5K_!!6000000001822-2-tps-3170-1904.png)

![Feb-16-2022 20-24-35.gif](https://img.alicdn.com/imgextra/i2/O1CN01VGlZPS1JitoljrFFY_!!6000000001063-1-tps-1532-792.gif)

After binding **visible** on Loading to `this.state.loading`, a slot appears. Drop other components into the slot:

![Feb-16-2022 20-27-03.gif](https://img.alicdn.com/imgextra/i2/O1CN01HSBncU1XWRfPdwlPK_!!6000000002931-1-tps-1528-792.gif)

Click **Preview** (top right) to see the live request:

![Feb-16-2022 20-28-36.gif](https://img.alicdn.com/imgextra/i3/O1CN01o5THZf1fkesw2nZEC_!!6000000004045-1-tps-1534-792.gif)

### Column dialog hook

To open a dialog from a table column, first add a dialog:
![Feb-16-2022 20-32-09.gif](https://img.alicdn.com/imgextra/i2/O1CN01bX3SHk21Z8T4O6knp_!!6000000006998-1-tps-1532-792.gif)

Use the outline tree to show/hide the dialog while editing:
![Feb-16-2022 20-32-39.gif](https://img.alicdn.com/imgextra/i3/O1CN01ZtSp0P1LvNqYPeUHg_!!6000000001361-1-tps-1530-792.gif)

Add a data column:
![Feb-16-2022 20-39-41.gif](https://img.alicdn.com/imgextra/i2/O1CN012K6qWI1hgCG6KwRF7_!!6000000004306-1-tps-1532-792.gif)

Set its action to **Dialog**:
![Feb-16-2022 20-40-05.gif](https://img.alicdn.com/imgextra/i2/O1CN016axZh61uc9ln0L3Rz_!!6000000006057-1-tps-1532-792.gif)

Result:
![Feb-16-2022 20-42-51.gif](https://img.alicdn.com/imgextra/i4/O1CN018iana91j4l71QTmpE_!!6000000004495-1-tps-1534-792.gif)

### Event callbacks

The previous section bound behavior on a data column. Here we bind the action column. Click **Add item** under the action buttons:
![Feb-23-2022 11-58-02.gif](https://img.alicdn.com/imgextra/i4/O1CN01DsBoHQ1tyli2rtoFR_!!6000000005971-1-tps-1534-790.gif)

Select the detail button and configure its event callback:
![Feb-23-2022 12-00-18.gif](https://img.alicdn.com/imgextra/i2/O1CN017BuNLP1LPmW8zH7hx_!!6000000001292-1-tps-1534-790.gif)

In code, define the handler:

```javascript
onClick_new(e, { rowKey, rowIndex, rowRecord }){
  window.Next.Message.show(JSON.stringify({ rowKey, rowIndex, rowRecord }))
}
```

Save and preview:
![Feb-23-2022 12-05-25.gif](https://img.alicdn.com/imgextra/i3/O1CN01CXi1zJ1N302paKUre_!!6000000001513-1-tps-1532-790.gif)

## Study the example schema

The example schema is hosted here: [https://mo.m.taobao.com/marquex/lowcode-showcase-table](https://mo.m.taobao.com/marquex/lowcode-showcase-table)

Import it via the Schema panel (bottom left).
![image.png](https://img.alicdn.com/imgextra/i1/O1CN01z2LXgW1iFSklNRzTN_!!6000000004383-2-tps-3054-1620.png)
