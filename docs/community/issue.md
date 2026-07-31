---
title: Engine Issue Guidelines
sidebar_position: 2
---

> Submit issues at: [https://github.com/alibaba/lowcode-engine/issues](https://github.com/alibaba/lowcode-engine/issues)

### Read Before Submitting

Because the engine project is complex, maintainers cannot spend much time on reproduction and communication. Please describe reproduction steps as clearly as possible.

![image.png](./img/you-think.png)

**What you think an issue looks like**

![image.png](./img/i-see.png)

**What we see in an issue**

To collaborate effectively, we prioritize engine issues as follows. Please read carefully Orz.

- **[Fast support]** Reproducible via online Demo URL + API input in the console.
- **[Fast support]** Reproducible via online Demo + imported schema
- **[Slower support]** Reproducible via online Demo + complete operation steps
- **[Slower support]** Reproducible via online Demo + code changes, with clear location and content of the changes
- **[Slow support]** Full project URL that can be cloned, dependencies installed, and started to reproduce
- **[Slow support]** For feature requests, due to limited capacity we welcome PRs. If you explain background, context, and scenarios clearly, the maintainers can more easily suggest approaches or direction.
- **[Support not guaranteed]** Other cases
  - Title only, no reproduction steps
  - Unclear reproduction steps
  - Unrelated to the engine

### Examples by Priority

#### **[Fast support]** Reproducible via online Demo URL + API input in the console.

**Example**
![image.png](https://img.alicdn.com/imgextra/i1/O1CN01np6ARb1KnJFOELjXg_!!6000000001208-2-tps-3322-1862.png)
Reproduction steps:

- Open the online demo
- In the console, enter:

```json
// Current doc
const doc = window.AliLowCodeEngine.project.currentDocument

// Create a new doc and switch successfully
window.AliLowCodeEngine.project.openDocument({
    componentName: 'Page'
});

// Cannot switch back
window.AliLowCodeEngine.project.openDocument('docl4xkca5b')
```

Expected behavior:

- `openDocument` should switch back to the original doc normally

#### **[Fast support]** Reproducible via online demo + imported schema

Steps:

- Use the online demo
- Import the schema below
- Schema code / schema zip archive
- Page appears as follows

Expected:

- The xxx part of the page does not match expectations; the expected result is xxx

#### **[Slower support]** Reproducible via online demo + complete operation steps

**Example**

1. Use antd component
   ![image.png](https://img.alicdn.com/imgextra/i4/O1CN019dFe4Y24SDKbmpbdw_!!6000000007389-2-tps-3584-1812.png)

2. Drag this component
   ![image.png](https://img.alicdn.com/imgextra/i2/O1CN0109SdxO1OtxSbpLn4Q_!!6000000001764-2-tps-3584-1802.png)

3. Set this property value to 100
   ![image.png](https://img.alicdn.com/imgextra/i3/O1CN01WeVXpW1HBny0VmQcS_!!6000000000720-2-tps-3584-1800.png)

Expected behavior:

- Component matches the configuration

#### **[Slower support]** Reproducible via online demo + code changes, with clear location and content of the changes

**Example**
![image.png](https://img.alicdn.com/imgextra/i4/O1CN01FL0Urq1tl1pLcYhJH_!!6000000005941-2-tps-1892-754.png)

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01WIpR9V1i363wzyFzi_!!6000000004356-2-tps-1917-778.png)

![image.png](https://img.alicdn.com/imgextra/i1/O1CN01ZDkR3n1MNmP2uk15t_!!6000000001423-2-tps-1836-253.png)

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01OKzt1Z28b9WZIbM6B_!!6000000007950-2-tps-1912-914.png)

#### **[Slow support]** Full project URL that can be cloned, dependencies installed, and started to reproduce

Full projects contain a lot of noise; investigating them is very time-consuming and difficult. This approach is not recommended.

#### **[Support not guaranteed]** Other

##### Title only, no reproduction steps

![image.png](https://img.alicdn.com/imgextra/i3/O1CN017rO2gR1YKpEgIMBjh_!!6000000003041-2-tps-2520-1020.png)

##### Unclear reproduction steps

![image.png](https://img.alicdn.com/imgextra/i4/O1CN01vtHi5z225CC7aFVS2_!!6000000007068-2-tps-3584-1666.png)

##### Unrelated to the engine

![image.png](https://img.alicdn.com/imgextra/i2/O1CN01KxqT9M1vcu25xJHFP_!!6000000006194-2-tps-2548-1430.png)

### Further Reading

We strongly recommend [How To Ask Questions The Smart Way](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way), [How to Ask Questions in Open Source Communities](https://github.com/seajs/seajs/issues/545), [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs-cn.html), and [How to Submit Unanswerable Questions to Open Source Projects](https://zhuanlan.zhihu.com/p/25795393). Better questions get help faster. (This section references [antd](https://github.com/ant-design/ant-design).)
