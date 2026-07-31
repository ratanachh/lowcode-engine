import { IPublicTypeNodeSchema, IPublicTypeCompositeValue } from '@rchh/lowcode-types';
import { HandlerSet, BaseGenerator, NodeGenerator } from './core';

export enum PIECE_TYPE {
  BEFORE = 'NodeCodePieceBefore',
  TAG = 'NodeCodePieceTag',
  ATTR = 'NodeCodePieceAttr',
  CHILDREN = 'NodeCodePieceChildren',
  AFTER = 'NodeCodePieceAfter',
}

export interface CodePiece {
  name?: string;
  value: string;
  type: PIECE_TYPE;
}

export interface AttrData {
  attrName: string;
  attrValue: IPublicTypeCompositeValue;
}
// JSX code generation customization points currently include [wrapper], [tag name], and [attributes]
export type AttrPlugin = BaseGenerator<AttrData, CodePiece[], NodeGeneratorConfig>;
export type NodePlugin = BaseGenerator<IPublicTypeNodeSchema, CodePiece[], NodeGeneratorConfig>;

export interface NodeGeneratorConfig {
  handlers?: HandlerSet<string>;
  tagMapping?: (input: string) => string;
  attrPlugins?: AttrPlugin[];
  nodePlugins?: NodePlugin[];
  self?: NodeGenerator<string>;

  /**
   * Whether to tolerate exceptions when evaluating JSExpression
   * Default: true
   * Note: if exceptions are tolerated, evaluation is wrapped in a try-catch via __$$eval / __$$evalArray
   *     when caught, a CustomEvent is thrown containing the error and the expression
   */
  tolerateEvalErrors?: boolean;
}
