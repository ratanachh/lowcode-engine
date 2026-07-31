import * as path from 'path';
import { debug, ComponentMeta } from './core';
import { IMaterialParsedModel, IMaterialScanModel, IInternalMaterializeOptions } from './types';

const log = debug.extend('gen');

export default async function (
  matScanModel: IMaterialScanModel,
  matParsedModels: IMaterialParsedModel[],
  options: IInternalMaterializeOptions,
): Promise<ComponentMeta[]> {
  const containerList = [];
  for (const matParsedModel of matParsedModels) {
    // By default, exclude components whose defaultExportName is empty
    if (!matParsedModel.componentName) {
      log('skip');
      continue;
    }
    // Assemble manifest
    const manifest: any = await genManifest(matScanModel, matParsedModel, options);

    containerList.push(manifest);
  }

  return containerList;
}

/**
 * Generate manifest
 *
 * @param {IMaterialParsedModel} matParsedModel
 * @returns {Promise<
 *     manifestObj: ComponentMeta, // component description
 *   >}
 * @memberof LocalGenerator
 */
export async function genManifest(
  matScanModel: IMaterialScanModel,
  matParsedModel: IMaterialParsedModel,
  options: IInternalMaterializeOptions,
): Promise<ComponentMeta> {
  const manifestObj: Partial<ComponentMeta> = {
    componentName: matParsedModel.componentName,
    title: matScanModel.pkgName,
    docUrl: '',
    screenshot: '',
    devMode: 'proCode', // components to materialize are all in pro-code mode; low-code components can generate descriptions directly on the platform
    npm: {
      package: matScanModel.pkgName,
      version: matScanModel.pkgVersion,
      exportName: matParsedModel.meta?.exportName || matParsedModel.componentName,
      main:
        options.root && path.isAbsolute(matScanModel.mainFilePath)
          ? path.relative(options.root, matScanModel.mainFilePath)
          : matScanModel.mainFilePath,
      destructuring: matParsedModel.meta?.exportName !== 'default',
      subName: matParsedModel.meta?.subName || '',
    },
  };

  // Fill props
  manifestObj.props = matParsedModel.props;
  // Run extension points
  return manifestObj as ComponentMeta;
}
