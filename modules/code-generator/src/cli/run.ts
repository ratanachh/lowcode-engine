/* eslint-disable no-console */
import chalk from 'chalk';
import * as fs from 'fs-extra';
import JSON5 from 'json5';
import { jsonc } from 'jsonc';
import { spawnSync } from 'child_process';
import * as path from 'path';

import { getErrorMessage } from '../utils/errors';
import CodeGenerator from '..';
import type { IProjectBuilder } from '..';
import type { IPublicTypeProjectSchema } from '@rchh/lowcode-types';

/**
 * Run the code-generation CLI command
 * @param args Argument array
 * @param options Options
 * @returns {Promise<number>} Error code
 */
export async function run(
  args: string[],
  options: {
    solution: string;
    input?: string;
    output?: string;
    quiet?: boolean;
    verbose?: boolean;
    solutionOptions?: string;
  },
): Promise<number> {
  try {
    const schemaFile = options.input || args[0];
    if (!schemaFile) {
      throw new Error(
        'a schema file must be specified by `--input <schema.json>` or by the first positional argument',
      );
    }

    if ((options.input && args.length > 0) || args.length > 1) {
      throw new Error(
        'only one schema file can be specified, either by `--input <schema.json>` or by the first positional argument',
      );
    }

    let solutionOptions = {};

    if (options.solutionOptions) {
      try {
        solutionOptions = JSON.parse(options.solutionOptions);
      } catch (err: any) {
        throw new Error(
          `solution options parse error, error message is "${err.message}"`,
        );
      }
    }

    // Read schema
    const schema = await loadSchemaFile(schemaFile);

    // Create a project builder
    const createProjectBuilder = await getProjectBuilderFactory(options.solution, {
      quiet: options.quiet,
    });
    const builder = createProjectBuilder(solutionOptions);

    // Generate code
    const generatedSourceCodes = await builder.generateProject(schema);

    // Write to disk
    const publisher = CodeGenerator.publishers.disk();

    await publisher.publish({
      project: generatedSourceCodes,
      outputPath: options.output || 'generated',
      projectSlug: 'example',
      createProjectFolder: false,
    });
    return 0;
  } catch (e) {
    console.log(chalk.red(getErrorMessage(e) || `Unexpected error: ${e}`));
    if (typeof e === 'object' && (e as { stack: string } | null)?.stack && options.verbose) {
      console.log(chalk.gray((e as { stack: string }).stack));
    }
    return 1;
  }
}

async function getProjectBuilderFactory(
  solution: string,
  { quiet }: { quiet?: boolean },
): Promise<(options: {[prop: string]: any}) => IProjectBuilder> {
  if (solution in CodeGenerator.solutions) {
    return CodeGenerator.solutions[solution as 'icejs' | 'rax'];
  }

  const solutionPackageName = isLocalSolution(solution)
    ? solution
    : `${solution.startsWith('@') ? solution : `@rchh/lowcode-solution-${solution}`}`;

  if (!isLocalSolution(solution)) {
    if (!quiet) {
      console.log(`"${solution}" is not internal, installing it as ${solutionPackageName}...`);
    }

    spawnSync('npm', ['i', solutionPackageName], {
      stdio: quiet ? 'ignore' : 'inherit',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const solutionExports = require(!isLocalSolution(solution)
    ? solutionPackageName
    : `${path.isAbsolute(solution) ? solution : path.join(process.cwd(), solution)}`);

  const projectBuilderFactory =
    solutionExports.createProjectBuilder ||
    solutionExports.createAppBuilder ||
    solutionExports.default;

  if (typeof projectBuilderFactory !== 'function') {
    throw new Error(
      `"${solutionPackageName}" should export project builder factory via named export 'createProjectBuilder' or via default export`,
    );
  }

  return projectBuilderFactory;
}

function isLocalSolution(solution: string) {
  return solution.startsWith('.') || solution.startsWith('/') || solution.startsWith('~');
}

async function loadSchemaFile(schemaFile: string): Promise<IPublicTypeProjectSchema> {
  if (!schemaFile) {
    throw new Error('invalid schema file name');
  }

  const schemaFileContent = await fs.readFile(schemaFile, 'utf8');

  if (/\.json5/.test(schemaFile)) {
    return JSON5.parse(schemaFileContent);
  }

  // Parse as JSONC by default (JSON-compatible)
  return jsonc.parse(schemaFileContent);
}
