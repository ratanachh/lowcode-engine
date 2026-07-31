import spawn from 'cross-spawn-promise';
import { ensureDir, ensureFile, writeFile } from 'fs-extra';
import { join, resolve } from 'path';
import uuid from 'short-uuid';
import { debug } from './core';
import { IMaterializeOnlineOptions, IMaterializeOnlinePackageAndVersionOptions } from './types';

const log = debug.extend('localize');

/**
 * Create component package
 *
 * @private
 * @param {{
 *     pkgName: string;
 *     pkgVersion: string;
 *   }} params
 * @returns {Promise<void>}
 * @memberof OnlineAccesser
 */
export async function createFakePackage(params: {
  workDir: string;
  pkgName: string;
  pkgVersion: string;
  npmClient?: string;
}): Promise<void> {
  // Create temporary component package
  const { workDir } = params;
  const pkgJsonFilePath = join(workDir, 'package.json');
  await ensureFile(pkgJsonFilePath);
  await writeFile(
    pkgJsonFilePath,
    JSON.stringify(
      {
        name: params.pkgName,
        version: params.pkgVersion || '0.0.0',
        dependencies: {
          [params.pkgName]: params.pkgVersion || 'latest',
          react: 'latest',
          'react-dom': 'latest',
          'parse-prop-types': '^0.3.0',
          typesync: 'latest',
        },
      },
      null,
      2,
    ),
  );

  // Install dependencies
  const npmClient = params.npmClient || 'tnpm';
  await spawn(npmClient, ['i'], { stdio: 'inherit', cwd: workDir } as any);
}

/**
 * Create temporary directory
 *
 * @private
 * @returns {Promise<string>} Returns the temporary folder path
 * @memberof LocalGenerator
 */
export async function createworkDir(tempDir?: string): Promise<string> {
  const workDirName = uuid.generate();
  const workDir = resolve(tempDir || '../../node_modules/.temp/', workDirName);
  await ensureDir(workDir);
  log('create temp dir successfully', workDir);
  return workDir;
}

/**
 * Split material component name and version
 *
 * @private
 * @param {string} pkgNameWithVersion
 * @returns {{ [key: string]: any }}
 * @memberof OnlineAccesser
 */
export function getPkgNameAndVersion(pkgNameWithVersion: string): { [key: string]: any } {
  const matches = pkgNameWithVersion.match(/(@[^/]+)$/);
  if (!matches) {
    return {
      name: pkgNameWithVersion,
    };
  }
  const name = pkgNameWithVersion.replace(matches[0], '');
  return {
    version: matches[0].slice(1),
    name,
  };
}

// Convert the problem into a local materialization scenario
export default async function localize(options: IMaterializeOnlineOptions): Promise<{
  workDir: string;
  moduleDir: string;
  entry?: string;
}> {
  // Create temporary directory
  const workDir = await createworkDir(options.tempDir);
  await ensureDir(workDir);
  let { name, version = 'latest' } = options as IMaterializeOnlinePackageAndVersionOptions;
  if (!name) {
    const pkgNameAndVersion = getPkgNameAndVersion(options.entry);
    name = pkgNameAndVersion.name;
    version = pkgNameAndVersion.version;
  }
  // Create component package
  await createFakePackage({
    pkgName: name,
    pkgVersion: version,
    workDir,
    npmClient: options.npmClient,
  });

  const result = {
    workDir,
    moduleDir: join(workDir, 'node_modules', name),
    entry: undefined,
  };

  if ((options as IMaterializeOnlinePackageAndVersionOptions)?.name) {
    result.entry = options.entry;
  }

  return result;
}
