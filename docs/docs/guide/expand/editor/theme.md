---
title: Theme Color Extension
sidebar_position: 9
---

## Introduction

Theme color extension allows users to customize diverse designer themes, increasing interface personalization and brand recognition.

## Designer Theme Customization

Defining theme color variables at the CSS root level ensures they are available throughout the application. For example:

```css
:root {
  --color-brand: rgba(0, 108, 255, 1); /* Primary brand color */
  --color-brand-light: rgba(25, 122, 255, 1); /* Light brand color */
  --color-brand-dark: rgba(0, 96, 229, 1); /* Dark brand color */
}
```

Import the stylesheet into your designer, and the defined CSS variables will change the designer's theme colors.

### Theme Color Variables

The following is the list of theme color variables supported by the low-code engine designer and their usage:

#### Brand Colors

- `--color-brand`: Primary brand color
- `--color-brand-light`: Light brand color
- `--color-brand-dark`: Dark brand color

#### Icon Colors

- `--color-icon-normal`: Default state
- `--color-icon-light`: Icon light state
- `--color-icon-hover`: Hover state
- `--color-icon-active`: Active state
- `--color-icon-reverse`: Reverse state
- `--color-icon-disabled`: Disabled state
- `--color-icon-pane`: Panel color

#### Line and Text Colors

- `--color-line-normal`: Line color
- `--color-line-darken`: Line color (darken)
- `--color-title`: Title color
- `--color-text`: Text color
- `--color-text-dark`: Text color (dark)
- `--color-text-light`: Text color (light)
- `--color-text-reverse`: Text color in reverse scenarios
- `--color-text-disabled`: Disabled text color

#### Menu Colors

- `--color-context-menu-text`: Menu item color
- `--color-context-menu-text-hover`: Menu item hover color
- `--color-context-menu-text-disabled`: Menu item disabled color

#### Field and Border Colors

- `--color-field-label`: Field label color
- `--color-field-text`: Field text color
- `--color-field-placeholder`: Field placeholder color
- `--color-field-border`: Field border color
- `--color-field-border-hover`: Field border color on hover
- `--color-field-border-active`: Field border color when active
- `--color-field-background`: Field background color

#### Status Colors

- `--color-success`: Success color
- `--colo-success-dark`: Success color (dark)
- `--color-success-light`: Success color (light)
- `--color-warning`: Warning color
- `--color-warning-dark`: Warning color (dark)
- `--color-warning-light`: Warning color (light)
- `--color-information`: Information color
- `--color-information-dark`: Information color (dark)
- `--color-information-light`: Information color (light)
- `--color-error`: Error color
- `--color-error-dark`: Error color (dark)
- `--color-error-light`: Error color (light)
- `--color-purple`: Purple color
- `--color-brown`: Brown color

#### Block Background Colors

- `--color-block-background-normal`: Block background color
- `--color-block-background-light`: Block background color (light)
- `--color-block-background-shallow`: Block background color (shallow)
- `--color-block-background-dark`: Block background color (dark)
- `--color-block-background-disabled`: Block background color (disabled)
- `--color-block-background-active`: Block background color (active)
- `--color-block-background-active-light`: Block background color (active light)
- `--color-block-background-warning`: Block background color (warning)
- `--color-block-background-error`: Block background color (error)
- `--color-block-background-success`: Block background color (success)
- `--color-block-background-deep-dark`: Block background color (deep-dark), used when dragging multiple components simultaneously.

#### Engine-Related Colors

- `--color-canvas-detecting-background`: Canvas component hover overlay background color.

#### Other Area Background Colors

- `--color-layer-mask-background`: Mask background at the original position when dragging elements
- `--color-layer-tooltip-background`: Tooltip background color
- `--color-pane-background`: Panel background color
- `--color-background`: Main designer background color
- `--color-top-area-background`: topArea background color; takes precedence over `--color-pane-background`
- `--color-left-area-background`: leftArea background color; takes precedence over `--color-pane-background`
- `--color-toolbar-background`: toolbar background color; takes precedence over `--color-pane-background`
- `--color-workspace-left-area-background`: Application-level leftArea background color; takes precedence over `--color-pane-background`
- `--color-workspace-top-area-background`: Application-level topArea background color; takes precedence over `--color-pane-background`
- `--color-workspace-sub-top-area-background`: Application-level secondary topArea background color; takes precedence over `--color-pane-background`

#### Other Variables

- `--workspace-sub-top-area-height`: Application-level secondary topArea height
- `--top-area-height`: Top area height
- `--workspace-sub-top-area-margin`: Application-level secondary topArea margin
- `--workspace-sub-top-area-padding`: Application-level secondary topArea padding
- `--workspace-left-area-width`: Application-level leftArea width
- `--left-area-width`: leftArea width
- `--simulator-top-distance`: Simulator distance from container top
- `--simulator-bottom-distance`: Simulator distance from container bottom
- `--simulator-left-distance`: Simulator distance from container left
- `--simulator-right-distance`: Simulator distance from container right
- `--toolbar-padding`: toolbar padding
- `--toolbar-height`: toolbar height
- `--pane-title-height`: Panel title height
- `--pane-title-font-size`: Panel title font size
- `--pane-title-padding`: Panel title padding
- `--context-menu-item-height`: Context menu item height

### Low-Code Engine Ecosystem Theme Customization

Plugins, materials, setters, and other ecosystem components must upgrade styles to CSS variables to support theme colors. For example:

```css
/* before */
background: #006cff;

/* after */
background: var(--color-brand, #006cff);
```

Here `var(--color-brand, #default-color)` uses the `--color-brand` variable; if undefined, the default color is used.

### Theme Extension for Fusion Materials

When using Fusion components, you can customize theme colors through the [Fusion platform](https://fusion.design/). On the platform, you can select different theme colors and apply them directly to your Fusion components for seamless integration into your application design.
