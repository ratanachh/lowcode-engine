import { ReactNode } from 'react';

import { IPublicTypeRegisteredSetter, IPublicTypeCustomView } from '../type';

export interface IPublicApiSetters {

  /**
   * Get the specified setter
   * get setter by type
   * @param type
   * @returns
   */
  getSetter(type: string): IPublicTypeRegisteredSetter | null;

  /**
   * Get all registered settersMap
   * get map of all registered setters
   * @returns
   */
  getSettersMap(): Map<string, IPublicTypeRegisteredSetter & {
    type: string;
  }>;

  /**
   * Register a setter
   * register a setter
   * @param typeOrMaps
   * @param setter
   * @returns
   */
  registerSetter(
    typeOrMaps: string | { [key: string]: IPublicTypeCustomView | IPublicTypeRegisteredSetter },
    setter?: IPublicTypeCustomView | IPublicTypeRegisteredSetter | undefined
  ): void;

  /**
   * @deprecated
   */
  createSetterContent (setter: any, props: Record<string, any>): ReactNode;
}
