import { IProp as InnerProp } from '@rchh/lowcode-designer';
import { IPublicTypeCompositeValue, IPublicEnumTransformStage, IPublicModelProp, IPublicModelNode } from '@rchh/lowcode-types';
import { propSymbol } from '../symbols';
import { Node as ShellNode } from './node';

export class Prop implements IPublicModelProp {
  private readonly [propSymbol]: InnerProp;

  constructor(prop: InnerProp) {
    this[propSymbol] = prop;
  }

  static create(prop: InnerProp | undefined | null): IPublicModelProp | null {
    if (!prop) {
      return null;
    }
    return new Prop(prop);
  }

  /**
   * id
   */
  get id(): string {
    return this[propSymbol].id;
  }

  /**
   * Key
   * get key of prop
   */
  get key(): string | number | undefined {
    return this[propSymbol].key;
  }

  /**
   * Return path of current prop
   */
  get path(): string[] {
    return this[propSymbol].path;
  }

  /**
   * Return the owning node instance
   */
  get node(): IPublicModelNode | null {
    return ShellNode.create(this[propSymbol].getNode());
  }

  /**
   * return the slot node (only if the current prop represents a slot)
   */
  get slotNode(): IPublicModelNode | null {
    return ShellNode.create(this[propSymbol].slotNode);
  }

  /**
   * judge if it is a prop or not
   */
  get isProp(): boolean {
    return true;
  }

  /**
   * Set value
   * @param val
   */
  setValue(val: IPublicTypeCompositeValue): void {
    this[propSymbol].setValue(val);
  }

  /**
   * Get value
   * @returns
   */
  getValue(): any {
    return this[propSymbol].getValue();
  }

  /**
   * Remove value
   */
  remove(): void {
    this[propSymbol].remove();
  }

  /**
   * Export value
   * @param stage
   * @returns
   */
  exportSchema(stage: IPublicEnumTransformStage = IPublicEnumTransformStage.Render) {
    return this[propSymbol].export(stage);
  }
}