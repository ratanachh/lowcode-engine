import { IPublicTypeCustomView, IPublicTypeCompositeValue, IPublicTypeTitleContent, IPublicModelSettingField } from '..';
import { IPublicTypeDynamicProps } from './dynamic-props';

/**
 * Setter configuration
 */
export interface IPublicTypeSetterConfig {

  // if *string* passed must be a registered Setter Name
  /**
   * Which setter to use
   */
  componentName: string | IPublicTypeCustomView;

  /**
   * Props passed to the setter
   *
   * the props pass to Setter Component
   */
  props?: Record<string, unknown> | IPublicTypeDynamicProps;

  /**
   * @deprecated
   */
  children?: any;

  /**
   * Whether required?
   *
   * ArraySetter has a quick preview for editing without opening the panel
   */
  isRequired?: boolean;

  /**
   * Setter initial value
   *
   * @todo initialValue may need to be mutually exclusive with defaultValue
   */
  initialValue?: any | ((target: IPublicModelSettingField) => any);

  defaultValue?: any;

  // for MixedSetter
  /**
   * Used by MixedSetter when switching setter display
   */
  title?: IPublicTypeTitleContent;

  // for MixedSetter check this is available
  /**
   * Used by MixedSetter to decide which setter is preferred
   */
  condition?: (target: IPublicModelSettingField) => boolean;

  /**
   * Used by MixedSetter to declare type when switching values
   *
   * @todo advance the material protocol
   */
  valueType?: IPublicTypeCompositeValue[];

  // Whether this is a dynamic setter; default true
  isDynamic?: boolean;
}
