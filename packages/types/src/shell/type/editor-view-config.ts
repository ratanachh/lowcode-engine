export interface IPublicEditorViewConfig {

  /** View init hook */
  init?: () => Promise<void>;

  /** View hook called when the resource is saved */
  save?: () => Promise<void>;

  /** URL rendered when viewType is 'webview' */
  url?: () => Promise<string>;
}