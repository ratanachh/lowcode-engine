import { IPublicTypeIconType, IPublicTypeNpmInfo, IPublicTypeFieldConfig, IPublicTypeI18nData, IPublicTypeComponentSchema, IPublicTypeTitleContent, IPublicTypePropConfig, IPublicTypeConfigure, IPublicTypeAdvanced, IPublicTypeSnippet } from './';

/**
 * Component meta configuration
 */

export interface IPublicTypeComponentMetadata {

  /** Other extension protocols */
  [key: string]: any;

  /**
   * Component name
   */
  componentName: string;

  /**
   * unique id
   */
  uri?: string;

  /**
   * title or description
   */
  title?: IPublicTypeTitleContent;

  /**
   * svg icon for component
   */
  icon?: IPublicTypeIconType;

  /**
   * Component tags
   */
  tags?: string[];

  /**
   * Component description
   */
  description?: string;

  /**
   * Component documentation URL
   */
  docUrl?: string;

  /**
   * Component snapshot
   */
  screenshot?: string;

  /**
   * Component development mode
   */
  devMode?: 'proCode' | 'lowCode';

  /**
   * Full description object for npm source import
   */
  npm?: IPublicTypeNpmInfo;

  /**
   * Component prop information
   */
  props?: IPublicTypePropConfig[];

  /**
   * Editing experience enhancements
   */
  configure?: IPublicTypeFieldConfig[] | IPublicTypeConfigure;

  /**
   * @deprecated, use advanced instead
   */
  experimental?: IPublicTypeAdvanced;

  /**
   * @todo documentation pending
   */
  schema?: IPublicTypeComponentSchema;

  /**
   * Available snippets
   */
  snippets?: IPublicTypeSnippet[];

  /**
   * Primary group
   */
  group?: string | IPublicTypeI18nData;

  /**
   * Secondary group
   */
  category?: string | IPublicTypeI18nData;

  /**
   * Component priority sort
   */
  priority?: number;
}
