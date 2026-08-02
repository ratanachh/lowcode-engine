# Code generation

Code generation parses a low-code schema and converts it into executable application code. This module ships Icejs and Rax solutions, plus a flexible extension mechanism.

## Usage

### 1) Try quickly via CLI

```bash
npx @rchh/lowcode-code-generator -i example-schema.json -o generated -s icejs
```

You can download `example-schema.json` from [here](https://cdn.jsdelivr.net/npm/@rchh/lowcode-code-generator@1.1.7/example-schema.json).

### 2) Try quickly via designer plugin

1. Install: `npm install --save @alilc/lowcode-plugin-code-generator`
2. Register the plugin:

```ts
import { plugins } from '@rchh/lowcode-engine';
import CodeGenPlugin from '@alilc/lowcode-plugin-code-generator';

// In your init function:
await plugins.register(CodeGenPlugin);

// If you do not want the codegen button added automatically:
await plugins.register(CodeGenPlugin, { disableCodeGenActionBtn: true });
```

Then run your low-code editor — a **Codegen** button appears in the designer toolbar. Click it to generate and preview in the browser.

### 3) Server-side codegen

This generator was designed for Node.js. Use it like this:

1. Install: `npm install --save @rchh/lowcode-code-generator`
2. Import:

```js
import CodeGenerator from '@rchh/lowcode-code-generator';
```

3. Create a project builder:

```js
const projectBuilder = CodeGenerator.solutions.icejs();
```

4. Generate code:

```js
const project = await projectBuilder.generateProject(
  schema, // schema produced by the designer
);
```

5. Write output to disk (or a zip):

```js
// Write to disk
await CodeGenerator.publishers.disk().publish({
  project, // from the previous step
  outputPath: '/path/to/your/output/dir',
  projectSlug: 'your-project-slug',
});

// Write a zip
await CodeGenerator.publishers.zip().publish({
  project,
  outputPath: '/path/to/your/output/dir',
  projectSlug: 'your-project-slug', // produces your-project-slug.zip
});
```

Note: server-side codegen often pairs with GitHub/GitLab, CI, and CD for performance.

### 4) Browser-side codegen

With modern browsers and Web Workers, codegen can run in the browser:

1. Install: `npm install --save @rchh/lowcode-code-generator`
2. Import:

```js
import * as CodeGenerator from '@rchh/lowcode-code-generator/standalone-loader';
```

3. (Optional) warm up the generator:

```js
// Init early so later calls are faster (prepares worker resources)
await CodeGenerator.init();
```

4. Generate:

```js
const project = await CodeGenerator.generateCode({
  solution: 'icejs', // built-in: icejs | rax
  schema, // designer schema
});

console.log(project); // recursive by default; pass flattenResult: true for a flat result
```

Note: browser codegen is a good fit for instant preview.

5. Download a zip:

```js
await CodeGenerator.publishers.zip().publish({
  project,
  projectSlug: 'your-project-slug', // downloads your-project-slug.zip
});
```

### 5) Custom codegen

Frontend frameworks vary, so built-in solutions may not fit every case. This generator supports plugins — see `./src/plugins/xxx` for examples, then compose them in `./src/solutions/xxx` into a solution for your product.

## Contributing

See [./CONTRIBUTING.md](https://github.com/alibaba/lowcode-engine/blob/main/modules/code-generator/CONTRIBUTING.md).
