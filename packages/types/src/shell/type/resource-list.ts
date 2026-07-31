import { ReactElement } from 'react';

export interface IPublicResourceData {

  /** Resource name */
  resourceName: string;

  /** Resource extension config */
  config?: {
    [key: string]: any;
  };

  /** Resource title */
  title?: string;

  /** Resource Id */
  id?: string;

  /** Category */
  category?: string;

  /** Resource views */
  viewName?: string;

  /** Resource icon */
  icon?: ReactElement;

  /** Other resource config; second argument when initializing the resource */
  options: {
    [key: string]: any;
  };

  /** Resource children */
  children?: IPublicResourceData[];
}

export type IPublicResourceList = IPublicResourceData[];