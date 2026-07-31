import { IPublicModelSettingField } from '../model';
import { IPublicTypeLiveTextEditingConfig } from './';

/**
 * extra props for field
 */
export interface IPublicTypeFieldExtraProps {

  /**
   * Whether the parameter is required
   */
  isRequired?: boolean;

  /**
   * default value of target prop for setter use
   */
  defaultValue?: any;

  /**
   * get value for field
   */
  getValue?: (target: IPublicModelSettingField, fieldValue: any) => any;

  /**
   * set value for field
   */
  setValue?: (target: IPublicModelSettingField, value: any) => void;

  /**
   * the field conditional show, is not set always true
   * @default undefined
   */
  condition?: (target: IPublicModelSettingField) => boolean;

  /**
   * Whether to skip default-value handling for this prop; if true the engine will not process defaults
   * @returns boolean
   */
  ignoreDefaultValue?: (target: IPublicModelSettingField) => boolean;

  /**
   * autorun when something change
   */
  autorun?: (target: IPublicModelSettingField) => void;

  /**
   * default collapsed when display accordion
   */
  defaultCollapsed?: boolean;

  /**
   * important field
   */
  important?: boolean;

  /**
   * internal use
   */
  forceInline?: number;

  /**
   * Whether variable binding is supported
   */
  supportVariable?: boolean;

  /**
   * compatiable vision display
   */
  display?: 'accordion' | 'inline' | 'block' | 'plain' | 'popup' | 'entry';

  // @todo is this omit reasonable?
  /**
   * @todo documentation pending
   */
  liveTextEditing?: Omit<IPublicTypeLiveTextEditingConfig, 'propTarget'>;

  /**
   * onChange event
   */
  onChange?: (value: any, field: IPublicModelSettingField) => void;
}
