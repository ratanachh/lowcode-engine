---
title: Protocol Stack Introduction
sidebar_position: 1
---

## What are low-code protocols

The low-code engine system is built on three protocols: the [Low-Code Engine Building Protocol Specification](/lowcode-engine/docs/specs/lowcode-spec), the [Low-Code Engine Material Protocol Specification](/lowcode-engine/docs/specs/material-spec), and the [Low-Code Engine Asset Bundle Protocol Specification](/lowcode-engine/docs/specs/assets-spec). They standardize the low-code domain and become the foundation for ecosystem building and circulation.

![image.png](https://img.alicdn.com/imgextra/i3/O1CN01axsOyW1s01YgXnT8z_!!6000000005703-2-tps-1888-1000.png)

## Why protocols are needed

First, an imperfect analogy: compare the low-code engine to the JavaScript language. Remember the fear of browser compatibility, especially IE vs. other browsers, where inconsistent upper-layer API implementations meant one codebase needed adaptation to run on both sides. After browser/JavaScript standards emerged, browsers unified APIs and freed us from much of that work (PS: Babel's transformation of language features is a separate issue).

Before the Low-Code Engine Building Protocol Specification, the low-code domain had similar problems.

### Inconsistent terminology

Inconsistent terms for building products during communication created overhead in articles, tech talks, and meetups.

### Material silos

Because low-code products were implemented differently, materials were consumed differently. There are two kinds: low-code materials and ProCode materials.

For low-code materials, materials created on platform A cannot be used on platform B. To achieve the same material on B, you must build it again to B's standard.

For ProCode materials, consuming them on a low-code platform requires conversion, including generating build configuration, material build views, and sometimes special description files. Without unification at this layer, the same ProCode material may need different description formats, conversion code, and tools for each low-code platform it joins.

### Ecosystem isolation

Different low-code platforms also have different ecosystems. Some have strong material ecosystems; others have strong building experience ecosystems. But these benefits cannot interoperate. Even with source code, reuse is hard because the underlying implementations differ. For a large organization, each platform building its own ecosystem is not ideal.

### Low-level repeated work

You might think these problems help when building your own wheel because you grow technically.

For low-code platform teams, much work goes into material conversion, material generation, small building-experience tweaks, and reimplementing parts of other platforms' ecosystems. That work is not deeply technical; it is low-level repeated construction.

### Low value

If every business starts from zero and builds its own platform, a lot of time goes into underlying infrastructure, which is not good for the business itself. Frontend infrastructure is largely similar across teams, and duplicate builds waste resources.

Such construction means spending a long time from 0 to 1. When internal staffing is limited, products often face shutdown decisions before they grow.

Imagine developing one material usable across all group low-code platforms—is that more rewarding? Imagine quickly launching a low-code platform on an existing ecosystem instead of spending 1–2 years building a usable platform before validating the market, then refining after fast validation—is that a better model?

Using Alibaba in 2019 as an example, low-code materials across platforms included but were not limited to:

1. vc-deep — vc protocol + Deep component library (Alibaba Enterprise Intelligence team customized on Fusion Next);
2. Iceluna protocol + Fusion Next;
3. AIMake materials;
4. vc-fusion-basic + business customization — vc protocol + Fusion Next (forked and customized by business units);
5. vision fork + vc protocol extension + fusion business components;
6. vc protocol + antd;

Each building platform had to maintain its own base component library, which was unreasonable and split developers' focus away from business goals.

Establishing unified low-code domain standards is beneficial. In 2020, Alibaba discussed this and launched a building governance and material circulation initiative, which produced the protocol specifications above and became the foundation of the low-code engine and its ecosystem.

## Role of protocols

Based on unified protocols, we standardize business components, blocks, templates, and other materials. Materials produced by various mid/back-office R&D systems can circulate across systems through a material center, improving efficiency via a shared material ecosystem. We also unify low-code engine standards and output mid-platform building capabilities, helping business units quickly incubate domain-specific mid/back-office R&D systems.

### Breaking material silos

#### Material center

Using Alibaba's frontend material infrastructure as an example: after the Low-Code Engine Material Protocol Specification landed, it created a basis for communication across mid/back-office R&D platforms. Prerequisites for material circulation were in place; we also needed a unified material source for upload, storage, search, and distribution—a centralized architecture similar to npm. That is the material center.

Fusion Market was a predecessor. It provided storage, documentation, and global exposure for business components. Because the Fusion system was widely used in the group, Fusion Market accumulated many business components, but the project stayed quiet—component count grew, yet materials did not circulate. One reason was lack of endorsement from the Alibaba frontend committee; without unified standards, materials could not flow.

After standards were established, the material center had a foundation. It was built in 2019 and provided platform capabilities for material circulation.

#### Low-code base materials

Like Ant Design and Element for source-code development, low-code building platforms need a unified, out-of-the-box low-code base component library. Two base material libraries were built on the low-code description protocol: the "Fusion low-code base component library" and the "Ant Design low-code base component library".

#### Source-code component low-code conversion

Convert source-code components into low-code materials in one step, conforming to the low-code material specification so they can circulate on low-code platforms.

### Low-code material center

When low-code materials reach a certain scale, business materials across building platforms grow. These materials are managed and consumed uniformly through the low-code material center.

### Foundation of the setter ecosystem

Snippet (default build schema for components) is defined by the Low-Code Engine Building Protocol Specification; the low-code engine renders components according to the spec. Configure is defined by the Low-Code Engine Material Protocol Specification; it describes component props and the setter for each prop (prop configuration panel). The low-code engine provides 20+ built-in setters. If component props exceed built-in setters, you need to develop corresponding setters yourself.
Setters gradually formed their own ecosystem, making material development easier by reusing existing setters in material configuration descriptions.

### Low-code engine implementation standard

The low-code engine is the consumer of the ecosystem above. It is a low-code engine that implements the standard protocols. This part is essential. The low-code engine is like a standards-compliant browser: other platforms can reference it, implement to the official protocols, and then consume the material ecosystem and other ecosystems.
