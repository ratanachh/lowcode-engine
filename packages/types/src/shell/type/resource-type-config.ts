import React from 'react';
import { IPublicTypeEditorView } from './editor-view';

export interface IPublicResourceTypeConfig {

  /** Resource description */
  description?: string;

  /** Resource icon identifier */
  icon?: React.ReactElement | React.FunctionComponent | React.ComponentClass;

  /**
   * Default view type
   * @deprecated
   */
  defaultViewType?: string;

  /** Default view type */
  defaultViewName: string;

  /** Resource views */
  editorViews: IPublicTypeEditorView[];

  init?: () => void;

  /** save hook */
  save?: (schema: {
    [viewName: string]: any;
  }) => Promise<void>;

  /** import hook */
  import?: (schema: any) => Promise<{
    [viewName: string]: any;
  }>;

  /** Default title */
  defaultTitle?: string;

  /** URL rendered when resourceType is 'webview' */
  url?: () => Promise<string>;
}
