import { IPublicTypeNpmInfo } from './npm-info';

export interface IPublicTypeLowCodeComponent {

  /**
   * Development mode
   */
  devMode: 'lowCode';

  /**
   * Component name
   */
  componentName: string;
}

export type IPublicTypeProCodeComponent = IPublicTypeNpmInfo;
export type IPublicTypeComponentMap = IPublicTypeProCodeComponent | IPublicTypeLowCodeComponent;
export type IPublicTypeComponentsMap = IPublicTypeComponentMap[];
