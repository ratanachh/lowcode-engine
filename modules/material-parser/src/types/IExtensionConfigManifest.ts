import { ComponentMeta } from '../core';

/**
 * Extension point: configure manifest
 * (materialization scenario)
 */
export type IExtensionConfigManifest = (params: {
  manifestObj: ComponentMeta; // manifest config object
  manifestFilePath: string; // default manifest file path
}) => Promise<{
  manifestJSON: string; // manifest file content
  manifestFilePath: string; // manifest file path
  manifestObj: ComponentMeta; // manifest file object
}>;
