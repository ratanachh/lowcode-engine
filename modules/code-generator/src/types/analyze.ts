import type { IPublicTypeContainerSchema } from '@rchh/lowcode-types';

export interface ICompAnalyzeResult {
  isUsingRef: boolean;
}

export type TComponentAnalyzer = (container: IPublicTypeContainerSchema) => ICompAnalyzeResult;
