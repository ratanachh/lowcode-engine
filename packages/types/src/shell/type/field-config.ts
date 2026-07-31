import { IPublicTypeTitleContent, IPublicTypeSetterType, IPublicTypeFieldExtraProps, IPublicTypeDynamicSetter } from './';

/**
 * Property panel configuration
 */
export interface IPublicTypeFieldConfig extends IPublicTypeFieldExtraProps {

  /**
   * Whether panel config belongs to a single field or a group
   */
  type?: 'field' | 'group';

  /**
   * the name of this setting field, which used in quickEditor
   */
  name?: string | number;

  /**
   * the field title
   * @default sameas .name
   */
  title?: IPublicTypeTitleContent;

  /**
   * Setter config for a single prop
   *
   * the field body contains when .type = 'field'
   */
  setter?: IPublicTypeSetterType | IPublicTypeDynamicSetter;

  /**
   * the setting items which group body contains when .type = 'group'
   */
  items?: IPublicTypeFieldConfig[];

  /**
   * extra props for field
   * Other config props (not required for interchange)
   */
  extraProps?: IPublicTypeFieldExtraProps;

  /**
   * @deprecated
   */
  description?: IPublicTypeTitleContent;

  /**
   * @deprecated
   */
  isExtends?: boolean;
}
