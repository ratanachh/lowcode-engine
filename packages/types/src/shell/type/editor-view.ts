import { IPublicEditorViewConfig } from './editor-view-config';

export interface IPublicTypeEditorView {

  /** Resource name */
  viewName: string;

  /** Resource type */
  viewType?: 'editor' | 'webview';

  (ctx: any, options: any): IPublicEditorViewConfig;
}