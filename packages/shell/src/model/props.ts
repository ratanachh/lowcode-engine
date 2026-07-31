import { IProps as InnerProps, getConvertedExtraKey } from '@rchh/lowcode-designer';
import { IPublicTypeCompositeValue, IPublicModelProps, IPublicModelNode, IPublicModelProp } from '@rchh/lowcode-types';
import { propsSymbol } from '../symbols';
import { Node as ShellNode } from './node';
import { Prop as ShellProp } from './prop';

export class Props implements IPublicModelProps {
  private readonly [propsSymbol]: InnerProps;

  constructor(props: InnerProps) {
    this[propsSymbol] = props;
  }

  static create(props: InnerProps | undefined | null): IPublicModelProps | null {
    if (!props) {
      return null;
    }
    return new Props(props);
  }

  /**
   * id
   */
  get id(): string {
    return this[propsSymbol].id;
  }

  /**
   * Return path of current props
   */
  get path(): string[] {
    return this[propsSymbol].path;
  }

  /**
   * Return the owning node instance
   */
  get node(): IPublicModelNode | null {
    return ShellNode.create(this[propsSymbol].getNode());
  }

  /**
   * Get prop model instance at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @returns
   */
  getProp(path: string): IPublicModelProp | null {
    return ShellProp.create(this[propsSymbol].getProp(path));
  }

  /**
   * Get prop model value at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @returns
   */
  getPropValue(path: string): any {
    return this.getProp(path)?.getValue();
  }

  /**
   * Get prop model instance at path;
   *  Note: on export, unlike normal props, this is not under props but sibling to props
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @returns
   */
  getExtraProp(path: string): IPublicModelProp | null {
    return ShellProp.create(this[propsSymbol].getProp(getConvertedExtraKey(path)));
  }

  /**
   * Get prop model value at path
   *  Note: on export, unlike normal props, this is not under props but sibling to props
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @returns
   */
  getExtraPropValue(path: string): any {
    return this.getExtraProp(path)?.getValue();
  }

  /**
   * Set prop model value at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @param value Value
   * @returns
   */
  setPropValue(path: string, value: IPublicTypeCompositeValue): void {
    return this.getProp(path)?.setValue(value);
  }

  /**
   * Set prop model value at path
   * @param path Prop path, supports a / a.b / a.0, etc.
   * @param value Value
   * @returns
   */
  setExtraPropValue(path: string, value: IPublicTypeCompositeValue): void {
    return this.getExtraProp(path)?.setValue(value);
  }

  /**
   * test if the specified key is existing or not.
   * @param key
   * @returns
   */
  has(key: string): boolean {
    return this[propsSymbol].has(key);
  }

  /**
   * add a key with given value
   * @param value
   * @param key
   * @returns
   */
  add(value: IPublicTypeCompositeValue, key?: string | number | undefined): any {
    return this[propsSymbol].add(value, key);
  }
}