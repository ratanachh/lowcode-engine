import { IPublicTypeCompositeValue } from '../type';
import { IPublicModelNode, IPublicModelProp } from './';

export interface IBaseModelProps<
  Prop
> {

  /**
   * id
   */
  get id(): string;

  /**
   * Returns the path to the current props
   * return path of current props
   */
  get path(): string[];

  /**
   * Returns the node instance it belongs to
   */
  get node(): IPublicModelNode | null;

  /**
   * Get the prop model instance at a specified path
   * get prop by path
   * @param path prop path; supports formats like a / a.b / a.0
   */
  getProp(path: string): Prop | null;

  /**
   * Get the value of the prop model instance at a specified path
   * get value of prop by path
   * @param path prop path; supports formats like a / a.b / a.0
   */
  getPropValue(path: string): any;

  /**
   * Get the prop model instance at a specified path;
   *  Note: on export, unlike normal props, this prop is not under props but at the same level as props
   * get extra prop by path
   * @param path prop path; supports formats like a / a.b / a.0
   */
  getExtraProp(path: string): Prop | null;

  /**
   * Get the value of the prop model instance at a specified path
   *  Note: on export, unlike normal props, this prop is not under props but at the same level as props
   * get value of extra prop by path
   * @param path prop path; supports formats like a / a.b / a.0
   */
  getExtraPropValue(path: string): any;

  /**
   * Set the value of the prop model instance at a specified path
   * set value of prop by path
   * @param path prop path; supports formats like a / a.b / a.0
   * @param value value
   */
  setPropValue(path: string, value: IPublicTypeCompositeValue): void;

  /**
   * Set the value of the prop model instance at a specified path
   * set value of extra prop by path
   * @param path prop path; supports formats like a / a.b / a.0
   * @param value value
   */
  setExtraPropValue(path: string, value: IPublicTypeCompositeValue): void;

  /**
   * Whether the current props contain a certain prop
   * check if the specified key is existing or not.
   * @param key
   * @since v1.1.0
   */
  has(key: string): boolean;

  /**
   * add a prop
   * add a key with given value
   * @param value
   * @param key
   * @since v1.1.0
   */
  add(value: IPublicTypeCompositeValue, key?: string | number | undefined): any;

}

export type IPublicModelProps = IBaseModelProps<IPublicModelProp>;