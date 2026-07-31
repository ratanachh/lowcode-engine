---
title: Introduction
sidebar_position: 1
---

# Introduction to Alibaba Low-Code Engine

## What is low-code?

The concepts of no-code and low-code have been popular across the industry for a long time. A typical definition of low-code has three key points:

1. A visual editor for building software
2. Materials that can be assembled — arranged, combined, and configured — to produce rich functionality or presentation
3. The outcome is lower cost

Low-code platforms usually provide capabilities such as:

- **Visual page building** — complete application pages with simple drag-and-drop; little or no specialized frontend skill required;
- **Visual model design** — business-related data storage becomes easier to understand; in many simple cases the form _is_ the model, with more business-oriented field types;
- **Visual process design** — whether business or approval flows, configure them with simple point-and-line connections;
- **Visual reporting and data analysis** — BI analysis as a standard feature; define custom analysis reports anytime by drag-and-select;
- **Visual service and data openness/integration** — configuration for interconnecting with other systems;
- **Standardized, business-oriented permissions and roles** — fine-grained management of data and operation permissions via policy rules;
- **No need to worry about servers, databases, and other underlying ops, compute, or network concepts** — unified solutions for security and performance so developers can focus on the business itself;

With these, even someone new to engineering can build most business apps as long as they understand the business. Low-code is not only for beginners either. In practice, componentization and modularization make business abstraction easier, and new patterns for extension and configuration reduce architecture and delivery cost for engineers.

For common low-code products on the market, see [Golden's overview](https://golden.com/wiki/No-code_%2F_low-code_development-NMGMEA6).

## What is Low-Code Engine?

**Low-Code Engine is an R&D framework for low-code platform developers — a low-code designer framework with strong customization and extension capabilities.**

Breaking down that definition:

**Low-code designer**
Today there are more and more low-code platforms, and every one of them needs a page for building and configuring pages or modules. We call that page the designer. For example, the figure below shows a designer from a mid/back-office low-code platform.
![image.png](https://img.alicdn.com/imgextra/i3/O1CN01sXuwkK1j8sg4S53Dx_!!6000000004504-2-tps-1682-969.png)
The designer carries the core capabilities of a low-code platform — ingesting materials, orchestration, component configuration, canvas rendering, and more. With so many features and a high bar for polish, it is also the most time-consuming part of building a low-code platform.

**Customization and extension**

Extension means that on one hand you can quickly get a standard low-code designer; on the other, when you need unique business features, you can build them quickly via APIs and plugins without reading the source or caring about internals.
Low-Code Engine's extension support covers essentially every functional area of a low-code designer. The figure below highlights the extension regions of a standard designer.
![](https://img.alicdn.com/imgextra/i1/O1CN01ZVgAE31wltQ4BVnCe_!!6000000006349-2-tps-3838-1914.png)
**Designer R&D framework**

The core of Low-Code Engine is the designer; through extensions and the surrounding ecosystem you can produce many kinds of designers. It is not a one-size-fits-all low-code platform — it is a tool that helps low-code platform developers produce low-code platforms quickly.

## Finding the right low-code solution

Help users choose the right low-code product for personal or enterprise needs.

| Feature / Product        | Low-Code Engine                                                | Lab Platform                                                 | UIPaaS                                                                                 |
| ------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Target users**         | Frontend developers                                            | Users who need to build apps/pages quickly                   | Enterprise users needing large-scale low-code deployment                               |
| **Product traits**       | Designer R&D framework, suited to custom development           | Low-code platform with a visual UI, easy to get started      | Low-code platform incubator with enterprise features                                   |
| **Use cases**            | Customize and develop the designer part of a low-code platform | Rapidly develop apps or pages visually                       | Help enterprises with sizable software teams customize a low-code platform at low cost |
| **Product relationship** | Open-source product                                            | Built on UIPaaS tech; showcases part of UIPaaS capabilities  | Full low-code platform solution; commercial product                                    |
| **Pricing**              | Free                                                           | Free to use (with quota limits); no private-deployment sales | Private deployment only                                                                |
| **Official site**        | [Low-Code Engine](https://lowcode-engine.cn/)                  | [Lab Platform](https://lab.lowcode-engine.cn/)               | [UIPaaS](https://uipaas.net/)                                                          |

_Note: Choose the product that fits your needs and constraints. For more detail, visit each product's official site._
