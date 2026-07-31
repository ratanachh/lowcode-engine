import { ComponentMeta } from '../core';

/**
 * Accessor interface (defines materialization access channels)
 * @interface IAccesser
 */
export interface IAccesser {

  /**
   * Access
   * @returns {Promise<IMaterialinSchema>}
   * @memberof IAccesser
   */
  access(): Promise<ComponentMeta[]>;
}
