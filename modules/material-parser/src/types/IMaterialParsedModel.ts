import { PropsSection } from '../core';

/**
 * Key information analyzed by the parser
 */
export interface IPropType {
  name: string;
  type: string;
  value?: IPropTypes;
  required: boolean;
}

export type IPropTypes = IPropType[];

export interface IMaterialParsedModel {
  // filePath: string;
  componentName: string;
  props?: PropsSection['props'];
  meta?: {
    exportName?: string;
    subName?: string;
  };
}
