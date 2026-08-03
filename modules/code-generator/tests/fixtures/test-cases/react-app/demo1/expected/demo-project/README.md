
## Scaffold Lite

> A lightweight template using JavaScript, containing only a basic Layout.

## Usage

```bash
# Install dependencies
$ npm install

# Start the service
$ npm start  # visit http://localhost:3333
```

[More docs](https://ice.work/docs/guide/about).

## Directory Structure

```md
├── build/                         # Build output
├── mock/                          # Local mock data
│   ├── index.[j,t]s
├── public/
│   ├── index.html                 # Application entry HTML
│   └── favicon.png                # Favicon
├── src/                           # Source code
│   ├── components/                # Custom business components
│   │   └── Guide/
│   │       ├── index.[j,t]sx
│   │       ├── index.module.scss
│   ├── layouts/                   # Layout components
│   │   └── BasicLayout/
│   │       ├── index.[j,t]sx
│   │       └── index.module.scss
│   ├── pages/                     # Pages
│   │   └── Home/                  # Home page, route is conventionally lowercased
│   │       ├── components/        # Page-level custom business components
│   │       ├── models.[j,t]sx     # Page-level data state
│   │       ├── index.[j,t]sx      # Page entry
│   │       └── index.module.scss  # Page style file
│   ├── configs/                   # [Optional] Configuration files
│   │   └── menu.[j,t]s            # [Optional] Menu configuration
│   ├── models/                    # [Optional] Application-level data state
│   │   └── user.[j,t]s
│   ├── utils/                     # [Optional] Utility library
│   ├── global.scss                # Global styles
│   ├── routes.[j,t]s              # Route configuration
│   └── app.[j,t]s[x]              # Application entry script
├── build.json                     # Project configuration
├── README.md
├── package.json
├── .editorconfig
├── .eslintignore
├── .eslintrc.[j,t]s
├── .gitignore
├── .stylelintignore
├── .stylelintrc.[j,t]s
├── .gitignore
└── [j,t]sconfig.json
```
    