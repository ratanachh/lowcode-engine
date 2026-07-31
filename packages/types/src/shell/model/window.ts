import { ReactElement } from 'react';
import { IPublicTypeDisposable, IPublicTypeNodeSchema } from '../type';
import { IPublicModelResource } from './resource';
import { IPublicModelEditorView } from './editor-view';

export interface IPublicModelWindow<
  Resource = IPublicModelResource
> {

  /** Window id */
  id: string;

  /** Window title */
  title?: string;

  /** Window icon */
  icon?: ReactElement;

  /** Window resource type */
  resource?: Resource;

  /**
   * Current window view
   * @since v1.1.7
   */
  currentEditorView: IPublicModelEditorView | null;

  /**
   * All view instances of the window
   * @since v1.1.7
   */
  editorViews: IPublicModelEditorView[];

  /** Import schema into the current window */
  importSchema(schema: IPublicTypeNodeSchema): void;

  /** Change the current window view type */
  changeViewType(viewName: string): void;

  /** Call the current window view save hook */
  save(): Promise<any>;

  /** Window view change event */
  onChangeViewType(fn: (viewName: string) => void): IPublicTypeDisposable;

  /**
   * Window view save event
   * @since 1.1.7
   */
  onSave(fn: () => void): IPublicTypeDisposable;
}