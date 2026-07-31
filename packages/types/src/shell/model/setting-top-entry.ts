import { IPublicModelNode, IPublicModelSettingField } from './';

export interface IPublicModelSettingTopEntry<
  Node = IPublicModelNode,
  SettingField = IPublicModelSettingField
> {

  /**
   * Returns the node instance it belongs to
   */
  get node(): Node | null;

  /**
   * Get child attribute object
   * @param propName
   * @returns
   */
  get(propName: string | number): SettingField | null;

  /**
   * Get the value of the specified propName
   * @param propName
   * @returns
   */
  getPropValue(propName: string | number): any;

  /**
   * Sets the value of the specified propName
   * @param propName
   * @param value
   */
  setPropValue(propName: string | number, value: any): void;

  /**
   * Clear the value of a specified propName
   * @param propName
   */
  clearPropValue(propName: string | number): void;
}
