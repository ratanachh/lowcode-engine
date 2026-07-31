import { IPublicModelSettingField } from '../model';
import { IPublicTypeCustomView, IPublicTypeTitleContent } from './';

export interface IPublicTypeRegisteredSetter {
  component: IPublicTypeCustomView;
  defaultProps?: object;
  title?: IPublicTypeTitleContent;

  /**
   * for MixedSetter to check this setter if available
   */
  condition?: (field: IPublicModelSettingField) => boolean;

  /**
   * for MixedSetter to manual change to this setter
   */
  initialValue?: any | ((field: IPublicModelSettingField) => any);
  recommend?: boolean;
  // Whether this is a dynamic setter; default true
  isDynamic?: boolean;
}
