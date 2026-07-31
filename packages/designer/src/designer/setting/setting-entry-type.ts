import { IPublicApiSetters, IPublicModelEditor } from '@rchh/lowcode-types';
import { IDesigner } from '../designer';
import { INode } from '../../document';
import { ISettingField } from './setting-field';

export interface ISettingEntry {
  readonly designer: IDesigner | undefined;

  readonly id: string;

  /**
   * Nodes of the same type
   */
  readonly isSameComponent: boolean;

  /**
   * Single
   */
  readonly isSingle: boolean;

  /**
   * Multiple
   */
  readonly isMultiple: boolean;

  /**
   * Editor reference
   */
  readonly editor: IPublicModelEditor;

  readonly setters: IPublicApiSetters;

  /**
   * Get child item
   */
  get: (propName: string | number) => ISettingField | null;

  readonly nodes: INode[];

  // @todo add node type definition
  /**
   * Get the first item among nodes
   */
  getNode: () => any;
}
