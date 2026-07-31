import { ResultFile, ResultDir } from '@rchh/lowcode-types';
import nm from 'nanomatch';

import { CodeGeneratorError } from '../types/error';
import { FlattenFile } from '../types/file';

export function createResultFile(name: string, ext = 'jsx', content = ''): ResultFile {
  return {
    name,
    ext,
    content,
  };
}

export function createResultDir(name: string): ResultDir {
  return {
    name,
    dirs: [],
    files: [],
  };
}

export function addDirectory(target: ResultDir, dir: ResultDir): void {
  if (target.dirs.findIndex((d) => d.name === dir.name) < 0) {
    target.dirs.push(dir);
  } else {
    throw new CodeGeneratorError(
      `Adding same directory to one directory: ${dir.name} -> ${target.name}`,
    );
  }
}

export function addFile(target: ResultDir, file: ResultFile): void {
  if (target.files.findIndex((f) => f.name === file.name && f.ext === file.ext) < 0) {
    target.files.push(file);
  } else {
    throw new CodeGeneratorError(
      `Adding same file to one directory: ${file.name} -> ${target.name}`,
    );
  }
}

export function flattenResult(dir: ResultDir, cwd = ''): FlattenFile[] {
  if (!dir.files.length && !dir.dirs.length) {
    return [];
  }

  return [
    ...dir.files.map(
      (file): FlattenFile => ({
        pathName: joinPath(cwd, `${file.name}${file.ext ? `.${file.ext}` : ''}`),
        content: file.content,
      }),
    ),
  ].concat(...dir.dirs.map((subDir) => flattenResult(subDir, joinPath(cwd, subDir.name))));
}

export interface GlobOptions {

  /** Whether to match ".xxx" files; default: no */
  dot?: boolean;
}

/**
 * Find a file
 * @param result Code generation result
 * @param fileGlobExpr File name match expression
 * @param resultDirPath Path of the code generation result (default: '.')
 * @returns First matching file or null if not found
 */
export function findFile(
  result: ResultDir,
  fileGlobExpr: string,
  options: GlobOptions = {},
  resultDirPath = getResultNameOrDefault(result, ''),
): ResultFile | null {
  const maxDepth = !/\/|\*\*/.test(fileGlobExpr) ? 1 : undefined; // If the glob never matches subdirectories, limit depth to 1
  const files = scanFiles(result, resultDirPath, maxDepth);

  for (let [filePath, file] of files) {
    if (nm.isMatch(filePath, fileGlobExpr, options)) {
      return file;
    }
  }

  return null;
}

/**
 * Find multiple files with glob syntax
 * @param result Code generation result
 * @param fileGlobExpr File name match expression
 * @param resultDirPath Path of the code generation result (default: '.')
 * @returns Iterator of found files: [ [filePath, fileInfo], ... ]
 */
export function* globFiles(
  result: ResultDir,
  fileGlobExpr: string,
  options: GlobOptions = {},
  resultDirPath = getResultNameOrDefault(result, ''),
): IterableIterator<[string, ResultFile]> {
  const files = scanFiles(result, resultDirPath);

  for (let [filePath, file] of files) {
    if (nm.isMatch(filePath, fileGlobExpr, options)) {
      yield [filePath, file];
    }
  }
}

/**
 * Traverse all files
 */
export function* scanFiles(
  result: ResultDir,
  resultDirPath = getResultNameOrDefault(result, ''),
  maxDepth = 10000,
): IterableIterator<[string, ResultFile]> {
  for (let file of result.files) {
    const fileName = getFileNameWithExt(file);
    yield [joinPath(resultDirPath, fileName), file];
  }

  for (let subDir of result.dirs) {
    yield* scanFiles(subDir, joinPath(resultDirPath, subDir.name), maxDepth - 1);
  }
}

export function getFileNameWithExt(file: ResultFile) {
  return `${file.name}${file.ext ? `.${file.ext}` : ''}`;
}

function getResultNameOrDefault(result: ResultDir, defaultDir = '/') {
  return result.name && result.name !== '.' ? result.name : defaultDir;
}

function joinPath(...pathParts: string[]): string {
  return pathParts
    .filter((x) => x !== '' && x !== '.')
    .join('/')
    .replace(/\\+/g, '/')
    .replace(/\/+/g, '/');
}

export function* scanDirs(
  result: ResultDir,
  resultDirPath = getResultNameOrDefault(result, ''),
  maxDepth = 10000,
): IterableIterator<[string, ResultDir]> {
  yield [resultDirPath, result];

  for (let subDir of result.dirs) {
    yield* scanDirs(subDir, joinPath(resultDirPath, subDir.name), maxDepth - 1);
  }
}

export function* globDirs(
  result: ResultDir,
  dirGlobExpr: string,
  options: GlobOptions = {},
  resultDirPath = getResultNameOrDefault(result, ''),
): IterableIterator<[string, ResultDir]> {
  const dirs = scanDirs(result, resultDirPath);

  for (let [dirPath, dir] of dirs) {
    if (nm.isMatch(dirPath, dirGlobExpr, options)) {
      yield [dirPath, dir];
    }
  }
}

export function findDir(
  result: ResultDir,
  dirGlobExpr: string,
  options: GlobOptions = {},
  resultDirPath = getResultNameOrDefault(result, ''),
): ResultDir | null {
  const dirs = scanDirs(result, resultDirPath);

  for (let [dirPath, dir] of dirs) {
    if (nm.isMatch(dirPath, dirGlobExpr, options)) {
      return dir;
    }
  }

  return null;
}

/**
 * Remove some files from the result
 * @param result Code generation result directory
 * @param filePathGlobExpr File paths to remove (glob expression)
 * @param globOptions glob options
 * @returns Number of files removed
 */
export function removeFilesFromResult(
  result: ResultDir,
  filePathGlobExpr: string,
  globOptions: GlobOptions = {},
): number {
  let removedCount = 0;
  const [dirPath, fileName] = splitPath(filePathGlobExpr);

  const dirs = dirPath ? globDirs(result, dirPath) : [['', result] as const];
  for (let [, dir] of dirs) {
    const files = globFiles(dir, fileName, globOptions, '.');
    for (let [, file] of files) {
      dir.files.splice(dir.files.indexOf(file), 1);
      removedCount += 1;
    }
  }

  return removedCount;
}

/**
 * Remove some directories from the result
 * @param result Code generation result directory
 * @param dirPathGlobExpr Directory paths to remove (glob expression)
 * @param globOptions glob options
 * @returns Number of files removed
 */
export function removeDirsFromResult(
  result: ResultDir,
  dirPathGlobExpr: string,
  globOptions: GlobOptions = {},
): number {
  let removedCount = 0;
  const [dirPath, fileName] = splitPath(dirPathGlobExpr);

  const dirs = dirPath ? globDirs(result, dirPath) : [['', result] as const];
  for (let [, dir] of dirs) {
    const foundDirs = globDirs(dir, fileName, globOptions, '.');
    for (let [, foundDir] of foundDirs) {
      dir.dirs.splice(dir.dirs.indexOf(foundDir), 1);
      removedCount += 1;
    }
  }

  return removedCount;
}

/**
 * Split a file path into directory path and file name
 * @param filePath
 * @returns [fileDirPath, fileName]
 */
function splitPath(filePath: string) {
  const parts = filePath.split('/');
  const fileName = parts.pop() || '';
  return [joinPath(...parts), fileName];
}
